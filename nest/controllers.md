# `Controller`

`Controller`の目的は、アプリの特定のリクエストを受け取ること。ルーティングはどのコントローラがどのリクエストを受け取るかを制御する。

多くの場合、各`Controller`は複数の`route`を持ち、異なる`route`は異なるアクションを実行できる。

以下のコマンドでCRUDモデルを実装するための`Controller`を実装できる。

```
nest g resource [name]
```

# ルーティング設定

```ts
// cats.controller.ts
import { Controller, Get } from '@nestjs/common';

// 基本的にはデコレータで実装する。
@Controller('cats') // 中身にルーティングの文字列を設定
export class CatsController {
  @Get() // HTTPリクエストのGETを送信する
  findAll(): string {
    return 'This action returns all cats';
  }
}
```