import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface CreationAttributes {
  name: string;
}

@Table({ tableName: 'examples' })
export class Example extends Model<Example, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;
}
