import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Paragraph } from '../paragraph/entities/paragraph.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Paragraph, (p) => p.project, {})
  paragraphs: Paragraph[];
}
