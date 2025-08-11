import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "../../infrastructure/email/mailer.service";

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException("Usuario no encontrado");

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: process.env.RESET_PASSWORD_JWT_SECRET || "reset_secret",
        expiresIn: "15m"
      }
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailer.sendMail({
      to: user.email,
      subject: "Recupera tu contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>Este enlace expirará en 15 minutos.</p>`
    });

    return { message: "Correo de recuperación enviado" };
  }
}
