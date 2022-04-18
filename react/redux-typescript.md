# TypeScriptでReduxを動かす

Reduxとは、JavaScriptアプリのための予測可能なコンテナ。異なる環境で同じように動作し、テストが簡単なアプリケーションを開発できる。

# インストール

```powershell
# Redux install
npm install @reduxjs/toolkit
# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

Reduxでは、TypeScriptでの開発が強く推奨されている。しかし、TypeScriptをWeb開発で使うにはデメリットがある。

* TypeScriptの文法を理解する必要がある
* 複雑に開発を進めておく必要がある

しかし、**自分のアプリでTypeScriptを使用するメリットがあるかどうか**は検討する余地がある。

# `RootState`と`Dispatch`の定義

これは`configureStore`を使用することで、追加の型付けはいらない。これらは過多なので、`app/store.ts`などのストア設定ファイルから直接エクスポートして他のファイルに直接インポートするのが鉄則。

```ts
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

# `createSlice`の定義

それぞれのファイルは、`createSlice`が各`reducer`(アプリの処理を行う部分)の種類を正しく推測できるように、その初期状態の値の種類を定義しておく必要がある。

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
```

# 参考サイト

* [React and Redux in TypeScript](https://github.com/piotrwitek/react-redux-typescript-guide)：TypeScriptを用いたReact操作を詳細に開設したGitHubリポジトリ