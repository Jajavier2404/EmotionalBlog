/*
*   ---- Infrastructure / database ----
*           ---- File 1 ----
*   Este es el Archivo encargado de la conexión a la base de datos utilizando Prisma.
*   PrismaService extiende de PrismaClient, lo que permite utilizar todas las funcionalidades de Prisma.
*   Se utiliza el Injectable de NestJS para que PrismaService pueda ser inyectado en otros componentes.
*/


import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // Hace que PrismaService sea inyectable lo que significa que puede ser utilizado en otros archivos como propiedades de clase o inyectado en constructores.


export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() { // Método que se ejecuta cuando el módulo se inicializa.
        // Conectar a la base de datos al iniciar el módulo.
        await this.$connect();

    }
    
    async onModuleDestroy() { // Método que se ejecuta cuando el módulo se destruye.
        // Desconectar de la base de datos al destruir el módulo.
        await this.$disconnect();
    }
}