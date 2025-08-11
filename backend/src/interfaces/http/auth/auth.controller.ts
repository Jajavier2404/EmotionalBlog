import { Body, Controller, Post, Put, BadRequestException, Query } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../application/auth/register-user.usecase";
import { LoginUserUseCase } from "../../../application/auth/login-user.usecase";
import { ForgotPasswordUseCase } from "../../../application/auth/forgot-password.usecase";
import { ResetPasswordUseCase } from "../../../application/auth/reset-password.usecase";
import { RegisterSchema } from "./dto/register.dto";
import { LoginSchema } from "./dto/login.dto";
import { ForgotPasswordSchema } from "./dto/forgot-password.dto";
import { ResetPasswordSchema } from "./dto/reset-password.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly forgotPassword: ForgotPasswordUseCase,
    private readonly resetPassword: ResetPasswordUseCase
  ) {}

  @Post("register")
  async register(@Body() body: any) {
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      const emailError = result.error.format().email?._errors?.[0] || null;
      throw new BadRequestException({
        message: emailError || "Error de validación",
        errors: result.error.format(),
      });
    }
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

  @Post("forgot-password")
  async forgotPasswordEndpoint(@Body() body: any) {
    const result = ForgotPasswordSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        message: "Error de validación",
        errors: result.error.format(),
      });
    }
    return this.forgotPassword.execute(result.data.email);
  }

  @Put("reset-password")
  async resetPasswordEndpoint(@Query("token") token: string, @Body() body: any) {
    const result = ResetPasswordSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        message: "Error de validación",
        errors: result.error.format(),
      });
    }
    return this.resetPassword.execute(token, result.data.password);
  }
}
