# TypeScriptにおけるデータ型

よく使われるデータの型は以下の３つ。

* `string`：文字列。`'Hello, World'`がこれに該当する。
* `number`：`20`のような数字。TypeScriptでは整数と小数を区別しない。
* `boolean`：真偽値。`true`あるいは`false`で表現する。

# `Array`

`[1, 2, 3]`のような配列の型を作る際には、`number[]`構文を用いる。この構文はあらゆる型に対して有効である。また、`Array<number>`と書かれているのを見かけることがあるが、これも同じ意味である。

# `any`

TypeScriptには`any`という特殊な型が存在する。これは、特定の値で型チェックのエラーを起こしたくない時に使える。

**値が`any`型であれば、そのプロパティにアクセスしたり（そのプロパティも`any`型になる）、関数のように呼び出したり、任意の型の値へ（あるいは値から）代入したり、構文的に合法なことはほとんど何でも可能である。**

```ts
let list: any = [1, 2 ,3]

const n: Array<number> = list 
```

# ユニオン型

型`value1`と型`value2`のユニオン型は、`value1 | value2`のように表記される。

```ts
// userIdは、ユーザ名とユーザ番号のどちらも可能性がある
type userId = string | number

// nullも許すstring型
type nullableString = string | null

// こんな感じで変数を定義できる
type TrivalLogical = boolean | undefined
```

これだけだと説明が多少分かりづらいので、ツリーのデータ構造を考えてみる。

```ts
// 分岐ノード(Branch)と末端ノード(Leaf)を一律に扱うために、実質的意味がないinterfaceであるTreeNodeを導入している
interface TreeNode {}

// ノードが必ずTreeNodeオブジェクトである必要があるので、末端ノードに生の文字列や数値を扱うことができない
class Branch implements TreeNode {
    left: TreeNode
    right: TreeNode
    constructor(left: TreeNode, right: TreeNode) {
        this.left = left
        this.right = right
    }
}

class Leaf implements TreeNode {
    value: string
    constructor(value: string) {
        this.value = value
    }
}

let helloWorld: TreeNode = new Branch(new Leaf('Hello'), new Leaf('World'))
let greeting: TreeNode = new Branch(new Leaf('greeting'), helloWorld)

console.log(greeting)
```

▼出力結果

```
Branch {
  left: Leaf { value: 'greeting' },
  right: Branch {
    left: Leaf { value: 'Hello' },
    right: Leaf { value: 'World' }
  }
}
```

これらをTypeScriptのユニオン型を使って実装する

```ts
class Branch<T> {
    left: T | Branch<T>
    right: T | Branch<T>
    constructor(left: T | Branch<T>, right: T | Branch<T>) {
        this.left = left
        this.right = right
    }
}

type Tree<X> = void | X | Branch<X>

let helloworld: Tree<string> = new Branch<string>('Hello', 'World')
let greeting: Tree<string> = new Branch<string>('greeting', helloworld)

console.log(greeting)
```

▼出力結果

```
Branch {
  left: 'greeting',
  right: Branch { left: 'Hello', right: 'World' }
}
```

こんな感じでコンパクトにコードを纏めてくれるので非常に便利。