import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, EmailService, PostsService],
})
export class AppModule {}
