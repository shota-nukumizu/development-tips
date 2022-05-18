# NestJSにおけるWebSocket通信

Web開発において、コードがスケーラブルであることを保証することは重要だ。

**スケーラビリティ(scalability)とは、機器やソフトウェア、システムなどの拡張性、拡張可能性のこと**を意味する。スケーラビリティの高いことを「スケーラブルな」と表現する。

実際にスケールを拡張する方法は主に以下の２つが存在する。

* **スケールアップ**：性能や機能の高い機器やシステムに交換することで規模を拡張する
* **スケールアウト**：機器やシステムの数を増やし、負荷分散を行うなど一体的に運用することで規模を拡張する

# NestJSにおける実装方法

WebSocketにおけるGateWayを実装するには、`@WebSocketGateway()`デコレータでアノテーションする必要がある。Gatewayはプラットフォームに依存しないので、一度アダプタを作成すればどのWebSocketライブラリとも互換性がある。

# インストール・実装

```powershell
/> npm i --save @nestjs/websockets @nestjs/platform-socket.io
/> npx nest new <project-name>
/> cd <project-name>
<project-name>/> npx nest g gateway events
```

上のコマンドを叩いたあとは、以下のプログラムをコピペする。

`src/app.module.ts`

```ts
import { Module } from '@nestjs/common' 
import { EventsModule } from './events/events.module' 

@Module({
  imports: [EventsModule],
})
export class AppModule {}
```

`src/main.ts`

```ts
import { NestFactory } from '@nestjs/core' 
import { WsAdapter } from '@nestjs/platform-ws' 
import { AppModule } from './app.module' 

// サーバ通信は非同期通信で実行する
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // これでNestJSでWebSocketを適用できる
  app.useWebSocketAdapter(new WsAdapter(app)) 

  await app.listen(3000) 
  console.log(`Application is running on: ${await app.getUrl()}`) 
}
bootstrap() 
```

`events.gateway.ts`

```ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets' 
import { from, Observable } from 'rxjs' 
import { map } from 'rxjs/operators' 
import { Server } from 'ws' 

// 一般的に、各GatewayはHTTPサーバと同じポートを接続する。
// 例えば、@WebSocketGateway(8080)はlocalhost:8080に接続することになる
@WebSocketGateway(8080)
export class EventsGateway {
  // ネイティブでプラットフォーム固有のサーバやインスタンスにアクセスする場合
  @WebSocketServer()
  server: Server 

  // 送信メッセージは以下のようにして書く。
  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item }))) 
  }
}
```

`events.module.ts`

```ts
import { Module } from '@nestjs/common' 
import { EventsGateway } from './events.gateway' 

// Moduleのproviderに作成したモジュールを追加することを忘れないように。
// 書き忘れるとエラーが発生して機能しなくなる。
@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
```

# 参考

* [Scalable WebSockets with NestJS and Redis - LogRocket](https://blog.logrocket.com/scalable-websockets-with-nestjs-and-redis/)
* [NestJSでWebSocket - Qiita](https://qiita.com/YutaSaito1991/items/26d25ae6ccf89fb25115)

