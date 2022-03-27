interface TreeNode {}

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