import { Controller, Post, Body, Req ,UseGuards } from "@nestjs/common"; 
import { CreateEntryUseCase } from "src/application/entries/create-entry.usecase";
import type { CreateEntryDto } from "./dto/create-entry.dto";
import { CreateEntryDtoSchema } from "./dto/create-entry.dto";
import { ZodValidationPipe } from "src/infrastructure/pipes/zod-validation.pipe";

// GET
import { Get } from "@nestjs/common";
import { ListEntriesByUserUseCase } from "src/application/entries/list-entries-by-user.usecase";
//import { jwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@Controller('entries')
export class EntriesController {
    constructor( 
        private readonly createEntryUseCase: CreateEntryUseCase ,
        private readonly listEntriesByUserUseCase: ListEntriesByUserUseCase 
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
            createEntryDto.emocion,
            createEntryDto.texto,
            userId
        )
    }

    // ---- RUTA GET PARA LISTAR ENTRADAS POR USUARIO ----
    @Get()
    async findAll(@Req() req: any) {
        const userId = "test-user-123"; // harcodeo user para pruebas req.user.id cuando esté JWT        
        const entradas = await this.listEntriesByUserUseCase.execute(userId);
        return entradas;
    }
}