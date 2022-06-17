# TypeScriptでJestのテストコード

# 関数をテストする

* Jestのインストールは`yarn`
* 今回はこんな仕様を持つ関数を作る
* まずは、この仕様をテストコードに起こす
* 次に、テストコードを実施する
* テストがパスするように関数を実装
* テストコードを実行して、仕様通りか確認する

「作って学ぶ」は「とりあえず動かしてみました」を強調したい。経験を作るためにある。そこまで詳しく書かずにざっくり書きたい。

# 下書き

***

# インストール

## `babel`経由で

JestはBabel経由でTypeScriptをサポートします。まずは、Babelを使うために`yarn`で必要な依存関係をインストールしてください。

```
yarn add --dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript @types/jest
```

最後に、`@babel/preset-typescript`を`babel.config.js`内のプリセットのリストに追加してください。

`babel.config.js`

```js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

BabelでTypeScriptを使う場合、いくつかの[注意事項](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)があります。

BabelはTypeScriptを純粋なトランスパイルによりサポートしているため、Jestはテストの実行時にテストコードの型検査を実施しません。型検査を実施したい場合、代わりに`ts-jest`を使用するか、TypeScriptコンパイラの`tsc`テストとは別に使ってください。

## `ts-jest`経由で

`ts-jest`はJest用のソースマップをサポートするTypeScriptプリプロセッサです。こちらを使うことで、TypeScriptで書かれたプロジェクトをJestでテストできます。

```
yarn add --dev ts-jest @types/jest
```

`@types/jest`はテストコードの型付けをより正確に行うためのライブラリです。

# Jestを設定する

以下の`jest.config.js`をプロジェクトのルートに配置する。

```js
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
```

* すべてのTypeScriptファイルをプロジェクトの`src`フォルダに入れることを常におすすめします。また、これに倣って`roots`設定では`src`フォルダを指定します。
* `testMatch`設定は、`ts`/`tsx`/`js`フォーマットで書かれた`test/spec`ファイルを発見するためのglobのパターンマッチャーです。
* `transform`設定は、`ts`/`tsx`ファイルに対して`ts-jest`を使うように`jest`に指示する。

# テストの実行

`npx jest`を実行すると、jestはテストを実行する。

## オプション：npmスクリプトのスクリプトターゲットを追加する

`package.json`に追加する

```json
{
  "test": "jest"
}
```

* これにより、簡単な`npm t`でテストを実行できます。

## 例

`foo.ts`

```ts
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

`foo.test.ts`

```ts
import { sum } from '../foo';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
```

* Jestは、グローバルな`test`関数を提供します
* Jestには、グローバルな`except`の形でアサーションが予め組み込まれています