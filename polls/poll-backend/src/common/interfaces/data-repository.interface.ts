export interface DataRepository<T, C> {
  create(item: C): Promise<T>;
  find(): Promise<T[]>;
}
