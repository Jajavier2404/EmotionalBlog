import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthController } from './interfaces/http/auth/auth.controller';
import { RegisterUserUseCase } from './application/auth/register-user.usecase';
import { LoginUserUseCase } from './application/auth/login-user.usecase';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi_secreto_ultra_seguro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
    JwtStrategy,
  ],
  exports: [UserRepository],
})
export class AppModule {}
