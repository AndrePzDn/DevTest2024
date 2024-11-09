import { InMemoryRepository } from 'src/common/repositories/in-memory.repository';
import { Option } from '../entities/option.entity';
import { CreateOptionDto } from '../dto/create-option.dto';

export class InMemoryOptionRepository extends InMemoryRepository<
  Option,
  CreateOptionDto
> {}
