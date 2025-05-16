import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ForgetPassWordEmail {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendForgetPassWordEmail(email: string, resetUrl: string) {
    const url = resetUrl;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">เปลี่ยนรหัสผ่าน <span style="color: #4f46e5;">My App</span> </h2>
        <p style="font-size: 16px; color: #555;">สวัสดีคุณ <strong>${email}</strong>,</p>
        <p style="font-size: 16px; color: #555;">
          กรุณาคลิกปุ่มด้านล่างเพื่อยืนยันตั้งรหัสผ่านใหม่:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            ยืนยันอี ตั้งรหัสผ่านใหม่
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
      subject: 'กรุณายืนยันอีเมลของคุณ เพื่อตั้งค่ารหัสผ่านใหม่',
      html: htmlContent,
    });
  }
}
