import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/interfaces/http/auth/auth.controller';
import { RegisterUserUseCase } from './register-user.usecase';
import { LoginUserUseCase } from './login-user.usecase';
import { ForgotPasswordUseCase } from './forgot-password.usecase';
import { ResetPasswordUseCase } from './reset-password.usecase';
import { JwtStrategy } from 'src/infrastructure/security/jwt.strategy';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/repositories/prisma-user.repository';
import { MailerService } from 'src/infrastructure/email/mailer.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi_secreto_ultra_seguro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    MailerService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
  ],
})
export class AuthModule {}
