class Product {
    name: string
    price: number

    constructor(...p: Array<any>) {
        this.name = p[0]
        this.price = p[1]
    }
}


class Food extends Product {
    weight: number

    constructor(...p: Array<any>) {
        super(p[0], p[1])
        this.weight = p[2]
    }
}


class Drink extends Product {
    ml: number

    constructor(...p: Array<any>) {
        super(p[0], p[1])
        this.ml = p[2]
    }
}


class ProductFactory {
    static createProduct(type: string, ...rest) : Product {
        switch (type) {
            case 'food':
                return new Food(...rest)
            case 'drink':
                return new Drink(...rest)
            default:
                return new Product(...rest)
        }
    }
}

const bread = ProductFactory.createProduct('food', 'Bread', 1, 100);
console.assert(bread instanceof Food, 'Wrong implementation');
console.assert(bread instanceof Product, 'Wrong implementation');
console.assert(!(bread instanceof Drink), 'Wrong implementation');