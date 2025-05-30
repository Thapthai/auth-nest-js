import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyEmail } from './email/verifyEmail.service';
import { ForgetPassWordEmail } from './email/forgetPassWordEmail.service';
import { TwoFA_enableEmail } from './email/twoFA_enableEmail.service';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, JwtAuthGuard, VerifyEmail, ForgetPassWordEmail, TwoFA_enableEmail],
})
export class AuthenticationModule { }
