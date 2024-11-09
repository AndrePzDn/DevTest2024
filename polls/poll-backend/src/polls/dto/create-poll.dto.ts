import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Option } from 'src/options/entities/option.entity';
import { Type } from 'class-transformer';
import { CreateOptionDto } from 'src/options/dto/create-option.dto';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => CreateOptionDto)
  options: Option[];
}
