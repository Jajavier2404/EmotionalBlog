/*
 * /-/-/ Entry Repository Interface /-/-/
 * Este archivo define la interfaz EntryRepository, que especifica
 * las operaciones CRUD que se pueden realizar sobre las entradas
 * 
 * Su funcion es especificar los métodos que deben implementarse
 * y la estructura de los datos que se manejaran en cada operacion del CRUD.
 */

import { Entry } from "../entities/entry.entity";
export interface EntryRepository {
    create(entrada: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entry>;// Recibe todo el objeto menos id, createdAt y updatedAt y retorna el objeto completo (crea los blogs)
    findByUserId(usuarId: string): Promise<Entry[]>; // Busca todos los blogs de un usuario con el parámetro usuarioId (ideal para mostrar el listado de blogs de un usuario)
    findById(id: string): Promise<Entry | null>;// Busca un blog por su id (ideal para mostrar un blog en concreto)
    update(id:string,datos: Partial<Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Entry>; // Actualiza un blog por su id 
    delete(id: string): Promise<void>; //elimina un blog por su id 
}