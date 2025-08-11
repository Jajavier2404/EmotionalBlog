import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  async sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
    await this.transporter.sendMail({
      from: `"Soporte" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });
  }
}
