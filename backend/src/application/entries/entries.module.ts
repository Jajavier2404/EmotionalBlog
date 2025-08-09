// src/application/entries/entries.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { EntriesController } from '../../interfaces/http/entries/entries.controller';
import { CreateEntryUseCase } from './create-entry.usecase';
//import { ListEntriesByUserUseCase } from './list-entries-by-user.usecase';
//import { UpdateEntryUseCase } from './update-entry.usecase';
//import { DeleteEntryUseCase } from './delete-entry.usecase';
import { PrismaEntryRepository } from '../../infrastructure/repositories/prisma-entry.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EntriesController],
  providers: [
    // Casos de uso
    CreateEntryUseCase,
    //ListEntriesByUserUseCase,
    //UpdateEntryUseCase,
    //DeleteEntryUseCase,
    
    // Repositorio
    {
      provide: "EntryRepository",
      useClass: PrismaEntryRepository,
    },
  ],
})
export class EntriesModule {}