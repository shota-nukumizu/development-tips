# Nextjs(TypeScript)とFirebaseを連携するチュートリアル

# はじめに

Nextjsは簡単にWebアプリを開発できるReactのWebフレームワークである。デフォルトで様々な機能を揃えており、アプリを迅速に拡張できる。

# 前提知識

以下の記事を読み進めるには、以下の内容に関する前提知識が必須である。

* Node.js
* HTML/CSSやJavaScriptの基本知識
* React、NextjsやTypeScriptの基本知識

# TypeScriptのセットアップ

まずは以下のコマンドでTypeScriptに対応したNextjsのプロダクトをインストールする。

```powershell
create-next-app@latest --ts nextjs-firebase-app
```

以上のコマンドを入力するだけでプロダクトが自動で生成される。

# Firebaseのプロジェクトを新規作成

まずはFirebase consoleにアクセスしてプロジェクトを追加。適当にプロダクトの名前を入力する。

`Configure Google Analytics`をクリック。

その後プロジェクトを作成し、`Continue`をクリック。

# Firebaseアプリを追加

次はFirebaseアプリを新規作成する。新規作成する場合は、Webアイコン`</>`をクリック。適当に名前を入力した後は、アプリを登録してコンソールにアクセス。

# Firestoreのセットアップ

1. 左側のメニューに`Firestore Database`のボタンをクリック
2. `test mode`をクリック
3. 利用可能なオプションのリストからCloud Firestoreの場所を選択し、`[Enable]`をクリックして選択した場所を設定する
4. 結果ページでは、まず最初にCollectionを作成する
5. Start Collectionをクリックし、Collection idをtodosとして追加し、Next stepに進む
6. Auto-IDをクリックしてドキュメントIDフィールドを自動で入力し、タイトルフィールドを文字列で追加する
7. フィールドの追加をクリックし、説明フィールドを文字列として追加
8. 新しいフィールド`done`を追加し、真偽値でそれに`false`の値を与える。

# Nextjsアプリのセットアップ(Firebase)

まずは以下のコマンドを入力。

```powershell
npm install firebase #firebaseのインストール
npm run dev #アプリの実行
```

`http://localhost:3000`にアクセスすれば最初のページが表示される。

# Firebaseの初期化

NextjsでFirebaseデータベースを初期化する。これを簡潔に言えば、Firebaseデータベースインスタンスを接続して、Nextjsアプリケーションの作業やスケーリングを行えるようにすることだ。

これは、Firebaseアプリケーションに固有のFirebaseクレデンシャルを収集する必要がある。

初期化には以下のような手順で行う。

```
NEXT_PUBLIC_FIREBASE_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID = "your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your_measurement_id"
```

この後、`firebase`ディレクトリをルートフォルダの中に新規作成する。その中に、`clientApp.ts`ファイルを作成する。

`firebase/app`から`initializeApp`をインポート。

```ts
import {initializeApp} from "firebase/app";
```

`initializeApp`関数を呼び出し、`env.local`ファイルに記載されている認証情報を渡す。

```ts
initializeApp( {
   apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});
```

`firebase/firestore`から`getFirestore`をインポート。

```ts
import {getFirestore} from "firebase/firestore";
```

`Firestore`インスタンスを作成する。

```ts
const firestore = getFirestore();
```

`firestore`をエクスポートして、このプロジェクトの後半で作成するファイルからアクセスできるようにする。

```ts
export {firestore};
```

# Firestoreからドキュメントを照会する

`pages/index.tsx`

```ts
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
    <div className={styles.container}>
    <Head>
        <title>Todos app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
        <h1 className={styles.title}>
        Todos app
        </h1>
    </main>
    <footer className={styles.footer}>
        <a
        href="#"
        rel="noopener noreferrer"
        >
        Todos app
        </a>
    </footer>
    </div>
    )
}
export default Home
```

上記は、このTodoアプリの作業を開始する場所のページ(骨組み)にすぎない。

`pages/index.tsx`を変更したので、新しく追加されたコードでは既存のリンクされたCSSコードは動作しない。

