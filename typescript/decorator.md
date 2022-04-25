# TypeScriptにおけるDecorator

| :exclamation:   <b>TypeScriptのDecorator機能は実験段階である。</b>今後大きな仕様変更が生じる可能性があるので取り扱い注意。  |
|-----------------------------------------|

# Decoratorとは

デコレータ(Decorator)とはクラスの宣言などに結び付けられる特殊な宣言の１つ。`@samplefunc`の形式で宣言する。**既存のクラスやメソッドにデコレーション(=追加機能を入れる)イメージ。引数をセットできる**

```ts
@hoge
class Fuga {
  fuga: string;

  constructor(f: string) {
    this.fuga = t;
  }
}
```

## Decorator Factories：デコレータ・ファクトリー

設置したDecoratorによって呼び出される式を返すシンプルな関数。Decoratorによって適用される方法をカスタマイズした方法。

```ts
// Decorator Factoryの宣言
function factoryMethod(value: string) {
  // Decoratorによって呼び出される関数
  return function (target) {
    // `target`と`value`使って処理の内容を定義
  };
}
```

# 注意：Decorator機能の始め方

ローカル環境でDecorator機能を始める際は、少し設定がいる。

初期化して始める際は、以下のコマンドを叩く。

```
$ tsc --target ES5 --experimentalDecorators
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

しかし、ブラウザでTypeScriptを動かせる[Playground](https://www.typescriptlang.org/play)ではデフォルトで設定されているのでそのまま動かすことができる。

