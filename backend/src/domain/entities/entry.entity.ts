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