import { Controller, Get, Post, Logger, Param, Body, Put, Delete, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { ArticleDto } from 'src/dtos/article.dto';
import { AuthorDto } from 'src/dtos/author.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService) {}

    // ARTICLES

    @Get()
    getAllArticles() {
        Logger.log('get all articles', 'BlogController');
        return this.blogService.getArticles();
    }

    @Get(':articleId')
    async getOneArticle(@Param('articleId') articleId: number) {
        Logger.log('get one article', 'BlogController');
        const article = await this.blogService.getOneArticle(articleId);
        if(article) return article;
        else throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    async createArticle(@Body() articleDto: ArticleDto, @Param('authorId') authorId: number) {
        Logger.log('create an article', 'BlogController');
        const article = await this.blogService.addArticle(authorId, articleDto);
        if(article) return article;
        else return new HttpException('Creation failed', HttpStatus.NOT_MODIFIED);
    }

    @Put(':articleId')
    async updateArticle(@Param('articleId') articleId: number, @Body() articleDto: ArticleDto) {
        Logger.log('update an article', 'BlogController');
        const article = await this.blogService.updateArticle(articleId, articleDto);
        if(article) return article;
        else return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
    }

    @Delete(':articleId')
    async deleteArticle(@Param('articleId') articleId: number) {
        Logger.log('delete an article', 'BlogController');
        const article = await this.blogService.removeArticle(articleId);
        if(article) return article;
        else return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    // AUTHORS

    @Get()
    getAllAuthors() {
        Logger.log('get all authors', 'BlogController');
        return this.blogService.getAuthors();
    }

    @Get(':authorId')
    async getOneAuthor(@Param('authorId') authorId: number) {
        Logger.log('get one author', 'BlogController');
        const author = await this.blogService.getOneAuthor(authorId);
        if(author) return author;
        else throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    async createAuthor(@Body() authorDto: AuthorDto) {
        Logger.log('create an author', 'BlogController');
        const author = await this.blogService.addAuthor(authorDto);
        if(author) return author;
        else return new HttpException('Creation failed', HttpStatus.NOT_MODIFIED);
    }

    @Put(':articleId')
    async updateAuthor(@Param('authorId') authorId: number, @Body() authorDto: AuthorDto) {
        Logger.log('update an author', 'BlogController');
        const author = await this.blogService.updateAuthor(authorId, authorDto);
        if(author) return author;
        else return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
    }

    @Delete(':articleId')
    async deleteAuthor(@Param('authorId') authorId: number) {
        Logger.log('delete an author', 'BlogController');
        const author = await this.blogService.deleteAuthor(authorId);
        if(author) return author;
        else return new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    // TAGS

    @Post()
    async addTag(@Param('tagName') tagName) {
        const tag = await this.blogService.addTag(tagName);
        if(tag) return tag;
        else throw new HttpException('Not added', HttpStatus.NOT_MODIFIED);
    }

    @Patch(':articleId/tag/:tagId')
    async tagArticle(@Param('articleId') articleId: number, @Param('tagId') tagId: number) {
        const article = await this.blogService.tagArticle(articleId, tagId);
        if(article) return article;
        else throw new HttpException('Tag not added', HttpStatus.NOT_MODIFIED);
    }

    @Patch(':articleId/tag/:tagId')
    async untagArticle(@Param('articleId') articleId: number, @Param('tagId') tagId: number) {
        const article = await this.blogService.untagArticle(articleId, tagId);
        if(article) return article;
        else throw new HttpException('Tag not removed', HttpStatus.NOT_MODIFIED);
    }

    @Delete(':articleId')
    async deleteTag(@Param('tagId') tagId: number) {
        Logger.log('delete a tag', 'BlogController');
        const article = await this.blogService.deleteTag(tagId);
        if(article) return article;
        else return new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    // COMMENTS

    @Post()
    async addComment(@Param('articleId') articleId: number, @Param('authorId') authorId: number, @Body() commentDto: CommentDto) {
        const comment = await this.blogService.addComment(authorId, articleId, commentDto);
        if(comment) return comment;
        else throw new HttpException('Comment not found', HttpStatus.NOT_MODIFIED);
    }

    @Delete('comment/:articleId')
    async deleteComment(@Param('commentId') commentId: number) {
        Logger.log('delete a comment', 'BlogController');
        const comment = await this.blogService.deleteTag(commentId);
        if(comment) return comment;
        else return new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    @Put('comment/:articleId')
    async updateComment(@Param('commentId') commentId: number, @Body() commentDto: CommentDto) {
        Logger.log('update a comment', 'BlogController');
        const comment = await this.blogService.editComment(commentId, commentDto);
        if(comment) return comment;
        else return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
    }

    @Patch('comment/:articleId')
    async upvoteComment(@Param('commentId') commentId: number) {
        Logger.log('upvote a comment');
        const comment = await this.blogService.upvoteComment(commentId);
        if(comment) return comment;
        else return new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

}