`styles/Home.module.css`を以下のように編集

```css
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main {
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.title a {
  color: #0070f3;
  text-decoration: none;
}
.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}
.title {
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
}
.title,
.description {
  text-align: center;
}
.description {
  line-height: 1.5;
  font-size: 1.5rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 1rem;
}
.card {
  margin: 1rem auto;
  padding: 0.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 60%;
}
.card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}
.card p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}
.cardActions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}
.form {
  width: 50%;
  margin: 1rem auto;
  padding: 10px;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}
.formGroup {
  width: 100%;
  margin: 1rem 0px;
}
.formGroup label {
  display: block;
  margin-bottom: 0.5rem;
}
.formGroup input[type="text"] {
  width: 100%;
  padding: 10px;
}
.formGroup textarea {
  width: 100%;
  padding: 10px;
}
.error {
  color: red;
  text-align: center;
}
.success {
  color: green;
  text-align: center;
}
.success a {
  color: blue;
  text-decoration: underline;
}
@media (max-width: 600px) {
  .grid {
   width: 100%;
   flex-direction: column;
  }
}
```

`pages/index.tsx`で、`clientApp.ts`ファイルから`firestore`をインポートし、todos Collectionにポインタを作成する。

次に以下のように、`useState`を使用してTodoの状態をホストする。

```ts
import { firestore } from '../firebase/clientApp';

import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";

const todosCollection = collection(firestore,'todos');

import { useState } from 'react';
const [todos,setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading,setLoading] = useState<boolean>(true);
```

Todoオブジェクトは`QueryDocumentSnapshot<DocumentData>`型を持つことになる。読み込みが完了していない場合にTodoにアクセスするのを避けるため、読み込みを`true`に初期化する。

次に、これらのtodoを取得する関数を作成し、`getTodos`メソッドを作成する`useEffect`フックを構築する。

```ts
const getTodos = async () => {
   // construct a query to get up to 10 undone todos 
   const todosQuery = query(todosCollection,where('done','==',false),limit(10));
   // get the todos
   const querySnapshot = await getDocs(todosQuery);
   
   // map through todos adding them to an array
   const result: QueryDocumentSnapshot<DocumentData>[] = [];
   querySnapshot.forEach((snapshot) => {
   result.push(snapshot);
   });
   // set it to state
   setTodos(result);
};

useEffect( () => {
   // get the todos
   getTodos();
   // reset loading
   setTimeout( () => {
     setLoading(false);
   },2000)
},[]);
```

上記では、`todos`オブジェクトを取得して2秒ごとにリセットしている。これらのTODOをブラウザに表示する必要があるので、取得したTODOSを表示するNext.jsViewを作成しよう。

`index.tsx`のタイトルの下に、次のコードを追加する。

```tsx
<div className={styles.grid}>
{
  loading ? (
   <div className={styles.card}>
    <h2>Loading</h2>
   </div>
  ): 
  todos.length === 0 ? (
   <div className={styles.card}>
    <h2>No undone todos</h2>
    <p>Consider adding a todo from <a href="/add-todo">here</a></p>
   </div>
  ) : (
   todos.map((todo) => {
    return (
     <div className={styles.card}>
      <h2>{todo.data.arguments['title']}</h2>
      <p>{todo.data.arguments['description']}</p>
      <div className={styles.cardActions}>
      <button type="button">Mark as done</button>
      <button type="button">Delete</button>
      </div>
     </div>
    )
   })
  )
}
</div> 
```

上記では、TODOがあるかどうかをチェックするためのローディングテキストを表示している。もし何もなければメッセージを表示し、そうでなければ既存のTODOをマッピングする。

この場合、Firestoreデータベースのセットアップ時にTodoを追加しているのでホームページからアクセスできるようになる。

# Firestoreにドキュメントを追加する

Firestoreにドキュメントを追加するには、新しいTodoのタイトルと説明を入力するためのフォームを作成しなければならない。

`pages`フォルダに`add-todo.tsx`を作成して以下のコードを追加する。

