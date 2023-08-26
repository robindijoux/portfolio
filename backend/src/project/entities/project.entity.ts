import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @Generated('uuid')
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  title: string;

  @Column({
    type: 'longtext',
    nullable: true
  })
  htmlContent: string;
}
