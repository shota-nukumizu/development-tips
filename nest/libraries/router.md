# [nest-router](https://github.com/nestjsx/nest-router)

## インストール方法

```
npm install nest-router --save
```

## 設定方法

使い方は簡単で、以下のようにプログラムを書くだけで機能する。

```ts
... //imports
const routes: Routes = [
    {
      path: '/ninja',
      module: NinjaModule,
      children: [
        {
          path: '/cats',
          module: CatsModule,
        },
        {
          path: '/dogs',
          module: DogsModule,
        },
      ],
    },
  ];

@Module({
  imports: [
      RouterModule.forRoutes(routes), // setup the routes
      CatsModule,
      DogsModule,
      NinjaModule
  ], // as usual, nothing new
})
export class ApplicationModule {}
```

## １つずつデータを取り出すとき(`id`の活用)

```ts
... //imports
const routes: Routes = [
    {
      path: '/ninja',
      module: NinjaModule,
      children: [
        {
          path: '/:ninjaId/cats',
          module: CatsModule,
        },
        {
          path: '/:ninjaId/dogs',
          module: DogsModule,
        },
      ],
    },
  ];
```