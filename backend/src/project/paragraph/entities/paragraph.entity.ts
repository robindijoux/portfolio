import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../entities/project.entity";

@Entity()
export class Paragraph {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string
    
    @ManyToOne(()=> Project, (project)=>project.paragraphs, {
        orphanedRowAction: "delete",
        nullable: false,
        cascade: true,
        onDelete: "CASCADE"
    })
    project: Project;
}