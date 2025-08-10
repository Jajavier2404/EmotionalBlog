import { Body, Controller, Post } from "@nestjs/common";
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
      return {
        message: "Error de validación",
        errors: result.error.format(),
      };
    }
    return this.registerUser.execute(result.data);
  }

  @Post("login")
  async login(@Body() body: any) {
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return {
        message: "Error de validación",
        errors: result.error.format(),
      };
    }
    return this.loginUser.execute(result.data);
  }
}
