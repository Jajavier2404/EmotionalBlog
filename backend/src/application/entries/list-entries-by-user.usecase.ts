import { Inject,Injectable } from "@nestjs/common";
import type { EntryRepository } from "src/domain/repositories/entry.repository";
import { Entry } from "src/domain/entities/entry.entity";

@Injectable()
export class ListEntriesByUserUseCase {
  constructor(
    @Inject('EntryRepository') // Asegúrate de que el token coincida con el proporcionado en tu módulo
    private readonly entryRepository: EntryRepository) {}

  async execute(userId: string): Promise<Entry[]> {
    return this.entryRepository.findByUserId(userId);
  }
}