/*
*   /-/-/ prisma entry repository/-/-/
*   Este archivo tiene como fin realizar las operaciones CRUD de las entradas en la base de datos utilizando Prisma. 
*   Recordar que este archivo esta ligado al entry repository 
*/

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { EntryRepository } from "src/domain/repositories/entry.repository";
import { Entry } from "src/domain/entities/entry.entity";
@Injectable()
export class PrismaEntryRepository implements EntryRepository {
    constructor(private prisma: PrismaService) {} //Utiliza PrismaService para interactuar con la base de datos a través de PrismaModule.

    async create(entrada: Omit<Entry, "id" | "createdAt" | "updatedAt">): Promise<Entry> { // Crea una nueva entrada (Blog) en la base de datos
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
    async findByUserId(userId: string): Promise<Entry[]> { // Busca todas las entradas (Blogs) de un usuario específico
        const entradas = await this.prisma.entry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            });
        return entradas.map(entrada => new Entry(
            entrada.id,
            entrada.fecha,
            entrada.emocion,
            entrada.texto,
            entrada.createdAt,
            entrada.updatedAt,
            entrada.userId,
        ));
        
    }
    async findById(id: string): Promise<Entry | null> { // Busca una entrada (Blog) por su ID 
        const entrada = await this.prisma.entry.findUnique({
            where: { id },
        })

        if (!entrada) return null;

        return new Entry(
            entrada.id,
            entrada.fecha,
            entrada.emocion,
            entrada.texto,
            entrada.createdAt,
            entrada.updatedAt,
            entrada.userId,
        );
    }
    async update(id:string, datos: Partial<Omit<Entry,"id" |'createdAt' |'updatedAt'>>): Promise<Entry> { // Actualiza una entrada (Blog) existente en base al ID del blog 
        const entradaActualizada = await this.prisma.entry.update({
            where: { id },
            data: datos,
        });
        return new Entry(
            entradaActualizada.id,
            entradaActualizada.fecha,
            entradaActualizada.emocion,
            entradaActualizada.texto,
            entradaActualizada.createdAt,
            entradaActualizada.updatedAt,
            entradaActualizada.userId,
        );
    }
    async delete(id: string): Promise<void> {
        await this.prisma.entry.delete({
            where: { id }
        });
    }
}