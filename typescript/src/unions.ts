// TypeScriptでは、ユニオン型はタグ無しである。つまり、Haskellのデータのような識別されたユニオンではない。
// しかし、組み込みのタグや他のプロパティを使って、ユニオンの型を識別することができる場合が多い。

function start(
    arg: string | string[] | (() => string) | {s: string} // 想定される引数の型をユニオンで全て指定できる
): string {
    // 条件分岐の処理ではif-elseは扱わず、ifのみで全文を表現する
    if (typeof arg === 'string') {
        return commonCase(arg)
    }
    if (Array.isArray(arg)) {
        return arg.map(commonCase).join(',')
    }
    if (typeof arg === 'function') {
        return commonCase(arg())
    }

    return commonCase(arg.s)

    function commonCase(s: string): string {
        return s
    }
}


console.log(start('JavaScript'))
console.log(start(['TypeScript', 'Python']))