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

## Class Decorator：クラス・デコレータ

```ts
class BaseEntity {
  readonly id: number;
  readonly created: string;
  constructor() {
    this.id = Math.random();
    this.created = new Date().toLocaleDateString();
    this.updated = new Date().toLocaleDateString();
  }
}

class Course extends BaseEntity {
  constructor(public name: string) {
    super();
  }
}
class Subject extends BaseEntity {
  constructor(public name: string) {
    super();
  }
}
class Student extends BaseEntity {
  constructor(public name: string) {
    super();
  }
}

const mathCourse = new Course("English");
console.log("id: " + mathCourse.id);
console.log("created: " + mathCourse.created);

const john = new Student("John Doe");
// ...
```

この書き方だと、何度も`extends`~`super()`する必要があるのでプログラムが冗長になってしまう。ここでClass Decoratorの出番。

先程のデータをClass Decoratorを使用した形に変換してみる。

```ts
// Decorator Factoriesを定義
const BaseEntity = (ctr: Function) => {
  ctr.prototype.id = Math.random();
  ctr.prototype.created = new Date().toLocaleString("es-ES");
};

@BaseEntity
class Course {
  constructor(public name: string) {}
}

@BaseEntity
class Subject {
  constructor(public name: string) {}
}

@BaseEntity
class Student {
  constructor(public name: string) {}
}

// 型エラーが出るため、@ts-ignoreしている
const mathCourse = new Course("English");
// @ts-ignore
console.log("id: " + mathCourse.id);
// @ts-ignore
console.log("created: " + mathCourse.created);

const john = new Student("John Doe");
// ...
```

| :memo:        |   <b>インスタンスなどでDecoratorで定義したクラス用プロパティを呼ぼうとすると、TypeScriptにDecoratorによってクラスが拡張されていることが伝わっていないのでエラーが発生する。</b>     |
|---------------|:------------------------|

## Method Decorator：メソッド・デコレータ

メソッドの定義・修正・置換ができる。メソッド定義の直前で宣言する

これのDecorator Factories定義は少し特殊。以下の３つの引数が必要。

* `target`：クラスのコンストラクタのメソッド本体
* `propertyKey`：デコレータを設置するメソッドの名前
* `descriptor`：デコレータを設置するメソッドの[`propertyDescriptor`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

サンプルコードはコチラ

```ts
function checkCalculate(num: number) {
  return (
    _target: Object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const addFunc = descriptor.value;
    descriptor.value = function (...args: number[]) {
      // apply() メソッドを使って、デコレータを設置する元メソッドを呼び出す
      const result = addFunc.apply(this, args);
      // 元メソッドの返却値が10未満のときは、掛け算を実行する
      return result < 10 ? result * num : result;
    };
  };
}
```

早速作成した関数`checkCalculate`を使う

```ts
class Calculate {
  @checkCalculate(10)
  sum(a: number, b: number): number {
    return a + b;
  }
}

// 50 -> 1 + 4 = 5を実行した後に、5 < 10だったため更に5 x 10 = 50を返す
console.log(new Calculate().sum(1, 4));
// 21 -> 20 + 1 = 21を実行した後に、21 > 10だったため、掛け算は実行せずそのまま21を返す
console.log(new Calculate().sum(20, 1));
```

## Property Decorators：プロパティ・デコレータ

プロパティ定義の検査・修正・置換ができる

Decorator Factories定義では以下の２引数を使う。

* `target`：デコレータを設置するプロパティがクラスの静的プロパティの場合、クラスの`constructor`メソッドを表現する。それ以外のプロパティでは、クラスのプロトタイプ
* `memberName`：デコレータを設置するプロパティの名前

```ts
const notAllowlist = ["Jone Doe", "Peter Paker"];

const allowNameOnly = (target: any, memberName: string) => {
  let currentValue: string = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: string) => {
      if (notAllowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue,
  });
};

class Person {
  @allowNameOnly
  name: string = "Jon";
}

const person = new Person();
console.log(person.name); // Jon

person.name = "Jone Doe";
console.log(person.name); // Jon

person.name = "Peter Paker";
console.log(person.name); // Jon

person.name = "Mary Jane";
console.log(person.name); // Mary Jane
```

**まずはDecoratorをひたすら書いて慣れることが大事。**