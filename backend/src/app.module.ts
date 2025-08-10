import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthController } from './interfaces/http/auth/auth.controller';
import { RegisterUserUseCase } from './application/auth/register-user.usecase';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: UserRepository, // o un token como 'UserRepository'
      useClass: PrismaUserRepository,
    },
    RegisterUserUseCase,
  ],
  exports: [UserRepository],
})
export class AppModule {}
