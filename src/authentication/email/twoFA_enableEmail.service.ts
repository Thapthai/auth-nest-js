import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TwoFA_enableEmail {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });


  async sendEnable2FAEmail(email: string, qrCodeDataURL: string) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">เปิดใช้งาน Two-Factor Authentication (2FA)</h2>
      <p style="font-size: 16px; color: #555;">สวัสดีคุณ <strong>${email}</strong>,</p>
      <p style="font-size: 16px; color: #555;">
        ระบบได้เปิดใช้งาน 2FA สำหรับบัญชีของคุณเรียบร้อยแล้ว กรุณาสแกน QR Code ด้านล่างด้วยแอป <strong>Google Authenticator</strong> หรือแอปอื่นที่รองรับ:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <img src="${qrCodeDataURL}" alt="2FA QR Code" style="max-width: 250px;" />
      </div>
      <p style="font-size: 14px; color: #888;">หากคุณไม่ได้เป็นผู้เปิดใช้งาน 2FA กรุณาแจ้งทีมสนับสนุนทันที</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} My App. All rights reserved.</p>
    </div>
  `;

    await this.transporter.sendMail({
      from: '"My App" <noreply@myapp.com>',
      to: email,
      subject: 'QR Code สำหรับการเปิดใช้งาน Two-Factor Authentication (2FA)',
      html: htmlContent,
    });
  }

  async sendDisenable2FAEmail(email: string) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">ปิดใช้งาน Two-Factor Authentication (2FA)</h2>
      <p style="font-size: 16px; color: #555;">สวัสดีคุณ <strong>${email}</strong>,</p>
      <p style="font-size: 16px; color: #555;">
        ระบบได้ปิดใช้งาน 2FA สำหรับบัญชีของคุณเรียบร้อยแล้ว 
      <p style="font-size: 14px; color: #888;">หากคุณไม่ได้เป็นผู้ปิดใช้งาน 2FA กรุณาแจ้งทีมสนับสนุนทันที</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} My App. All rights reserved.</p>
    </div>
  `;

    await this.transporter.sendMail({
      from: '"My App" <noreply@myapp.com>',
      to: email,
      subject: 'ปิดใช้งาน Two-Factor Authentication (2FA)',
      html: htmlContent,
    });
  }
}
