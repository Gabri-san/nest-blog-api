import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArticleEntity } from "../articles/article.entity";
import { CommentEntity } from '../comments/comment.entity';

@Entity('author')
export class AuthorEntity {

    @PrimaryGeneratedColumn({name: 'author_id'})
    id: number;

    @Column({name: 'author_nom'})
    nom: string;

    @Column({name: 'author_prenom'})
    prenom: string;

    @Column({name: 'author_email'})
    email: string;

    @OneToMany(type => ArticleEntity, article => article.author)
    articles: ArticleEntity[];

    @OneToMany(type => CommentEntity, comment => comment.article)
    comments: CommentEntity[];

}