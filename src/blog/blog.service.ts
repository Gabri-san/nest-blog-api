import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorDto } from 'src/dtos/author.dto';
import { ArticleDto } from 'src/dtos/article.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { Repository } from 'typeorm';
import { ArticleEntity } from './articles/article.entity';
import { AuthorEntity } from './authors/author.entity';
import { CommentEntity } from './comments/comment.entity';
import { TagEntity } from './tags/tag.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articlesRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentsRepository: Repository<CommentEntity>,
        @InjectRepository(TagEntity)
        private readonly tagsRepository: Repository<TagEntity>,
        @InjectRepository(AuthorEntity)
        private readonly authorsRepository: Repository<AuthorEntity>
    ) {}

    // ARTICLES

    getArticles() {
        return this.articlesRepository.find({relations: ['comments', 'authors']});
    }

    async getOneArticle(articleId: number) {
        const article = await this.articlesRepository.findOne(articleId);
        if(article) return article;
        else return null;
    }

    async addArticle(authorId: number, articleDto: ArticleDto) {
        const author = await this.authorsRepository.findOne(authorId, {relations: ['comments']});
        if(!author) return null;
        const article = new ArticleEntity();
        article.title = articleDto.title;
        article.subtitle = articleDto.subtitle;
        article.body = articleDto.body;
        article.author = author;
        author.articles.push(article);
        return this.articlesRepository.save(article);
    }

    async updateArticle(articleId: number, articleDto: ArticleDto) {
        const article = await this.articlesRepository.findOne(articleId);
        if(!article) return null;
        await this.articlesRepository.update(articleId, articleDto);
        return await this.articlesRepository.findOne(articleId);
    }

    async removeArticle(articleId: number) {
        const article = await this.articlesRepository.findOne(articleId);
        if(!article) return null
        this.articlesRepository.remove(article);
        return article;
    }

    // AUTHORS

    getAuthors() {
        return this.authorsRepository.find({relations: ['articles', 'comments']})
    }

    async getOneAuthor(authorId: number) {
        const author = await this.authorsRepository.findOne(authorId);
        if(author) return this.articlesRepository;
        else return null;
    }

    async addAuthor(authorDto: AuthorDto) {
        const author = await this.authorsRepository.save(authorDto);
        return author;
    }

    async deleteAuthor(authorId: number) {
        const author = await this.authorsRepository.findOne(authorId);
        if(!author) return null;
        this.authorsRepository.remove(author);
        return author;
    }

    async updateAuthor(authorId: number, authorDto: AuthorDto) {
        const author = await this.authorsRepository.findOne(authorId);
        if(!author) return null;
        await this.authorsRepository.update(authorId, authorDto);
        return await this.authorsRepository.findOne(authorId);
    }

    // TAGS

    async addTag(name: string) {
        let tag = new TagEntity();
        tag.name = name;
        tag = await this.tagsRepository.save(tag);
        if(tag) return tag;
        else return null;
    }

    async deleteTag(tagId: number) {
        const tag = await this.tagsRepository.findOne(tagId);
        if(!tag) return null;
        this.tagsRepository.remove(tag);
        return tag;
    }

    async tagArticle(articleId: number, tagId: number) {
        const article = await this.articlesRepository.findOne(articleId, {relations: ['tags']});
        if(!article) return null;
        const tag = await this.tagsRepository.findOne(tagId);
        if(!tag) return null;
        article.tags.push(tag);
        await this.articlesRepository.save(article);
        return this.articlesRepository.findOne(articleId, {relations: ['tags', 'comments']});
    }

    async untagArticle(articleId: number, tagId: number) {
        const article = await this.articlesRepository.findOne(articleId, {relations: ['comments']});
        const tag = await this.tagsRepository.findOne(tagId);
        for(var i=0; i<article.tags.length; i++) {
            if(article.tags[i] === tag) { 
                article.tags.splice(i, 1); 
            }
        }
        return article;
    }

    // COMMENTS

    async addComment(authorId: number, articleId: number, commentDto: CommentDto) {
        const article = await this.articlesRepository.findOne(articleId, {relations: ['comments']});
        const author = await this.authorsRepository.findOne(authorId, {relations: ['comments']});
        if(!article) return null;
        if(!author) return null;
        const comment = new CommentEntity();
        comment.message = commentDto.message;
        comment.article = article;
        comment.author = author;
        author.comments.push(comment);
        return this.commentsRepository.save(comment);
    }

    async deleteComment(commentId: number) {
        const comment = await this.commentsRepository.findOne(commentId);
        if(!comment) return null;
        this.commentsRepository.remove(comment);
        return comment;
    }

    async editComment(commentId: number, commentDto: CommentDto) {
        const comment = await this.commentsRepository.findOne(commentId);
        if(!comment) return null;
        await this.commentsRepository.update(commentId, commentDto);
        return comment;
    }

    async upvoteComment(commentId: number) {
        const comment = await this.commentsRepository.findOne(commentId);
        if(!comment) return null;
        comment.votes += 1;
        return comment;
    }

}
