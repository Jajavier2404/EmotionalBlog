import { Body, Controller, Post, BadRequestException } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../application/auth/register-user.usecase";
import { LoginUserUseCase } from "../../../application/auth/login-user.usecase";
import { RegisterSchema } from "./dto/register.dto";
import { LoginSchema } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase
  ) {}

  @Post("register")
  async register(@Body() body: any) {

    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      const formattedErrors = result.error.format();
      console.log("Validación fallida:", formattedErrors);

      // Detectar si hay error en el email
      const emailError = formattedErrors.email?._errors?.[0] || null;

      throw new BadRequestException({
        message: emailError || "Error de validación",
        errors: formattedErrors,
      });
    }

    console.log("Validación superada, ejecutando caso de uso...");
    return this.registerUser.execute(result.data);
  }

  @Post("login")
  async login(@Body() body: any) {
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        message: "Error de validación",
        errors: result.error.format(),
      });
    }
    return this.loginUser.execute(result.data);
  }
}
