// Pokemonをinterfaceとして定義する
interface Pokemon {
    name: string
    type1: string
    type2: string
    level: number
}

// interfaceで定義されたプロパティを持つことが強制される。
class Pikachu implements Pokemon {
    name = 'Pikachu'
    type1 = 'electric'
    type2 = ''
    level = 10
}

// 型定義でもクラスの使い方と同様に型定義したオブジェクトのプロパティを強制できる
const charizard: Pokemon = {
    name: 'Charizard',
    type1: 'flying',
    type2: 'fire',
    level: 50
}