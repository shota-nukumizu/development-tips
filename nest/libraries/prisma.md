# [Prisma](https://docs.nestjs.com/recipes/prisma)

Prismaは高速でデータベースのモデルを開発するためのプログラミング言語です。

主に以下のような特徴があります。

* データベースのモデルを自由自在に構築できる。
* 直感でデータベースを操作しやすい(クエリの自動生成)。
* コマンド一つでデータをマイグレーションできる。
* macOS, LinuxやWindowsに対応(クロスプラットフォームに対応)。


# 環境構築

以下のコマンドを入力してプロジェクトをダウンロード。

```
curl https://pris.ly/quickstart -L -o quickstart-main.tar.gz && tar -zxvf quickstart-main.tar.gz quickstart-main/typescript/starter && move quickstart-main\typescript\starter starter && rmdir /S /Q quickstart-main && del /Q quickstart-main.tar.gz
```

終わったら以下のコマンドで`node_modules`をインストール。

```
cd starter
npm i
```

非同期通信を使って、`include`オプションからデータベースに格納されている`post`を取り出す。実装方法は`script.ts`に書き記す。

`script.ts`

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // add following code
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  // use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null })
  // end.
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

以下のコマンドを入力すれば、prismaのデータを簡単に出力できる。

```
npm run dev
```

# コードの書き方

prismaのインストールは以下のようにする。(ただしフレームワークを使用している場合に限るが...)

```
npm install @prisma/client
```


Prismaを操作するには、prismaファイルから行うのが通例。

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // DATABASE_URLはデータベースを置くファイルの設定。
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

# PrismaをNestJSプロジェクトで活用する方法

Prisma Clientでデータベースクエリを送信できる。詳細は[API Document](https://www.prisma.io/docs/concepts/components/prisma-client/crud)へ。[^1]

NestJSアプリケーションをセットアップする際には、サービス内のデータクエリのためにPrisma Client APIを抽象化する。`src/prisma.service.ts`を新規で追加して以下のコードを作成する。

余談だが、Nestで`service`プロジェクトを出力する方法は以下のコマンドを入力する。

```
npx nest g service prisma
```

```ts
// src/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });    
  }
}
```

| :memo:        |  <b>`onModuleInit`はオプションで、これを省略するとPrismaは最初化のデータベースの呼び出しで接続する。</b>Prismaには独自のシャットダウン機能があり、そこで接続を破棄するため`onModuleDestroy`を気にする必要はない。      |
|---------------|:------------------------|

あとは、自由にデータベースを操作できるように以下のコマンドを書くだけ。

```ts
// src/user.service.ts
// ネットワーク経由でデータを取得するため、
// 非同期通信で実装を書いていく。
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  User,
  Prisma
} from '@prisma/client';

// 例えば、updatePasswordというメソッドを用意して、ユーザのパスワードの更新を担当できる。
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
```

このとき、Prisma Clientの生成された型を使用して、サービスによって公開されるメソッドが適切に型付けされているかどうかに注目する。**モデルを入力して、追加のinterfaceまたはDTO[^2]ファイルを作成するという煩雑な作業を省略できる。**

`Post`モデルの設計は以下のようにする。

```ts
// src/post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Post,
  Prisma,
} from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
```

***

[^1]：Prismaにおけるデータ操作の詳細を知りたければ、[Prisma's Data Guide](https://www.prisma.io/dataguide/types/relational/infrastructure-architecture)へアクセス。

[^2]：DTO(`Data Transfer Object`)とは、オブジェクト指向プログラミングでよく用いられるオブジェクトの設計パターンの１つで、関連するデータを一つにまとめてデータの格納や読み出しのためのメソッドを定義したオブジェクトのこと。引用：[e-words](https://e-words.jp/w/DTO.html)

# 参考サイト

[Prisma](https://www.prisma.io/)