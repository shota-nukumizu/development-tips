# Vuex

Vuexとは、Vueアプリのための状態管理パターン✕ライブラリ。

```js
const Counter = {
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
}

createApp(Counter).mount('#app')
```

Vuexは、以下の３つに分類できる。

* `state`：アプリを動かすための情報源
* `view`：単なる宣言的なマッピング
* `action`：`view`からのユーザ入力に反応して、状態の変更を可能にする

# TypeScriptのサンプル

Vuexは型付けを提供しているので、TypeScriptを書いて基本的な`store`定義を書くことができる。

VueをTypeScriptで書いている場合、`store`の型付けを正しく行うために必要な手順がある。

プロジェクトフォルダに宣言ファイルを追加して、Vueの`ComponentCustomProperties`のカスタム型付けを宣言する。

```ts
// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // ストアのステートを宣言する
  interface State {
    count: number
  }

  // `this.$store` の型付けを提供する
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
```

## `useStore`関数の型付け

Composition APIでコンポーネントを記述する際には、`useStore`が型付けされたストアを返すようにする。このとき、以下の手順を踏む。

1. 型付けされた`InjectionKey`を定義
2. `store`をインストールする際に、型付けされた`InjectionKey`を`Vue App`インスタンスに渡す
3. 型付けされた`InjectionKey`を`useStore`メソッドに渡す

```ts
// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// ストアのステートに対して型を定義します
export interface State {
  count: number
}

// インジェクションキーを定義します
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  }
})
```

```ts
// main.ts
import { createApp } from 'vue'
import { store, key } from './store'

const app = createApp({ ... })

// pass the injection key
app.use(store, key)

app.mount('#app')
```

最後に、このキーを`useStore`メソッドに渡すことで型付けされた`store`を取得できる。

```ts
import { useStore } from 'vuex'
import { key } from './store'

export default {
  setup () {
    const store = useStore(key)

    store.state.count // typed as number
  }
}
```

## `useStore`使用方法の簡略化

`useStore`関数を使うたびに`InjectionKey`をインポートして、`useStore`へ渡さなければならないのは多少面倒かもしれない。その場合は、型付けされた`store`を取得する独自の関数を作成するといいかもしれない。

```ts
// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  }
})

// 独自の `useStore` 関数を定義します
export function useStore () {
  return baseUseStore(key)
}
```

この関数を活用することで、`InjectionKey`とその型を使わなくても、型付けされた`store`を取得できる。

```ts
// vue component 内
import { useStore } from './store'

export default {
  setup () {
    const store = useStore()

    store.state.count // number として型付け
  }
}
```

# 参考サイト

[Vuex](https://vuex.vuejs.org/ja/)

[Vuex - GitHub](https://vuex.vuejs.org/ja/)