import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  HttpCode,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './authentication.service';
import { VerifyEmail } from './email/verifyEmail.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoingDTO, RegisterDTO } from './dto';
import { VerificationEmailDTO } from './dto/verificationEmail.dto';
import { ResendVerificationDTO } from './dto/resendVerification.dto';
import { ForgotPasswordDTO } from './dto/forgetPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto'; 
import { twoFAEnableDTO } from './dto/twoFAEnable.dto';
import { Throttle } from '@nestjs/throttler';



// @Throttle({ default: { limit: 10, ttl: 60000 } })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sendVerifyEmail: VerifyEmail,
  ) { }

  
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const user = await this.authService.register(body);
    return { message: 'User registered', userId: user.id };
  }

  @Post('login')
  @HttpCode(201)
  async login(@Body() body: LoingDTO) {
    return this.authService.login(body);
  }

  @Post('forget-password')
  forgot(@Body() dto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  reset(@Body() dto: ResetPasswordDTO) {
    return this.authService.resetPassword(dto);
  }

  @Get('verify-email')
  async verifyEmail(@Query() dto: VerificationEmailDTO, @Res() res: Response) {
    return await this.authService.verifyEmail(dto, res);
  }

  @Post('resend-verification')
  @HttpCode(200)
  async resendVerification(@Body() dto: ResendVerificationDTO) {
    return this.authService.resendVerificationEmail(dto);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('2fa/verify')
  async verify2FA(@Body() body) {
    const isValid = await this.authService.verify2FA(body.userId, body.code);
    if (!isValid) throw new Error('Invalid 2FA code');
    const user = await this.authService.getUserById(body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/generate2FASecret')
  async setup2FA(@Req() req) {
    return this.authService.generate2FASecret(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('2fa/2FAqrcode')
  async getQRCode(@Query() body) {
    return this.authService.twoFA_qrCode(parseInt(body.userId));
  }

  // เปิดการใช้งาน 2FA 
  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable')
  async enable2FA(@Body() dto: twoFAEnableDTO) {
    return this.authService.enable2FA(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/login')
  async loginWith2FA(@Body() body) {
    return await this.authService.login2FA(body.userId, body.code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Query('userId') userId: number) {
    return await this.authService.getUserById(Number(userId));
  }

  // =================================== ทดสอบ การส่ง Email ===================================
  @Get('test-send-mail')
  async testSendEmail() {
    const testEmail = 'youremail@gmail.com';
    const testToken = 'example-test-token';

    await this.sendVerifyEmail.sendVerificationEmail(testEmail, testToken);
    return { message: 'Test email sent' };
  }
}
