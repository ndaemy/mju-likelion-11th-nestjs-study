import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export type Post = {
  id: string;
  caption: string;
  // TODO: 이 부분은 추후 user 모델과 연결해야 함
  writer: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

const currentTime = new Date();

const INITIAL_POSTS: Post[] = [
  {
    id: '84ac5723-5170-4dc1-b49a-c40ee8264d36',
    caption: 'Hello World!',
    writer: {
      email: 'yuyaebean@gmail.com',
    },
    createdAt: currentTime,
    updatedAt: currentTime,
  },
  {
    id: 'd0eb7cf3-f258-49f9-8497-efd93daa5f84',
    caption: 'KT 왜 씀',
    writer: {
      email: 'harksulim@gmail.com',
    },
    createdAt: currentTime,
    updatedAt: currentTime,
  },
];

@Injectable()
export class PostsService {
  private posts: Post[] = INITIAL_POSTS;

  create(caption: string) {
    const currentTime = new Date();

    const post = {
      id: uuidv4(),
      caption,
      writer: {
        // TODO: 추후 인증 부분 작성 후 수정해야 함
        email: 'yuyaebean@gmail.com',
      },
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    this.posts.push(post);
  }

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('id is not valid form');
    }

    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  update(id: string, caption: string) {
    const targetPost = this.findOne(id);
    targetPost.caption = caption;
    targetPost.updatedAt = new Date();

    this.posts = this.posts.map((post) => {
      if (post.id === id) {
        return targetPost;
      }
      return post;
    });
  }

  remove(id: string) {
    const targetPost = this.findOne(id);
    this.posts = this.posts.filter((post) => post.id !== targetPost.id);
  }
}
