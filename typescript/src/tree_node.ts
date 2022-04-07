// TypeScriptでツリーのデータ構造を実装。
// Geneticで<T>とすることで、不特定多数のデータ型を持つ。
class Branch<T> {
    // ユニオン型で実装。「または」の意味を持つ
    left: T | Branch<T>
    right: T | Branch<T>
    // クラスを初期化する。
    constructor(left: T | Branch<T>, right: T | Branch<T>) {
        this.left = left
        this.right = right
    }
}

// 型を予め定義しておく。受け渡すデータ型は不特定多数のため<X>とGenericで定義する。
type Tree<X> = void | X | Branch<X>

/**
ここで２つの変数であるhelloworldとgreetingを用意する。
基本的な書き方はJavaScriptと全く同じ。
*/
let helloworld: Tree<string> = new Branch<string>('Hello', 'World')
let greeting: Tree<string> = new Branch<string>('greeting', helloworld)

console.log(greeting)

/**
output:
Branch {
  left: 'greeting',
  right: Branch { left: 'Hello', right: 'World' }
}
*/