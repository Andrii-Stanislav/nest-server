import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 123, description: 'Uniqe ID' })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({ example: 'asd123', description: 'Password' })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ApiProperty({ example: true })
  @Column({
    type: 'bool',
    default: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'Bad boy', description: 'Ban reason' })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  banReason: string;
}
