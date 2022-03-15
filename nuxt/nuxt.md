# Nuxt✕Firebase認証

フロントエンドにNuxt(vue)、バックエンドにFirestoreとAuthenticationを使用しています。認証はある程度できるようになったのですが、問題はブラウザをリフレッシュすると状態がリセットされてしまい、Middlewareが偽の結果を返してしまうことです。

以下はコードの一部です。

Middleware

```js
export default function ({store, redirect, route}) {

    const userIsLoggedIn = !!store.state.currentUser; 

    if(!userIsLoggedIn) {
        return redirect ('/')
    } 
}
```

Plugin

```js
import { auth } from '@/services/firebaseInit.js'

export default (context) => {
    const { store } = context

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            store.commit('setCurrentUser', user)
            resolve()
        })
    })
}
```

現在、これは実行中のアプリで動作していますが、誰かが認証が必要なページをリフレッシュすると動作せず、`/`にリダイレクトされます。

```js
async nuxtServerInit ({ commit }, { req }) {
    let user = await firebase.auth().currentUser

    commit('setCurrentUser', user)
}
```

# 回答

nuxtServerInit メソッドでユーザーを初期化する必要があります。そうしないと、ミドルウェアは空のユーザーでサーバー上で実行され、その結果リダイレクトが発生します。

req オブジェクトからユーザーデータを取得する必要があります。参考となる実装はこちらのレポを参照してください 

https://github.com/davidroyer/nuxt-ssr-firebase-auth.v2