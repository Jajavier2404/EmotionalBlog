/*
*   ---- Infrastructure / database ----
*            ---- File 2 ----
*   Este es el Módulo Prisma que se encarga de que cuando se haga la conexión a la base de datos y
*   esta quede de manera global para que pueda ser utilizada en otros módulos de la aplicación.
*   logrando que se puedan ejecutar consultas a la base de datos desde cualquier parte de la aplicación.
*/


import  {Module, Global} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que el módulo sea global, lo que significa que se puede importar en otros módulos sin necesidad de volver a importarlo.
@Module({
  providers: [PrismaService], // Proporciona el servicio PrismaService para que pueda ser inyectado en otros componentes.
  exports: [PrismaService], // Exporta PrismaService para que pueda ser utilizado en otros módulos.
})

export class PrismaModule {} // Exporta el módulo PrismaModule para que pueda ser importado en otros módulos de la aplicación.
