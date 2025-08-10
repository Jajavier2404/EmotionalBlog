// src/application/auth/register-user.usecase.ts
import {
  Injectable,
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterDto } from "../../interfaces/http/auth/dto/register.dto";

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterDto) {
    console.log("1. Ejecución del caso de uso iniciada.");
    //console.log("Datos de entrada en use case:", data);

    try {
      // Verificar si el usuario ya existe
      console.log("Buscando si el correo ya existe en la DB...");
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser) {
        console.log("Usuario ya existe:", existingUser);
        throw new ConflictException("El correo ya está registrado");
      }

      console.log("2. Verificación de correo duplicado completada.");

      // Hashear contraseña
      console.log("Hasheando contraseña...");
      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log("3. Contraseña hasheada correctamente.");

      // Guardar en DB
      console.log("4. Intentando crear el usuario en la base de datos...", {
        name: data.username,
        email: data.email
      });

      const user = await this.userRepository.create({
        name: data.username,
        email: data.email,
        password: hashedPassword
      });

      console.log("5. ¡Usuario creado exitosamente en la DB!", user);

      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    } catch (error) {
      console.error("ERROR CATASTRÓFICO DENTRO DEL CASO DE USO:", error);

      if (error instanceof ConflictException) {
        console.log("Se lanza ConflictException por correo duplicado.");
        throw error;
      }

      throw new InternalServerErrorException(
        "Ocurrió un error inesperado al registrar el usuario."
      );
    }
  }
}
