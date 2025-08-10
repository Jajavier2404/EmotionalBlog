/*
 * /-/-/ Entry Entity /-/-/
 * 
 * Este archivo define la entidad Entry, que representa una entrada de 
 * blogs en el dominio de la aplicación. 
 * 
 * Su funcion es facilitar la creación, actualización y eliminación 
 * de entradas de blog.
 */

export class Entry {
  constructor(
    public readonly id:string,
    public readonly fecha: Date,
    public readonly emocion: string,
    public readonly texto: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly userId: string,
  ) {}
}