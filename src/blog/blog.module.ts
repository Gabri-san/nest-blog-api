import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './articles/article.entity';
import { AuthorEntity } from './authors/author.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CommentEntity } from './comments/comment.entity';
import { TagEntity } from './tags/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, AuthorEntity, CommentEntity, TagEntity])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
