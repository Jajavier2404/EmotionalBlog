import { Controller, Post, Body, Req ,Patch,Param } from "@nestjs/common"; 
import { CreateEntryUseCase } from "src/application/entries/create-entry.usecase";
import type { CreateEntryDto } from "./dto/create-entry.dto";
import { CreateEntryDtoSchema } from "./dto/create-entry.dto";
import { ZodValidationPipe } from "src/infrastructure/pipes/zod-validation.pipe";

// GET
import { Get } from "@nestjs/common";
import { ListEntriesByUserUseCase } from "src/application/entries/list-entries-by-user.usecase";
//import { jwtAuthGuard } from "src/common/guards/jwt-auth.guard";

// UPDATE
import { UpdateEntryUseCase } from "src/application/entries/update-entry.usecase";
import type { UpdateEntryDto } from "./dto/update-entry.dto";
import { UpdateEntryDtoSchema } from "./dto/update-entry.dto";

// DELETE
import { Delete } from "@nestjs/common";
import { DeleteEntryUseCase } from "src/application/entries/delete-entry.usecase";
@Controller('entries')
export class EntriesController {
    constructor( 
        private readonly createEntryUseCase: CreateEntryUseCase ,
        private readonly listEntriesByUserUseCase: ListEntriesByUserUseCase,
        private readonly updateEntryUseCase: UpdateEntryUseCase,
        private readonly deleteEntryUseCase: DeleteEntryUseCase,
        
    ) {}
    
    // ---- RUTA POST PARA CREAR UNA ENTRADA ----
    @Post()
    // @UseGuards(jwtAuthGuard)


    async create(
        @Body(new ZodValidationPipe(CreateEntryDtoSchema)) createEntryDto: CreateEntryDto,
        @Req() req: any
    ) {
        const userId = "test-user-123"; // harcodeo user para pruebas req.user.id cuando esté JWT
        

        const entrada = await this.createEntryUseCase.execute(
            createEntryDto.title,
            createEntryDto.emocion,
            createEntryDto.texto,
            userId
        )
        return entrada
    }

    // ---- RUTA GET PARA LISTAR ENTRADAS POR USUARIO ----
    @Get()
    async findAll(@Req() req: any) {
        const userId = "test-user-123"; // harcodeo user para pruebas req.user.id cuando esté JWT        
        const entradas = await this.listEntriesByUserUseCase.execute(userId);
        return entradas;
    }

    // ---- RUTA PATCH PARA ACTUALIZAR UNA ENTRADA ----
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(UpdateEntryDtoSchema)) updateEntryDto: UpdateEntryDto,
        @Req() req: any
    ){
        const userId = "test-user-123"; // harcodeo user para pruebas req.user.id cuando esté JWT
        const entradaActualizada = await this.updateEntryUseCase.execute( // Se guardan los cambios en la base de datos 
            id,
            updateEntryDto,
            userId
        );
        return entradaActualizada;
    }

    // --- RUTA DELETE PARA ELIMIUNAR UN BLOG(ENTRADA) ---
    @Delete(':id')
    async remove(@Param('id') id:string, @Req() req: any){
        const userId = 'test-user-123' // harcodeo user para pruebas req.user.id cuando esté JWT
        await this.deleteEntryUseCase.execute(id,userId)

        return {message:'Entrada eliminada correctamente B)'}
    }
}