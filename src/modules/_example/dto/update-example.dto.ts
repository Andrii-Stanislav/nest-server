import { IsString, IsOptional } from 'class-validator';

export class UpdateExampleDto {
  @IsString({ message: 'Example name have to be string' })
  @IsOptional()
  readonly name?: string;
}
