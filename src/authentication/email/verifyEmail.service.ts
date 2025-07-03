import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class VerifyEmail {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

 

    async sendVerificationEmail(email: string, token: string) {
        const url = `${process.env.PROJECT_URL}/auth/verify-email?token=${token}&email=${email}`;

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">ยินดีต้อนรับสู่ <span style="color: #4f46e5;">My App</span></h2>
        <p style="font-size: 16px; color: #555;">สวัสดีคุณ <strong>${email}</strong>,</p>
        <p style="font-size: 16px; color: #555;">
          กรุณาคลิกปุ่มด้านล่างเพื่อยืนยันอีเมลของคุณและเปิดใช้งานบัญชี:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            ยืนยันอีเมลของคุณ
          </a>
        </div>
        <p style="font-size: 14px; color: #888;">หากคุณไม่ได้สมัครบัญชีกับเรา กรุณาเพิกเฉยต่ออีเมลนี้</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} My App. All rights reserved.</p>
      </div>
    `;

        await this.transporter.sendMail({
            from: '"My App" <noreply@myapp.com>',
            to: email,
            subject: 'กรุณายืนยันอีเมลของคุณ',
            html: htmlContent,
        });
    }
}
