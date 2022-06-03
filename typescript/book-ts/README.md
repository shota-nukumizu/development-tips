# サバイバルTypeScript執筆メモ

# 2022/06/03時点

## 感想(ためしよみの)

* 正直、無料で得られる情報の割にはめちゃくちゃ質が高い。
* ソースコードもわかりやすく、冗長なものもないのでめちゃくちゃわかりやすい。
* TypeScriptの歴史など、他のTypeScriptの技術書には書かれていない内容があってエンタメとしても面白さがある。
* 「なぜTypeScriptを使うべきか」の部分は、一部『NestJSの強化書』の「なぜNestJSを使うべきなのか？」で採用した。

## 疑問点

いまいちTypeScriptのデコレータについてイメージできていないが、**TypeScriptにおけるデコレータはクラスなどの宣言に使われる特殊な宣言の一つで、既存のクラスやメソッドに追加の機能を入れる、という解釈で大丈夫か？**

例えば、このような感じで

```ts
const notAllowlist = ["Jone Doe", "Peter Paker"];

const allowNameOnly = (target: any, memberName: string) => {
  let currentValue: string = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: string) => {
      if (notAllowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue,
  });
};

class Person {
  @allowNameOnly
  name: string = "Jon";
}

const person = new Person();
console.log(person.name); // Jon

person.name = "Jone Doe";
console.log(person.name); // Jon

person.name = "Peter Paker";
console.log(person.name); // Jon

person.name = "Mary Jane";
console.log(person.name); // Mary Jane
```

## 要望

以下の内容を技術書に載せるのもありかもしれない？

* TypeScript version 4.7の新機能
* 実務でよく使うTypeScriptのアルゴリズム
* TypeScriptでGraphQLの操作チュートリアル
* NestJSで簡単なREST APIの作り方
* suin式TypeScriptチートシート

[README](../README.md)にあるリポジトリで、[Design Patterns in Typescript](https://github.com/torokmark/design_patterns_in_typescript)が一番参考になるのでデザインパターンを本技術書に書くのもありかもしれない？**良質なコードを書くことは、コンピュータの負担をかけずに質の高いプロダクトを作り上げる上ではめちゃくちゃ重要になると思うから。**