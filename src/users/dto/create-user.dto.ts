import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(/^[A-Za-z0-9!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
