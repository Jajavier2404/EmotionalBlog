
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/interfaces/http/auth/auth.controller';
import { RegisterUserUseCase } from './register-user.usecase';
import { LoginUserUseCase } from './login-user.usecase';
import { JwtStrategy } from 'src/infrastructure/security/jwt.strategy';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/repositories/prisma-user.repository';
import { PassportModule } from '@nestjs/passport';

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
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
