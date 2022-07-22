# TypeScriptにおけるジェネリクス(generics)

ジェネリックは静的型付け言語の基本的な機能であり、開発者は型を別の型、関数、または他の構造体にパラメータとして渡すことができるようになります。

開発者が自分のコンポーネントをジェネリックコンポーネントにすると、そのコンポーネントが使用されるときに渡される型付けを受け入れ、強制する機能を与えることになり、コードの柔軟性が向上し、コンポーネントを再利用可能にし、重複を排除することができます。

TypeScriptは、コードの後半で消費されるまで型が確定しない引数や戻り値を受け取るコンポーネントに型安全性を導入する方法として、ジェネリックを完全にサポートしています。

このページでは、TypeScriptのジェネリックの実例を試し、関数、型、クラス、インターフェースでどのように使用されるかを探ります。また、ジェネリックスを使ってマッピングされた型や条件付き型を作成し、コードの中で必要なすべての状況に適用できる柔軟性を持ったTypeScriptコンポーネントを作成するのに役立てます。

# 始めるのに必要なこと

* 「作って学ぶTypeScript」の環境構築のページを参照して、ローカルでも動作する環境を構築する
* ローカルマシンにTypeScriptの環境を構築したくなければ、公式のTypeScript Playgroundを使うことができる(原則、TypeScriptを最初からフルサポートしているVisual Studio Codeのようなテキストエディタを使うと大丈夫かと)


# サンプルコード

```ts
function returnInput <Type>(arg: Type): Type {
  return arg;
};
const returnInputStr = returnInput<string>('Foo Bar');
const returnInputNum = returnInput<number>(5);

console.log(returnInputStr); // Foo Bar
console.log(returnInputNum); // 5
```

```ts
function identity<T>(arg: T): T {    
    return arg;    
}    
let output1 = identity<string>("myString");    
let output2 = identity<number>( 100 );  
console.log(output1);  
console.log(output2);  
```

# ジェネリクスの簡単な具体例

## クラス

ジェネリクス関数の様に型引数を渡すことで、クラスもジェネリクス化することが可能です。

型引数`T`はメソッドの返り値の型や引数の型として、クラスを通して使用されていることが理解できるでしょう。

```ts
class Class<T> {
  item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }
}

let strObj = new Class<string>("文字列１");
strObj.getItem(); //=> "文字列１"

let numObj = new Class<number>(5);
numObj.getItem(); //=> 5
```

## インターフェイス

```ts
interface KeyValue<T, U> {
    key: T;
    value: U;
}

let obj: KeyValue<string, number> = { key: "文字列", value: 2 } 
```

# 型引数に制約をつける

ここまで紹介したジェネリクスの型引数はどんな型の引数も受け入れてきました。しかし、引数で受け入れる値を特定の型だけに制限したい場合もあります。

例えば、以下の例では`arg`の`name`というプロパティを取得しようとしていますがすべての型が`name`を持つわけではないのでコンパイラが警告を出しています。

```ts
function getName<T>(arg: T): string {
  return arg.name; // Property 'name' does not exist on type 'T'.
}
```

このような場合、下記のように書くことで`T`は`extends`で指定したインターフェイスを満たす形でなければならないことを指定できます。これでコンパイルエラーも起こりません。

また、関数を呼び出す際に制約に違反する引数を渡した場合はエラーを出力してくれます。

```ts
interface argTypes {
  name: string;
}

function getName<T extends argTypes>(arg: T): string {
  return arg.name;
}

getName({ name: "鈴木一郎" });
```

# 参考サイト

* [How To Use Generics in TypeScript - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript)
* [【TypeScript】Generics(ジェネリックス)を理解する - Qiita](https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4)
* [ジェネリクス(generics) - サバイバルTypeScript](https://typescriptbook.jp/reference/generics)