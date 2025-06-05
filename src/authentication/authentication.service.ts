import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoingDTO, RegisterDTO } from './dto';
import { VerificationEmailDTO } from './dto/verificationEmail.dto';
import { VerifyEmail } from './email/verifyEmail.service';
import { ResendVerificationDTO } from './dto/resendVerification.dto';
import { ForgotPasswordDTO } from './dto/forgetPassword.dto';
import { ForgetPassWordEmail } from './email/forgetPassWordEmail.service';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { twoFAEnableDTO } from './dto/twoFAEnable.dto';
import { TwoFA_enableEmail } from './email/twoFA_enableEmail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly sendVerifyEmail: VerifyEmail,
    private readonly forgetPassWordEmail: ForgetPassWordEmail,
    private readonly twoFA_enableEmail: TwoFA_enableEmail,
  ) { }

  async register(userDTO: RegisterDTO) {
    try {
      const { email, password, name } = userDTO;
      const hashed = await bcrypt.hash(password, 10);
      const now = new Date();
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashed,
          name,
          permission_id: 1,
          is_two_factor_enabled: false,
        },
        // select เฉพาะบาง field 
        select: {
          email: true,
          password: true,
          name: true,
          id: true
        }
      });
      await this.generateVerificationToken(user.email);

      return user;
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // email unique 
          throw new HttpException('email unique', HttpStatus.BAD_REQUEST);

        }
      }
      throw error;
    }

  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.email || !user.password) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    return isMatch ? user : null;
  }

  async login(userDto: LoingDTO) {
    try {
      const user = await this.validateUser(userDto.email, userDto.password);

      if (!user || !user.email || !user.password) {
        throw new HttpException('EMAIL_DOES_NOT_EXIST', 401);
      }

      if (!user.email_verified_at) {
        // ดึง token ทั้งหมดของ email นี้
        const tokens = await this.prisma.verification_token.findMany({
          where: { email: userDto.email }
        });

        const expiredToken = tokens.find(t => t.expires < new Date());
        const activeToken = tokens.find(t => t.expires >= new Date());

        if (expiredToken && !activeToken) {
          // มี token หมดอายุ และไม่มี token ที่ยังใช้ได้ → update
          const newToken = crypto.randomUUID();
          const newExpires = new Date(Date.now() + 1000 * 60 * 60);

          await this.prisma.verification_token.update({
            where: { id: expiredToken.id },
            data: { token: newToken, expires: newExpires },
          });

          await this.sendVerifyEmail.sendVerificationEmail(user.email, newToken);
          console.log('token หมดอายุ → อัปเดต token และส่งใหม่');
        } else if (!activeToken) {
          // ไม่มี token เลย → generate ใหม่
          await this.generateVerificationToken(user.email);
        } else {
        }
        throw new HttpException('EMAIL_NOT_VERIFIED', 401);
      }

      if (user.is_two_factor_enabled) {
        const tempToken = this.jwtService.sign(
          { userId: user.id, is2FA: true },
          { expiresIn: '3m' }
        );

        return {
          status: '2FA_REQUIRED',
          twofa_token: tempToken,
          user_id: user.id,
          permission: user.permission_id
        };
      }


      const payload = { email: user.email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });
      return {
        status: 'LOGIN_NORMAL_SUCCESSFUL',
        user: {
          access_token: access_token,
          name: user?.name,
          email: user?.email,
          id: user?.id,
          permission: user.permission_id
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async generateVerificationToken(email: string) {
    // ตรวจสอบว่า email นี้มีอยู่ใน users หรือไม่
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Email not found");
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 ชั่วโมง

    // ลบ token เดิม (กันซ้ำ)
    await this.prisma.verification_token.deleteMany({
      where: { email },
    });

    // สร้าง token ใหม่
    await this.prisma.verification_token.create({
      data: {
        email,
        token,
        expires,
      },
    });

    await this.sendVerifyEmail.sendVerificationEmail(email, token);

    return token;
  }

  async verifyEmail(verificationEmailDTO: VerificationEmailDTO, res) {

    const token = verificationEmailDTO.token;
    const record = await this.prisma.verification_token.findUnique({ where: { token } });

    if (!record || record.expires < new Date()) {
      // throw new HttpException('Token is invalid or has expired', HttpStatus.BAD_REQUEST);
      // return res.redirect('http://localhost:3005/login?error=invalid-token');
      return res.redirect('http://localhost:3005/login');

    }

    await this.prisma.user.update({
      where: { email: record.email },
      data: { email_verified_at: new Date() },
    });

    await this.prisma.verification_token.delete({ where: { token } });

    return { message: 'Email verified successfully.' };
    // return res.redirect('http://localhost:3005/login?verified=true');
    return res.redirect('http://localhost:3005/login');

  }

  async resendVerificationEmail({ email }: ResendVerificationDTO) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.email_verified_at) {
      throw new HttpException('EMAIL_ALREADY_VERIFIED', HttpStatus.BAD_REQUEST);
    }

    // ลบ token เดิมทั้งหมด (ถ้ามี)
    await this.prisma.verification_token.deleteMany({
      where: { email },
    });

    // สร้าง token ใหม่
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 ชั่วโมง

    await this.prisma.verification_token.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // ส่งอีเมลยืนยันใหม่
    await this.sendVerifyEmail.sendVerificationEmail(email, token);

    return {
      message: 'VERIFICATION_EMAIL_RESENT',
      status: 'EMAIL_NOT_VERIFIED',
    };
  }

  async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 นาที

    // ลบ token เดิม
    await this.prisma.password_reset_token.deleteMany({ where: { email: dto.email } });

    // สร้าง token ใหม่
    await this.prisma.password_reset_token.create({
      data: { email: dto.email, token, expires },
    });

    const resetUrl = `http://localhost:3005/reset-password?token=${token}&email=${dto.email}`;

    await this.forgetPassWordEmail.sendForgetPassWordEmail(dto.email, resetUrl);

    return { message: 'Password reset email sent.' };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const { email, token, newPassword } = dto;

    // 1. ตรวจสอบ token ว่าถูกต้องหรือหมดอายุหรือไม่
    const record = await this.prisma.password_reset_token.findFirst({
      where: {
        email,
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!record) {
      throw new HttpException('Token is invalid or has expired', HttpStatus.BAD_REQUEST);
    }

    // 2. เข้ารหัสรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. อัปเดตรหัสผ่านของผู้ใช้
    await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    // 4. ลบ token หลังใช้แล้ว
    await this.prisma.password_reset_token.delete({
      where: { id: record.id },
    });

    return { message: 'Password has been reset successfully' };
  }


  async generate2FASecret(email: string) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, 'MyApp', secret);
    const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);

    await this.prisma.user.update({
      where: { email },
      data: {
        two_factor_secret: secret,
        is_two_factor_enabled: true
      },
    });

    return { otpauthUrl, qrCodeDataURL };
  }

  async twoFA_qrCode(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.two_factor_secret) {
      throw new NotFoundException('2FA_SECRET_NOT_FOUND');
    }

    const otpauthUrl = authenticator.keyuri(user.email, 'MyApp', user.two_factor_secret);
    const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);

    return { otpauthUrl, qrCodeDataURL };

  }

  async verify2FA(userId: number, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.two_factor_secret) {
      return false;
    }

    return authenticator.verify({ token: code, secret: user.two_factor_secret });
  }

  async enable2FA(dto: twoFAEnableDTO) {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    if (dto.is_two_factor_enabled) {
      // ตรวจสอบว่าผู้ใช้มี secret อยู่แล้วหรือยัง
      if (!user.two_factor_secret) {
        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(user.email, 'MyApp', secret);
        const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);

        await this.prisma.user.update({
          where: { id: dto.userId },
          data: {
            two_factor_secret: secret,
            is_two_factor_enabled: true,
          },
        });

        await this.twoFA_enableEmail.sendEnable2FAEmail(user.email, qrCodeDataURL);
        return { otpauthUrl, qrCodeDataURL };
      } else {
        // เปิด 2FA แต่ไม่ต้องสร้างใหม่
        await this.prisma.user.update({
          where: { id: dto.userId },
          data: {
            is_two_factor_enabled: true,
          },
        });

        return { message: '2FA enabled successfully' };
      }
    }
    else {
      // ปิดการใช้งาน 2FA
      await this.prisma.user.update({
        where: { id: dto.userId },
        data: {
          two_factor_secret: '',
          is_two_factor_enabled: false,
        },
      });

      await this.twoFA_enableEmail.sendDisenable2FAEmail(user.email);
      return {
        message: 'Two-Factor Authentication disabled',
      };
    }
  }


  async login2FA(userId: number, code: string) {

    const valid = await this.verify2FA(userId, code);

    if (!valid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    const user = await this.getUserById(userId);
    const payload = { email: user?.email };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      status: 'LOGIN_2FA_SUCCESSFUL',
      user: {
        access_token: access_token,
        name: user?.name,
        email: user?.email,
        id: user?.id,
        permission: user?.permission_id
      }

    };
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
