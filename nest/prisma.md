# Prisma

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

# 参考サイト

[Prisma](https://www.prisma.io/)