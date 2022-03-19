# SQLite

オープンソースで軽量のRDBMS(データベース管理システム)。

# SQLiteの特徴

* 設定不要
* 営利・非営利問わず自由に使える
* 世界で最も広く使われているデータベース管理システム
* 複数のテーブル、インデックスやトリガー、ビューが単一のディスクファイルに含まれる
* 非常に軽量(750KB)
* シンプルな構文
* 長期に渡るサポート

# 開発アイデア①-Flutter✕SQLiteの環境構築

[SQLiteでのデータの永続化 - Flutter Doc JP](https://flutter.ctrnost.com/logic/sqlite/)<br>
AndroidやiOS開発におけるSQLiteの活用方法。

やり方は至ってシンプルで、

1. データモデルの定義
2. データベースへ接続
3. テーブルの作成
4. データの登録

```dart
// データモデルの定義
class Memo {
  final int id;
  final String text;
  final int priority;

  Memo({this.id, this.text, this.priority});
}
```

```dart
// データベースへ接続
final Future<Database> database = openDatabase(
  join(await getDatabasesPath(), 'memo_database.db'),
);
```

```dart
// メモテーブルの作成
final Future<Database> database = openDatabase(
  join(await getDatabasesPath(), 'memo_database.db'),
  onCreate: (db, version) {
    return db.execute(
      "CREATE TABLE memo(id INTEGER PRIMARY KEY, text TEXT, priority INTEGER)",
    );
  },
  version: 1,
);
```

```dart
// データの登録
class Memo {
  final int id;
  final String text;
  final int priority;

  Memo({this.id, this.text, this.priority});
  
  // Memoデータモデルにメソッドを追加
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'text': text,
      'priority': priority,
    };
  }
}

// これでMemo型からMapに変換できるように！
Future<void> insertMemo(Memo memo) async {
  final Database db = await database;
  await db.insert(
    'memo',
    memo.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );
}

final todo = Memo(
  id: 0, 
  text: 'Flutterで遊ぶ', 
  priority: 1,
);

await insertMemo(todo);
```