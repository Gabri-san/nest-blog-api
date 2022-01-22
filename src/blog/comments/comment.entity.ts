import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinTable } from "typeorm";
import { ArticleEntity } from "../articles/article.entity";
import { AuthorEntity } from "../authors/author.entity";

@Entity('comment')
export class CommentEntity {

    @PrimaryGeneratedColumn({name: 'comment_id'})
    id: number;

    @Column({type: 'text'})
    message: string

    @CreateDateColumn({name: 'comment_date', type: 'datetime'})
    date: Date;

    @Column({name: 'article_likes', type: 'int', default: 1})
    votes: number;

    @ManyToOne(type => ArticleEntity, article => article.comments, {onDelete: 'CASCADE'})
    article: ArticleEntity;

    @ManyToOne(type => AuthorEntity, author => author.comments, {onDelete: 'CASCADE'})
    author: AuthorEntity;
}