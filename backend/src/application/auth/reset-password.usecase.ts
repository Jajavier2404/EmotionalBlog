import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.RESET_PASSWORD_JWT_SECRET || "reset_secret"
      });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepo.updatePassword(payload.sub, hashedPassword);

      return { message: "Contraseña actualizada correctamente" };
    } catch (err) {
      throw new BadRequestException("Token inválido o expirado");
    }
  }
}
