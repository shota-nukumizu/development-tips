# FlutterでREST APIからデータを抽出する方法

## サンプルコード

```dart
// main.dart

// 最初に、必要なパッケージをインストールする
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'sentence.dart';

// Flutterアプリを起動するためのプログラム
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter APP',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter APP'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

// データの抽出。ネットワーク経由でデータを取り出すので、非同期通信を使う。
// APIでデータ取得、一覧表示をする
class _MyHomePageState extends State<MyHomePage> {
  List<Sentence> _sentence = [];
  void fetchSentence() async {
    final response = await http.get(Uri.parse(
        '{APIのURL}'));
    if (response.statusCode == 200) {
      final List<dynamic> sentences =
          jsonDecode(utf8.decode(response.body.runes.toList()))['data'];
      setState(() {
        _sentence =
            sentences.map((sentence) => Sentence.fromJson(sentence)).toList();
      });
    } else {
      throw Exception('Failed to load sentence');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchSentence();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
          child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: Text(_sentence[index].text),
                );
              },
              itemCount: _sentence.length)),
    );
  }
}
```

```dart
// sentence.dart
class Sentence {
  final String id;
  final String text;

  Sentence({
    required this.id,
    required this.text
  });
  
  // JSONから定義した型に変換できる
  factory Sentence.fromJson(Map<String, dynamic> json) {
    return Sentence(
        id: json['id'],
        text: json['text']);
  }
}

/**
出力する形としては、
{
    id: '1',
    text: 'kirby'
}
/*
```

# 余談

dartの`factory`について簡単に説明する。

**コンストラクタが常にその新しいインスタンスを作成するとは限らない場合、予約語`factory`を使う。**イニシャライザリストで処理できないロジックを使って最終変数を初期化する際にも使われる。

もっと簡単に言えば、具体的な実装クラスを意識せずに利用させるものを`factory`と呼ぶ。

**ただし、`factory`を活用する場合は`this`にアクセスできなくなるので注意。**

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

`factory`コンストラクタを応用して、実装クラスをこのような感じで切り替えられる。

```dart
// （1） abstractクラスとして制限をかける
abstract class PasswordHash{
  factory PasswordHash(){
    return DefaultHash();
  }
  // 省略
}
// （2） 実装クラスを定義
class DefaultHash implements PasswordHash{
  // (省略)
}
main(){
  // （3） 利用者は DefaultHash というクラスの存在を知らなくてよい
  var hash = PasswordHash();
  hash.convert("pswd");
}
```

# 余談：`factory`コンストラクタの使い方

正直公式ドキュメントとCodeZineの説明だけでは十分に理解できないので、より詳細に使い方を書いていく。

Dartでは、引数が違っていても同じ名前の関数を複数宣言できないので、その対策として`named`や`factory`が用意されている。**単にコンストラクタを複数用意したい目的で多用されることが多い。**

例えば、こちらのモデルを仮定する。

```dart
class Album {
  final int userId;
  final int id;
  final String title;

  Album({this.userId, this.id, this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
    );
  }
}
```

```dart
// 定義したモデルをここで書き示す
Future<Album> fetchAlbum() async {
  final response =
  await http.get('https://jsonplaceholder.typicode.com/albums/16');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    var temp=json.decode(response.body);
    return Album(userId:temp['userId'],id:temp['id'],title:temp['title']);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
```

このプログラムの場合、


```dart
return Album(userId:temp['userId'],id:temp['id'],title:temp['title']);
```

このように通常のコンストラクタを設定しても通常通り動作するように思える。

しかし、このようにプログラムを書くとスマートだし、コードの変更にも強くなる。そのため、通常は`factory`コンストラクタを活用する。

```dart
return Album.fromJson(json);
```

# 参考

* [Fetch data from the internet - Flutter Docs](https://docs.flutter.dev/cookbook/networking/fetch-data)
* [[flutter] 1番シンプルにAPI取得して一覧表示する例を作成してみた - Zenn](https://zenn.dev/jojojo/articles/2e85c8a885e85e)
* [A tour of the Dart language](https://dart.dev/guides/language/language-tour#factory-constructors)
* [Dart言語でのプログラム設計でワンランク上を目指そう - GitHub](https://codezine.jp/article/detail/13665)
* [Flutter : factoryコンストラクタはどのような場面で使うべきか](https://teratail.com/questions/288071)