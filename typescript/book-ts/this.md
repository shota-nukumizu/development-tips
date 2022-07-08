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

## メソッドチェーン

複数の`function`を数珠つなぎで呼び出すメソッドチェーンは`.`の前が関数になる。この場合は、その関数が返すオブジェクトを参照することになる。関数で`return`を省略したり、`return`単独で呼ぶと`undefined`が返ってくるのでメソッドチェーンは利用できない。

```js
var obj = {
  test: function() { return this },
  alert: function(msg) { console.log(msg) }
}
var test = obj.test
obj.test().alert("hello") // => hello とコンソールに表示
test().alert("hello") // => アラート表示
```

関数`alert`の呼び出しに`.`があり、その前に関数`test`がある。関数`test`の返り値は`this`なので、その`test`の呼び出し方によって参照されるオブジェクトによって関数`alert`の結果が変わる。

## `call`と`apply`

これら２つを使って関数を呼び出すと`.`に前につけるオブジェクトを指定できる。

```js
function test() {
    console.log(this)
}
var obj = { name: "obj" }
test() // => Window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
test.call(obj) // => {name: "obj"}
```

## コンストラクタ

`function`に対して、`new`構文を利用してオブジェクトを作成できる。大雑把に言ってしまえば`call`の変形構文だ。

```js
var obj = new function() {
    this.name = "obj"
    console.log(this) // => {name: "obj"}
}
```

この場合`function`が呼ばれるが、`this`はグローバルオブジェクトでも`undefined`でもない。`new`を使えば、新規にオブジェクトを作成してそれに対し`call`を使って`function`を呼び出して関数内部で`return this`するような動作になる。

ざっくり、以下のコードと挙動はだいたい同じ。

```js
var obj = function() {
    this.name = "obj"
    console.log(this) // => {name: "obj"}
    return this
}.call({})
```