import { BaseEntity } from 'src/common/entities/base.entity';

export class Option extends BaseEntity {
  constructor() {
    super();
    this.votes = 0;
  }

  name: string;
  votes: number;
}
