import { AuthorEntity } from "src/blog/authors/author.entity";

export class ArticleDto {
    title: string;
    subtitle: string;
    body: string;
    author: AuthorEntity
}