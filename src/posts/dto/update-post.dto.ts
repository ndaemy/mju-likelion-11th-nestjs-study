import { IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @MaxLength(500)
  content: string;
}
