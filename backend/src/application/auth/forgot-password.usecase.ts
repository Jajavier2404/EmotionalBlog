import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../../infrastructure/email/mailer.service';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: process.env.RESET_PASSWORD_JWT_SECRET || 'reset_secret',
        expiresIn: '15m',
      },
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailer.sendMail({
      to: user.email,
      subject: 'Restablecimiento de Contraseña - Emotional Blog',
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #111827;">Restablecimiento de Contraseña</h2>
      <p>Hola, hemos recibido una solicitud para restablecer tu contraseña de <strong>Emotional Blog</strong>.</p>
      <p>Haz clic en el siguiente botón para continuar:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Restablecer Contraseña
        </a>
      </div>
      <p style="font-size: 14px; color: #6b7280;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #6b7280; text-align: center;">
        Este enlace expirará en <strong>15 minutos</strong>.
      </p>
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">© 2024 Emotional Blog. Todos los derechos reservados.</p>
    </div>
  </div>
`,
    });
    console.log(`Correo de recuperación enviado a: ${user.email}`);

    return { message: 'Correo de recuperación enviado' };
  }
}
