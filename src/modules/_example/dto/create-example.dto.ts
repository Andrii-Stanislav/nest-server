import { IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString({ message: 'Example name have to be string' })
  readonly name: string;
}
