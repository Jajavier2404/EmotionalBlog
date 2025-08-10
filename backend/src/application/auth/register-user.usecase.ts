// src/application/auth/register-user.usecase.ts
import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterDto } from "../../interfaces/http/auth/dto/register.dto";

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException("El correo ya está registrado");
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Guardar en DB
    const user = await this.userRepository.create({
      name: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
