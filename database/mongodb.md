# MongoDB

MongoDBとは、オープンソースのドキュメント指向データベースのこと。NoSQLの分野で高いシェアを誇る。ドキュメント型なので、自由に構造を変更できるのが最大の特徴。

基本的には無料だが、サーバレスの機能やRAM(メモリの作業領域)やデータベースのストレージを拡張したりセキュリティを向上させたりしたい場合は課金する必要がある。

ちなみに公式でおすすめされているDedicatedプランは月額$57。

機能は非常に高いが、経済的に余裕がある場合じゃないと有料課金は厳しいかもしれない...

# 利点8つ

* シンプルでわかりやすく、開発しやすい
* 動的スキーマ設計：後からでも簡単にデータベースの構造を変更できる
* 高速
* レプリカセット：3台以上のサーバを用意して常にデータを同期できる仕組み
* スケールアウト：読み取りの負荷分散の仕組みがあるので、読み取りや書き込みのスケーラビリティが実現できる
* そのままデータを格納できる：ドキュメント指向データベースで、JSON形式のレコードをBSONで管理し、ドキュメントのまとまりをコレクションとして格納する

# MongoDBでできないこと

* SQLが使えない。JavaScriptでデータを操作する
* RDBMSのように高度な結合操作
* トランザクション処理

# MongoDBが流行した背景

MongoDBはNoSQLの一つ。最近は開発やYouTubeのコーディング解説動画でよく目にする。

流行した背景―**ちょうどiOSのプラットフォームとSDKが開放されてモバイルアプリの開発が始まった頃に、爆発的にユーザ数が増えるシステムが多くなった。**そういった状況でデータベースがボトルネックになりがちで、スレーブに逃がせるreadよりも分散できないwriteのほうが追いつかなくなって詰んでしまうという逼迫感(追い詰められていて、ゆとりがない状態に陥る)があった。

このような問題をSQLでは解決できないので、MongoDBのようなNoSQLのデータベースが開発された。

# 開発アイデア

[mongo_dart - Dart Package](https://pub.dev/packages/mongo_dart)<br>
DartでMongoDBを扱うためのパッケージ。

以下のようにして扱う。

```dart
// 開発者サーバを立ち上げる際
var db = Db("mongodb://localhost:27017/mongo_dart-blog");
await db.open();

// URL形式で表示させるとき
var db = await Db.create("mongodb+srv://<user>:<password>@<host>:<port>/<database-name>?<parameters>");
await db.open();
```

▼サンプルコード。(引用：stack overflow)

```dart
// FlutterとMongoDBを連携させる
import 'package:mongo_dart/mongo_dart.dart' show Db, DbCollection;
class DBConnection {

  static DBConnection _instance;

  final String _host = "DATABASE SERVER";
  final String _port = "DATABASE PORT";
  final String _dbName = "DATABASE NAME";
  Db _db;

  static getInstance(){
    if(_instance == null) {
      _instance = DBConnection();
    }
    return _instance;
  }

  Future<Db> getConnection() async{
    if (_db == null){
      try {
        _db = Db(_getConnectionString());
        await _db.open();
      } catch(e){
        print(e);
      }
    }
    return _db;
  }

  _getConnectionString(){
    return "mongodb://$_host:$_port/$_dbName";
  }

  closeConnection() {
    _db.close();
  }

}
```

# 参考サイト

[MongoDB](https://www.mongodb.com/)<br>
本家の公式サイト。

[MongoDB Docs](https://docs.mongodb.com/)<br>
本家の公式ドキュメント。

[flutter-mongodb-mobile - GitHub](https://github.com/amondnet/flutter-mongodb-mobile)<br>
MongoDBとFlutterを連携させる際に必要なプラグインを取り揃えたもの

[How to Use Django with MongoDB - Tutorial](https://www.mongodb.com/compatibility/mongodb-and-django)<br>
DjangoとMongoDBを連携させる方法

[やってみようNoSQL MongoDBを最速で理解する](https://qiita.com/Brutus/items/8a67a4db0fdc5a33d549)<br>
MongoDBの基本を理解するにはうってつけ。

[MongoDB(mongoose) - NestJS Docs](https://docs.nestjs.com/techniques/mongodb)<br>
NestJSでMongoDBを活用するためのチュートリアル