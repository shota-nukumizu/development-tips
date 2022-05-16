# NestJSのCORS設定

```ts
// 方法1
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);

// 方法2
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(3000);

// ただし、この実装方法はREST API限定
```
