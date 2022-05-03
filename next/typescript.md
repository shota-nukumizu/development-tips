# Nextjs✕TypeScriptで簡単なアプリ開発

NextjsはReactを使って静的及び動的なサーバサイドアプリを開発できる。主に以下のような便利な機能が搭載されている。**Next.jsはフロントエンドフレームワークとしてAPIにアクセスして情報を習得するだけではなく、フロントエンドからアクセス可能なAPIを作成できる。**

* API routes
* File-system routing
* Middleware
* サーバ構築
* HTTP streaming

# NextアプリでTypeScriptを活用する

▼インストールコマンド

```powershell
# install
npx create-next-app next-typescript-example

# via npm
npm install --save-dev typescript @types/react @types/node

# server start
npm run dev
```

▼ディレクトリ

```
src
├── components
|  ├── AddPost.tsx
|  └── Post.tsx
├── pages
|  ├── index.tsx
|  └── _app.tsx
├── styles
|  └── index.css
├── tsconfig.json
├── types
|  └── index.ts
├── next-env.d.ts
└── package.json
```

Next.jsアプリでTypeScriptを有効に活用するには、プロジェクトのルートに`tsconfig.json`を追加する。Next.jsはこのファイルを認識し、そのプロジェクトでTypeScriptを活用できる。

Next.jsはTypeScriptのコードをJavaScriptにコンパイルする処理を行い、ブラウザ上で通常通りアプリを提供する。

# Next.jsでTypeScriptの型を作成する方法

**新規の型定義は主に`interface`を活用する。(TypeScriptの鉄則)**

```ts
// types/index.ts

export interface IPost {
  id: number
  title: string
  body: string
}
```

# Next.jsで`component`を作成する方法

```tsx
// components/AddPost.tsx

import * as React from 'react'
import { IPost } from '../types'

type Props = {
  savePost: (e: React.FormEvent, formData: IPost) => void
}

const AddPost: React.FC<Props> = ({ savePost }) => {
  const [formData, setFormData] = React.useState<IPost>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => savePost(e, formData)}>
      <div>
        <div className='Form--field'>
          <label htmlFor='name'>Title</label>
          <input onChange={handleForm} type='text' id='title' />
        </div>
        <div className='Form--field'>
          <label htmlFor='body'>Description</label>
          <input onChange={handleForm} type='text' id='body' />
        </div>
      </div>
      <button
        className='Form__button'
        disabled={formData === undefined ? true : false}
      >
        Add Post
      </button>
    </form>
  )
}

export default AddPost
```

【主な手順】

1. `IPost`をインポート
2. `Props`という別の型を定義
3. `useState`hookに`IPost`型を設定する。それを使ってフォームデータを作成する
4. フォームが送信されると、関数`savePost`に依存して投稿の配列にデータが保存される。

この順番で新しい投稿を作成して保存できるようになる。

`Post`オブジェクトを表示するためのコンポーネントを作成する。

```tsx
// components/Post.tsx

import * as React from 'react'
import { IPost } from '../types'

type Props = {
  post: IPost
  deletePost: (id: number) => void
}

const Post: React.FC<Props> = ({ post, deletePost }) => {
  return (
    <div className='Card'>
      <div className='Card--body'>
        <h1 className='Card--body-title'>{post.title}</h1>
        <p className='Card--body-text'>{post.body}</p>
      </div>
      <button className='Card__button' onClick={() => deletePost(post.id)}>
        Delete
      </button>
    </div>
  )
}

export default Post
```

この`Post`コンポーネントは、`props`として表示する`post`オブジェクトと`deletePost`関数を受け取る。

これで投稿の追加、表示や削除ができるようになった。コンポーネントを`App.tsx`にインポートして投稿を処理するロジックを作成する。

```tsx
import * as React from 'react'
import { InferGetStaticPropsType } from 'next'
import AddPost from '../components/AddPost'
import Post from '../components/Post'
import { IPost } from '../types'

const API_URL: string = 'https://jsonplaceholder.typicode.com/posts'

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = React.useState(posts)

  const addPost = async (e: React.FormEvent, formData: IPost) => {
    e.preventDefault()
    const post: IPost = {
      id: Math.random(),
      title: formData.title,
      body: formData.body,
    }
    setPostList([post, ...postList])
  }

  const deletePost = async (id: number) => {
    const posts: IPost[] = postList.filter((post: IPost) => post.id !== id)
    console.log(posts)
    setPostList(posts)
  }

  if (!postList) return <h1>Loading...</h1>

  return (
    <main className='container'>
      <h1>My posts</h1>
      <AddPost savePost={addPost} />
      {postList.map((post: IPost) => (
        <Post key={post.id} deletePost={deletePost} post={post} />
      ))}
    </main>
  )
}

export async function getStaticProps() {
  const res = await fetch(API_URL)
  const posts: IPost[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}
```

【手順】

1. この`component`では、最初に作成した型とコンポーネントをインポートする
2. `useState`hookを使用して、投稿の配列で状態を初期化させる
3. `addPost`関数を宣言して、`posts`の配列にデータを保存する
4. `deletePost`メソッドは引数として投稿の`id`を受け取り、配列をフィルタリングして投稿を削除できるようにする
5. 各`component`に期待される`prop`を渡す。そしてレスポンスデータをループして`Todo`コンポーネントを使用して表示する。データはNext.jsが提供する`getStaticProps`メソッドによってJSONPlaceholder APIから取得される

このような感じで投稿のTypeを`IPost`で定義された構造を持つオブジェクトの配列に変換することでAPIのレスポンスから利用できるフィールドを正確に把握できる。

# 注

`middleware`：ソフトウェアの種類の１つで、OSとアプリの中間に位置し、様々なソフトウェアから共通して利用される機能を提供できるもの。

# 参考サイト

[API ROUTES FOR NEXT.JS](http://www.topcoder.com/thrive/articles/api-routes-for-next-js?utm_source=thrive&utm_campaign=thrive-feed&utm_medium=rss-feed)

[Using Next.js with TypeScript - LogRocket](https://blog.logrocket.com/using-next-js-with-typescript/)

[Typescript - Nextjs](https://nextjs.org/learn/excel/typescript)