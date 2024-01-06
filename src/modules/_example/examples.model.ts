import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'examples' })
export class Example {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
