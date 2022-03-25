// 型定義
type PokemonType = {
    name: string
    type: Array<string>
    level: number
    favorite: Array<string>
}

const greninja: PokemonType = {
    name: 'Greninja',
    type: ['water', 'dark'],
    level: 45,
    favorite: ['Aspear Berry', 'Grepa Berry']
}