import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoingDTO, RegisterDTO } from './dto';
import { VerificationEmailDTO } from './dto/verificationEmail.dto';
import { VerifyEmail } from './verifyEmail.service';
import { ResendVerificationDTO } from './dto/resendVerification.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly sendVerifyEmail: VerifyEmail,
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
        const tokens = await this.prisma.verificationToken.findMany({
          where: { email: userDto.email }
        });

        const expiredToken = tokens.find(t => t.expires < new Date());
        const activeToken = tokens.find(t => t.expires >= new Date());

        if (expiredToken && !activeToken) {
          // มี token หมดอายุ และไม่มี token ที่ยังใช้ได้ → update
          const newToken = crypto.randomUUID();
          const newExpires = new Date(Date.now() + 1000 * 60 * 60);

          await this.prisma.verificationToken.update({
            where: { id: expiredToken.id },
            data: { token: newToken, expires: newExpires },
          });

          await this.sendVerifyEmail.sendVerificationEmail(user.email, newToken);
          console.log('🕐 มี token หมดอายุ → อัปเดต token และส่งใหม่');
        } else if (!activeToken) {
          // ไม่มี token เลย → generate ใหม่
          await this.generateVerificationToken(user.email);
          console.log('🆕 ไม่มี token เลย → generate ใหม่');
        } else {
          console.log('✅ มี token ที่ยังไม่หมดอายุอยู่แล้ว → ไม่ต้องส่งใหม่');
        }
        throw new HttpException('EMAIL_NOT_VERIFIED', 401);
      }

      const payload = { email: user.email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });

      return {
        access_token,
        status: 'LOGIN_SUCCESSFUL',
        name: user.name,
      };

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
    await this.prisma.verificationToken.deleteMany({
      where: { email },
    });

    // สร้าง token ใหม่
    await this.prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    await this.sendVerifyEmail.sendVerificationEmail(email, token);

    return token;
  }

  async verifyEmail(verificationEmailDTO: VerificationEmailDTO) {

    const token = verificationEmailDTO.token;
    const record = await this.prisma.verificationToken.findUnique({ where: { token } });

    if (!record || record.expires < new Date()) {
      throw new HttpException('Token is invalid or has expired', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.update({
      where: { email: record.email },
      data: { email_verified_at: new Date() },
    });

    await this.prisma.verificationToken.delete({ where: { token } });

    return { message: 'Email verified successfully.' };

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
    await this.prisma.verificationToken.deleteMany({
      where: { email },
    });

    // สร้าง token ใหม่
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 ชั่วโมง

    await this.prisma.verificationToken.create({
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

  async verify2FA(userId: number, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.two_factor_secret) {
      return false;
    }

    return authenticator.verify({ token: code, secret: user.two_factor_secret });
  }


  async enable2FA(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { is_two_factor_enabled: true },
    });
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }


}
