
/*
*   Este arcchivo se encarga de validar los datos entrantes utilizando Zod.
*   Se utiliza como un Pipe en NestJS y es para que los datos que llegan a los controladores
*   sean validados antes de ser procesados, por lo que los datos a enviar deberan ser pasados
*  como parametros de la clase ZodValidationPipe. para confirmar que cumplen con el esquema definido.
*
*/
import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { z  } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodSchema<any>) {}

    transform(value: any) {
        try{
            return this.schema.parse(value); // Utiliza Zod para validar el valor entrante contra el esquema definido.
        }catch (error) {
            if (error instanceof z.ZodError) {
                // Si hay un error de validación, lanzamos una excepción con los detalles del error.
                throw new BadRequestException({
                    message: 'Validation failed',
                    errors: error.issues,
                });
            }
            throw new BadRequestException('Validation Pipe Failed')
        }
}
}