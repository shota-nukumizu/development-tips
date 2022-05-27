# GraphQLにおける`resolver`

`resolver`はGraphQLの操作をデータに変換するための命令を提供する。スキーマで指定したものと同じ形のデータを、同期的に、あるいはその形に解決される`Promise`として値を返す。

**NestJSにおいては、クラスのアノテーションに使う`decorator`が提供するメタデータを活用してマップを自動作成する。**以下に簡単なGraphQL APIを開発するプロセスを示す。

# オブジェクトの型定義

GraphQLスキーマの定義の大半は、オブジェクトの型定義である。定義する各オブジェクトの型は、クライアント用いる必要のあるオブジェクトを指定する必要がある。

例えば、このような感じでモデルを作成できる。

```gql
type Author {
    id: Int! #nullできない値を指定する場合、!をつける
    firstName: String
    lastName: String
    posts: [Post!]! #配列を扱う場合は[]を使う
}
```

最初にNestJSでGraphQLを適用するアプローチとしては、TypeScriptの`decorator`を利用してTypeScriptのクラスを作成する形でスキーマを定義する。

`authors/models/author.model.ts`

```ts
import { Field, Int, ObjectType } from '@nestjs/graphql' 
import { Post } from './post' 

@ObjectType()
export class Author {
  // @Field()で型関数とオブジェクトを受け取る。
  @Field(type => Int)
  id: number 

  @Field({ nullable: true })
  firstName?: string 

  @Field({ nullable: true })
  lastName?: string 

  @Field(type => [Post])
  posts: Post[] 
}
```

| :exclamation:        |   <b>TypeScriptのメタデータ反映システムにはいくつかの制約がある。クラスを構成しているプロパティを判断したり、与えられたプロパティがオプション必須かどうかを認識したりすることはできない。</b>     |
|---------------|:------------------------|


| :memo:        | NestJSで`resolver`の雛形を作る時、`nest g r <resolver-name>`をターミナル上で叩く。     |
|---------------|:------------------------|


`@Field()`が取る引数は以下の通り。

* `nullable`：該当するフィールドが`null`で大丈夫かどうかを識別する。デフォルトでは`false`
* `description`：該当するフィールドの説明。型は`string`
* `deprecationReason`：非推奨のフィールドとしてマークするための理由

これだけだとイメージがつきにくいので、こんな感じで書く。

```ts
@Field({ description: 'Blog title', deprecationReason: 'Not useful in v2 schema' })
title: string
```

`Author`オブジェクトが作成したら、`Post`型を以下に作成しよう。

`posts/models/post.model.ts`

```ts
import { Field, Int, ObjectType } from '@nestjs/graphql' 

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number 

  @Field()
  title: string 

  @Field(type => Int, { nullable: true })
  votes?: number 
}
```

▼GraphQLの場合

```gql
type Post {
    id: Int!
    title: String!
    votes: Int
}
```

この時点で、データグラフに存在しているオブジェクト(型定義)を定義したが、クライアントはそれらのオブジェクトにアクセスする手段がない。これを作成するには`resolver`クラスを作成する。

`authors/author.resovler.ts`

```ts
import { Query, Resolver, ResolveField } from '@nestjs/graphql'
import { AuthorsService } from 'author/author.service'
import { PostsService } from 'post/post.service'

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id)
  }

  @ResolveField('posts', returns => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author
    return this.postsService.findAll({ authorId: id })
  }
}
```

これでクライアント側がアプリのGraphQLデータに簡単にアクセスできるようになる。