# socialmedia for NestJS

NestJSでSNSアプリのAPIを開発する際に、モデルとビュー(`View`)を予め整理しておく。

## model

`schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @default(autoincrement()) @id
  name  String?
  email String  @unique
  posts Post[]
}
// Define the `Post` table in the database
model Post {
  id        Int      @default(autoincrement()) @id
  published Boolean? @default(false)
  title     String
  content   String?
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int? 
}
```

## `PrismaService`

`Prisma`でモデルを作成後、以下のプログラムを書く

```ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## `AppController`

NestJSプロジェクトからデータベースを操作する際には、このファイルから処理を書いていく。

```ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { User as UserModel, Post as PostModel, Prisma } from '@prisma/client'


@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id: Number(id) } })
  }

  @Get('feed')
  async getFilteredPosts(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<PostModel[]> {
    const or = searchString ? {
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } },
      ],
    } : {}
    return this.prismaService.post.findMany({
      where: {
        published: true,
        ...or
      },
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy
      }
    })
  }


  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany()
  }


  @Get('user/:id/drafts')
  async getDraftsByUser(@Param('id') id: string): Promise<PostModel[]> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) }
    }).posts({
      where: {
        published: false
      }
    })
  }


  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData
    return this.prismaService.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }


  @Post('signup')
  async signupUser(
    @Body() userData: { name?: string; email: string, posts?: Prisma.PostCreateInput[] },
  ): Promise<UserModel> {
    const postData = userData.posts?.map((post) => {
      return { title: post?.title, content: post?.content }
    })
    return this.prismaService.user.create({
      data: {
        name: userData?.name,
        email: userData.email,
        posts: {
          create: postData
        }
      },
    })
  }


  @Put('publish/:id')
  async togglePublishPost(@Param('id') id: string): Promise<PostModel> {
    const postData = await this.prismaService.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true
      }
    })
    return this.prismaService.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    })
  }


  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.delete({ where: { id: Number(id) } })
  }


  @Put('/post/:id/views')
  async incrementPostViewCount(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1
        }
      }
    })
  }
}
```