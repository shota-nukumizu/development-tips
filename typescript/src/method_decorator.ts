// デコレータする関数を最初に定義
function editable(value: boolean) {
    return function(target:any, propName:string, descriptor: PropertyDescriptor = {}) {
        descriptor.writable = value
        Object.defineProperty(target, propName, descriptor)
    }
}

// デコレータする関数を活用するクラスを定義
class Project {
    constructor(name: string) {
        this.projectName = name
    }

    @editable(false)
    calcBudget() {
        console.log(1000)
    }
}

// インスタンスを作成する
const project = new Project('Super Project')
project.calcBudget()