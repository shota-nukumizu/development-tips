# Generics

Generics(ジェネリクス)は、使われるまで型が決まらないようないろいろな肩の値を受け入れられる機能を作る際に用いる。

Genericsの最大の特徴は、メンバ間で意味のある型制約を提供すること。

* クラスのインスタンスメンバ
* クラスメソッド
* 関数の引数
* 関数の戻り値



▼例

```ts
class Box<Type> {
    contents: Type
    constructor(value: Type) {
        this.contents = value
    }
}

const stringBox = new Box('a package')
```

▼例2：単純な`Queue`データ構造を検討する

```ts
class Queue {
    private data = []
    push(item) { this.data.push() }
    pop() { return this.data.shift() }
}

const queue = new Queue()
queue.push(0)
queue.push('1')
```