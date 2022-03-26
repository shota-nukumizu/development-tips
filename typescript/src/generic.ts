class GenericMath<T extends number | string> {
    constructor(public baseValue: T, public multiplyValue: T) {}
    calculate(): number {
        return +this.baseValue * +this.multiplyValue
    }
}

const onlyNumbers = new GenericMath<number>(10, 20)

console.log(onlyNumbers.calculate()) // Prints: 200