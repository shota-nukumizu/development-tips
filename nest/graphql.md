# NestJSでGraphQL開発

# GraphQLとは？(公式docsより)

GraphQLはAPI開発のためのクエリ言語である。**API内のデータについて理解しやすいロジックで書かれており、必要なデータだけを抽出できるのが最大の特徴。**

APIにGraphQLのクエリを送信すると、必要なものを正確に`GET`できる。GraphQLで書かれたアプリはサーバだけではなく、取得するデータを制御できるので高速で安定している。

GraphQLクエリは単一のリソースのプロパティにアクセスするだけではなく、リソース感の参照もスムーズにできる。一般的なREST APIでは複数のURLから読み込む必要があるが、**GraphQLでは1回のリクエストだけでアプリが必要とするすべてのデータを取得できる。**GraphQLを使用したアプリは、低速のモバイルネットワーク接続でも高速に動作できる。

GraphQL APIはエンドポイントだけではなく、`type`と`field`で構成されている。そのため、１つのエンドポイントからデータのすべての機能にアクセスできる。アプリで方が使用されるので、手動でコードを書くことを避けられる。

# 使い方

GraphQLサービスは型とそのフィールドを定義し、各型の各フィールドに関数を提供することで作成される。

```gql
type Query {
    me: User
}

type User {
    id: ID
    name: String
}
```

Vanilla TSで扱う場合は以下のプログラムを書く。(Node.js)

```ts
var { graphql, buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var rootValue = { hello: () => 'Hello world!' }

var source = '{ hello }'

graphql({ schema, source, rootValue }).then((response) => {
  console.log(response)
})
```

# インストール

```powershell
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

インストール終了後は以下のプログラムをコピペする

```ts
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver
        })
    ]
})

export class AppModule {}
```

# 余談

REST APIでマイクロサービスを開発することを検討している自分にとって、GraphQLは多少わかりにくいところが多数あった。

正直GraphQLで開発を進めるメリットがいまいち自分で説明できないので、とりあえず現時点のNestJS開発ではREST APIをメインに開発を進めていく。