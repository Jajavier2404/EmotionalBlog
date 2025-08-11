/*
 * /-/-/ Entries module /-/-/
 * Este módulo agrupa todos los componentes relacionados con la gestión de entradas (blogs) 
 * en la aplicación. 
 * 
 * Además, define el proveedor del repositorio de entradas, permitiendo la inyección de 
 * la implementación concreta (PrismaEntryRepository) usando el token 'EntryRepository'.
 * 
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { EntriesController } from '../../interfaces/http/entries/entries.controller';
import { CreateEntryUseCase } from './create-entry.usecase';
import { ListEntriesByUserUseCase } from './list-entries-by-user.usecase';
import { UpdateEntryUseCase } from './update-entry.usecase';
import { DeleteEntryUseCase } from './delete-entry.usecase';
import { PrismaEntryRepository } from '../../infrastructure/repositories/prisma-entry.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EntriesController],
  providers: [
    // Casos de uso
    CreateEntryUseCase,
    ListEntriesByUserUseCase,
    UpdateEntryUseCase,
    DeleteEntryUseCase,
    
    // Repositorio
    /**
    * Se liga el archivo PrismaEntryRepository al token "EntryRepository" esto para aplicar el principio de inversion de 
    * depedencia haciendo el codigo mas flexible :D
    * 
    * Aca se coloca el estas claves de provide y useClass para que en este archivo se cree una instancia de la clase de
    * prismaEntryRepository para que cuando se vuelva a llamar por su apodo "EntryRepository" ya unicamente se tenga que 
    * acceder sea al metodo(funciones) que posee la clase
    * 
    * Nota: "EntryRepository" aquí no es la interfaz ni el archivo entry.repository.ts,
    * sino un apodo (nickname) que sirve como identificador para la inyección de dependencias.
    * Así, cuando en los casos de uso (.usecase) se inyecta "EntryRepository" en el constructor,
    * NestJS proveerá una instancia del  PrismaEntryRepository.
     */
    {
      provide: "EntryRepository", //Cada vez que se inyecte 'EntryRepository', se utilizaran instancias del PrismaEntryRepository
      useClass: PrismaEntryRepository,
    },
  ],
})
export class EntriesModule {}