# TypeORM

# [NestjsのTypeormクエリがまだ`postgres`データベースを使用中](https://stackoverflow.com/questions/72175502/nestjs-typeorm-query-still-using-postgres-database)

# 質問

ログインAPI用のリポジトリを使って問い合わせをしようとするとエラーが発生する

```
QueryFailedError: relation "user" does not exist
```

デバッグをすると、`.env`でデータベース名を`nestjs`と設定したにも関わらず`postgres`という名前のデータベースを使っていることがわかった。

```
DB_TYPE=postgres
DB_HOST=db
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nestjs
DB_NAME_TEST=nestjs_test
DB_PORT=5432
```

以下は、データベース接続を設定するためのファイル。

`configuration.ts`

```ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  name: process.env.DB_NAME,
  nameTest: process.env.DB_NAME_TEST,
  port: process.env.DB_PORT,
}));
```

`database/config.service.ts`

```ts
get name(): string {
    return this.configService.get<string>(
      this.configService.get<string>('app.env') === 'test'
        ? 'database.nameTest'
        : 'database.name',
    );
  }
```

`database/config.migration.ts`

```ts
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../../database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
};
```

`database/provider.module.ts`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfigModule } from '../../config/database/config.module';
import { DatabaseConfigService } from '../../config/database/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (
        service: DatabaseConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: service.type,
        host: service.host,
        port: service.port,
        username: service.user,
        password: service.password,
        name: service.name,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/../../database/migrations',
        },
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        synchronize: false,
        logging: true,
        keepConnectionAlive: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
  ],
})
export class DatabaseProviderModule {}
```


# 回答

TypeORMモジュールには、データベース名を提供する`database`プロパティが存在する。`provider.module.ts`で`name`を使う。

```ts
TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
});
```