# Nuxt✕TypeScript開発のポイント

原則、[`vue-property-decorator`](https://github.com/kaorun343/vue-property-decorator)あるいは[`vue-class-component`](https://github.com/vuejs/vue-class-component)で開発を進めておく。


## 重要ポイント

### その１

`props`で処理を完結させる

子コンポーネント

```vue
<template>
  <p @click="onClick">{{ text }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  name: "LinkText",
})
export default class LinkText extends Vue {
  @Prop() private readonly text!: string;
  @Prop() private onClick(): () => void;
}
</script>
```

親コンポーネント

```vue
<template>
  <link-text text="url" :on-click="clickUrl" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import LinkText from "@/components/atoms/button/LinkText/index.vue";

@Component({
  name: "ParentComponent",
  components: {
    LinkText,
  },
})
export default class ParentComponent extends Vue {
  private clickUrl(): void {
    // なんかクリックされたときの処理
  }
}
</script>
```


### その２

デザインの原理原則を統一すべし

`page`：`data`や`method`が全部この`page`に集約されている

`template`：主にUIのワイヤーフレームをここで定義する

`organisms`：`form`や`card`や`navigation`などワイヤーフレームワークを構成している要素

`molecules`：`atom`を組み合わせて作る。`atom`にないものは`atom`として作る

`atom`：コンポーネントの最小単位


### その３

**ESLintの導入**

```ts
module.exports = {
  rules: {
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
```

### その４

**`defineProps`を積極的に活用する**

```vue
<script lang="ts" setup>
import { PropType } from "@vue/composition-api";
import Author from "../types/author";
type Props = {
  id: number;
  title: string;
  date?: string;
  excerpt: string;
  author: Author;
  slug: string;
};
const { id, title, date, excerpt, author, slug } = defineProps<Props>();
/** propsを使った処理 **/
</script>
```

これで簡単にアプリケーション内で扱うデータを管理できる。**TypeScriptの型定義はデータをDjangoのModelのように扱えるため、非常に有能な機能。**

## Web開発にNuxtをおすすめする理由


### アプリ開発に必要な機能がデフォルトで揃っている

Nuxtの最大の特徴は、アプリ開発に必要な機能がデフォルトで揃っていること。**追加設定無しでフロントエンド開発に没頭できる。**


### TypeScript対応

Nuxtは現代のフロントエンド開発の当たり前になっているTypeScriptが最初からフルサポートされるようになった。**デフォルトでTypeScriptがサポートされるようになったので、特に意識しなくても自然に導入できる。**

これからの開発では、NuxtでJSを活用するのが難しくなる。

### 起動が速い

**Nuxt 3(最新のNuxt)では`npm run dev`から5秒程度で起動する。**

## API通信のデザインパターン

### Repository

RESTful APIのCRUDに合わせて以下のメソッドを用意する。

* `index`：データの一覧表示
* `show`：データの詳細表示
* `create`：データの新規作成
* `update`：データの更新
* `delete`：データの削除

`api/repository.ts`

```ts
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse } from 'axios'

// 予め実装するメソッドをinterfaceで定義しておく。
export interface CRUDActions {
  index<T>(query?: string): Promise<AxiosResponse<T>>
  show<T>(id: number): Promise<AxiosResponse<T>>
  create<T>(payload: any): Promise<AxiosResponse<T>>
  update<T>(payload: any, id?: number): Promise<AxiosResponse<T>>
  delete(id?: number): Promise<AxiosResponse<any>>
}

// 実装
export default (client: NuxtAxiosInstance) => (resource: string) => ({
  index<T>(query?: string) {
    return client.get<T>(`api/${resource}?${query}`)
  },
  show<T>(id: number) {
    return client.get<T>(`api/${resource}/${id}`)
  },
  create<T>(payload: any) {
    return client.post<T>(`api/${resource}`, payload)
  },
  update<T>(payload: any, id?: number) {
    return client.patch<T>(resourcePath(resource, id), payload)
  },
  delete(id?: number) {
    return client.delete(resourcePath(resource, id))
  }
})

const resourcePath = (resource: string, id?: number) => {
  let path
  if (id) {
    path = `api/${resource}/${id}`
  } else {
    path = `api/${resource}`
  }
  return path
}
```


# 参考サイト

[Nuxt(vue) + TypeScriptをはじめるときに知っておきたかった10のこと](https://zenn.dev/nus3/articles/ec0db8857209a509646b)

[Nuxt 3 を今すぐオススメしたい 15 のポイント](https://zenn.dev/ytr0903/articles/d0a91f6180d34e)

[Nuxt.js x Typescript で API 通信のデザインパターンを使ってみた](https://zenn.dev/hassan/articles/b7f76a56f59375)

(両方ともZennからのネット記事)