```tsx
import type { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const AddTodo:NextPage = () => {

   const [title,setTitle] = useState<string>(""); // title
   const [description,setDescription] = useState<string>("");// description
   const [error,setError] = useState<string>("");// error
   const [message,setMessage] = useState<string>("");// message

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault(); // avoid default behaviour
     
     if(!title || !description){ // check for any null value
       return setError("All fields are required");
     }
   }

   return (
     <div className={styles.container}>
       <Head>
         <title>Add todo</title>
         <meta name="description" content="Next.js firebase todos app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
       <div className={styles.main}>
         <h1 className={styles.title}>
           Add todo
         </h1>
         <form onSubmit={handleSubmit} className={styles.form}>
           {
             error ? (
               <div className={styles.formGroup}>
                 <p className={styles.error}>{error}</p>
               </div>
             ) : null
           }
           {
             message ? (
               <div className={styles.formGroup}>
                 <p className={styles.success}>
                   {message}. Proceed to <a href="/">Home</a>
                 </p>
               </div>
             ) : null
           }
           <div className={styles.formGroup}>
             <label>Title</label>
             <input type="text" 
             placeholder="Todo title" 
             onChange={e => setTitle(e.target.value)} />
           </div>
           <div className={styles.formGroup}>
             <label>Description</label>
             <textarea 
             placeholder="Todo description"  
             onChange={e => setDescription(e.target.value)}
             />
           </div>
           <div className={styles.formGroup}>
             <button type="submit">Submit</button>
           </div>
         </form>
       </div>
     </div>
   )
}

export default AddTodo;
```

タイトルと説明のフィールドを持つ基本的なフォームを設定している。また、フォームが送信されたときに呼び出される`handleSubmit`関数を用意している。

今のところ、`null`をチェックするだけである。`Collection`にデータを送信するプログラムを書いてみよう。

まず最初に、必要なモジュールをインポートする。

```tsx
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { firestore } from '../firebase/clientApp'; // firestore instance
```

`todos`Collectionに新しいドキュメントを作成するために、`addTodo`関数を作成する。

```tsx
const addTodo = async () => {
   // get the current timestamp
   const timestamp: string = Date.now().toString();
   // create a pointer to our Document
   const _todo = doc(firestore, `todos/${timestamp}`);
   // structure the todo data
   const todoData = {
     title,
     description,
     done: false
   };
   try {
     //add the Document
     await setDoc(_todo, todoData);
     //show a success message
     setMessage("Todo added successfully");
     //reset fields
     setTitle("");
     setDescription("");
   } catch (error) {
     //show an error message
     setError("An error occurred while adding todo");
   }
};
```

# Firestoreのドキュメントを更新する

```tsx
import {updateDoc} from "@firebase/firestore";

const updateTodo = async (documentId: string) => {   
   // create a pointer to the Document id
   const _todo = doc(firestore,`todos/${documentId}`);
   // update the doc by setting done to true
   await updateDoc(_todo,{
   "done":true
   });
   // retrieve todos
   getTodos();
}
```

```tsx
<button type="button" onClick={() => updateTodo(todo.data().id)}>Mark as done</button>
```

取得したTodoに対して、`Mark as done`ボタンをクリックする。そのTodoオブジェクトは完了として更新されるので、消滅する。

未完了のToDOアイテムは、`getTodos()`メソッドで設定したクエリに基づいて取得される。

次のステップでは、Todoを削除する作業を行う。

# Firestoreのドキュメントを削除する

ドキュメントを削除するには、`pages/index.tsx`に移動して、`deleteDoc()`関数をインポートし、以下のように削除機能を処理するメソッドを作成する。

```tsx
import {deleteDoc} from "@firebase/firestore";

const deleteTodo = async (documentId:string) => {
   // create a pointer to the Document id
   const _todo = doc(firestore,`todos/${documentId}`);
   // delete the doc
   await deleteDoc(_todo);
   // retrieve todos
   getTodos();
}
```

```tsx
<button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
```

取得したTodoアイテムの削除ボタンをクリックすると、そのオブジェクトはコレクションから削除される。