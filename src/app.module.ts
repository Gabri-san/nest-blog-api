import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        database: 'blog-db',
        username: "root",
        password: "",
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
