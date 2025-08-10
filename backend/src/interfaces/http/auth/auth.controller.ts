// src/interfaces/http/auth/auth.controller.ts
import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../application/auth/register-user.usecase";
import { RegisterSchema } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post("register")
  async register(@Body() body: any) {
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return {
        message: "Error de validación",
        errors: result.error.format(),
      };
    }

    return this.registerUser.execute(result.data);
  }
}
