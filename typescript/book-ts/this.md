# JavaScriptにおける`this`

**関数の`this`キーワードは他の言語とは少し異なる動作をする。**

殆どの場合、`this`の値は関数がどのような値をするかで決定する。実行中に代入で設定できず、関数が呼び出されるたびに違う形になる可能性がある。

```js
const test = {
  prop: 42,
  func: function() {
    return this.prop;
  },
};

console.log(test.func());
// 出力結果：42
```

JavaScriptにおける`this`とは、実行コンテキストのプロパティで非厳密モードでは常にオブジェクトへの参照、厳密モードでは任意の値を読み取れる。

## `this`の特徴―グローバルな実行コンテキスト

グローバルな実行コンテキスト（関数の外側）では、ストリクトモードであるかどうかに関わらず、グローバルオブジェクトを示す。

```js
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

## `this`の特徴―関数

関数内部では、その関数がどのように呼び出されるのかに応じてこの値が決まる。

```js
function f1() {
  return this;
}

// In a browser:
f1() === window; // true

// In Node:
f1() === globalThis; // true
```

# TypeScriptにおける`this`

`this`は現在のオブジェクトを参照するもので、文脈によっては参照するオブジェクトが異なる。

TypeScriptの`this`の使い方は、それが使われる文脈に依存する。

次の例では、トラッククラスが`this`を使用している。このキーワードはコンストラクタと`getEmployeeName`関数で異なるオブジェクトを参照している。コンストラクタでは`Employee`クラスを参照しているが、`getEmployeeName`では TypeScriptの特殊型である`any`型を参照している。

```ts
class Employee{
	name:string;
	constructor(name:string) {
		this.name = name;
		alert(this.name);
		alert(this.getEmployeeName().name);
		}

getEmployeeName=function() {
	return this; //this is of any type
}
```

# `this`と`function`の関係

一言でまとめると、**`this`は`function`を呼んだときの`.`の前についているオブジェクトを示す。**

1. 関数呼び出しの`.`の前のオブジェクトが`this`になる
2. `.`を省略するとグローバルオブジェクトを参照する
3. `call`や`apply`を使うと`.`の前のオブジェクトを参照できる
4. `bind`を使うと`.`の前のオブジェクトを参照できる

これだと意味がわからないので、もう少し具体例を用意する

```js
function test() {
    console.log(this)
}
```

上記は`this`の内容をコンソールに表示するだけのなんてことない関数だ。これをブラウザ上で呼び出すと

```js
test()
```

このようになる。

呼び出す前に`.`がないので、`this`はグローバルオブジェクト、ブラウザでは`Window`オブジェクトになる。この関数`test`を特定のオブジェクトに関連付ける。

```js
function test() {
    console.log(this)
}
var obj = {}
obj.test = test
```

その上で、`obj.test()`を呼び出すと、`this`は`obj`になる。