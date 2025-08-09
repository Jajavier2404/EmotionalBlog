/**
*   Este archivo tiene como fin realizar las operaciones CRUD de las entradas en la base de datos utilizando Prisma. 
*/

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { EntryRepository } from "src/domain/repositories/entry.repository";
import { Entry } from "src/domain/entities/entry.entity";
@Injectable()
export class PrismaEntryRepository implements EntryRepository {
    constructor(private prisma: PrismaService) {} //Utiliza PrismaService para interactuar con la base de datos a través de PrismaModule.

    async create(entrada: Omit<Entry, "id" | "createdAt" | "updatedAt">): Promise<Entry> {
        const nuevaEntrada = await this.prisma.entry.create({
            data: {
                fecha: entrada.fecha,
                emocion: entrada.emocion,
                texto: entrada.texto,
                userId: entrada.userId,
            },
        });
        return new Entry(
            nuevaEntrada.id,
            nuevaEntrada.fecha,
            nuevaEntrada.emocion,
            nuevaEntrada.texto,
            nuevaEntrada.createdAt,
            nuevaEntrada.updatedAt,
            nuevaEntrada.userId,
        )
    }  
    async findByUserId(usuarioId: string): Promise<Entry[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Entry | null> {
        throw new Error("Method not implemented.");
    }
    async update(id:string, datos:any): Promise<Entry> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}