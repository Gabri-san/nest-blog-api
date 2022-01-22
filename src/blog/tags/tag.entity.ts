import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ArticleEntity } from "../articles/article.entity";

@Entity('tag')
export class TagEntity {

    @PrimaryGeneratedColumn({name: 'tag_id'})
    id: number;

    @Column({name: 'tag_name'})
    name: string

    @ManyToMany(type => ArticleEntity)
    articles: ArticleEntity[]

}