import { Injectable,NotFoundException,ForbiddenException, Inject } from "@nestjs/common";
import type { EntryRepository } from "src/domain/repositories/entry.repository";

@Injectable()
export class DeleteEntryUseCase {
    constructor(
        @Inject('EntryRepository')
        private readonly entryRepository : EntryRepository){}

    async execute(id: string ,userId:string):Promise<void>{
        const entrada = await this.entryRepository.findById(id);

        if(!entrada){
            throw new NotFoundException("Entrada no encontrada")
        }

        if(entrada.userId !== userId){
            throw new ForbiddenException("No tienes permisos para eliminar esta entrada")
        }

        await this.entryRepository.delete(id)
    }

}