import { DataRepository } from '../interfaces/data-repository.interface';

export abstract class InMemoryRepository<T, C> implements DataRepository<T, C> {
  data = new Map<number, T>();

  async create(item: C): Promise<T> {
    const id = this.data.size + 1;
    const newItem: T = { ...item, id: id } as T;
    this.data.set(id, newItem);
    return await newItem;
  }
  async find(): Promise<T[]> {
    return Array.from(this.data.values());
  }
}
