import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { CommentEntity } from '../comments/comment.entity';
import { TagEntity } from '../tags/tag.entity';

@Entity('article')
export class ArticleEntity {

    @PrimaryGeneratedColumn({name: 'article_id'})
    id: number;

    @Column({name: 'article_title'})
    title: string;

    @Column({name: 'article_subtitle'})
    subtitle: string;

    @Column({name: 'article_body', type: 'text'})
    body: string;

    @ManyToOne(type => AuthorEntity, author => author.articles, {onDelete: 'CASCADE'})
    author: AuthorEntity;

    @CreateDateColumn({name: 'article_date', type: 'datetime'})
    date: Date;

    @OneToMany(type => CommentEntity, comment => comment.article)
    comments: CommentEntity[];

    @ManyToMany(typr => TagEntity)
    @JoinTable({name: "articles_tags"})
    tags: TagEntity[];

}