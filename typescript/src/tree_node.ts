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