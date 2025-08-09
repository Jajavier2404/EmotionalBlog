

// src/app.module.ts - PARA META 1
import { Module, } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { EntriesModule } from './application/entries/entries.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: (env) => {
        const parsed = validationSchema.safeParse(env);
        if (!parsed.success) {
          console.error('Config validation error:', parsed.error.format());
          throw new Error('Invalid environment variables');
        }
        return parsed.data;
      },
      isGlobal: true,
    }),
    PrismaModule,
    EntriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}