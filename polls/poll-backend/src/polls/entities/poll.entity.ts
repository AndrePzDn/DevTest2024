import { BaseEntity } from 'src/common/entities/base.entity';
import { Option } from 'src/options/entities/option.entity';

export class Poll extends BaseEntity {
  name: string;
  options: Option[];
}
