import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddVoteDto {
  @IsNumber()
  optionId: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  voterEmail: string;
}
