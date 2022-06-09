# TypeScriptの抽象クラス(`abstract`)

```ts
abstract class Food {

  // コンストラクタを定義する。protectedは自身のクラスとサブクラスからアクセス可能な修飾子
  constructor(protected name: string, protected calorie: number) {}

  // パラメータを表示する。
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }

  // 冷蔵庫に入れるかどうかのメソッド。booleanで型定義する
  abstract keepRefrigerated(): boolean;
}

// MeatクラスにkeepRefrigeratedメソッドが実装されていないので、エラーが発生する。
class Meat extends Food {}
```

```ts
abstract class Food {
  constructor(protected name: string, protected calorie: number) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

// keepRefrigeratedメソッドをつけることで、エラーが解決する。
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```