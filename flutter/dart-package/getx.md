# `getx`

`getx`とは、Flutterの超軽量で強力なライブラリになる。高性能な状態管理、インテリジェントな依存性注入、そしてルート管理を迅速かつ実用的に組み合わせる。これを活用することで、サーバ譲渡フロントエンドの両方で開発プロセスを完全に自動化できた。

## 基本の3原則

* 生産性：簡単な構文の使用
* パフォーマンス：通信量の節約に焦点を当てる
* 組織化：Viewやプレゼーションロジック、ビジネスロジックや依存性注入を完全に切り離せる。

要は、プログラム同士の依存関係を明確にして高性能なアプリを開発するための強力なツール。

インポート方法

```dart
import 'package:get/get.dart';
```

# カウンターアプリの開発

```dart
import 'package:get/get.dart';

void main() => runApp(GetMaterialApp(home: Home()));

class Controller extends GetxController{
  var count = 0.obs;
  increment() => count++;
}

class Home extends StatelessWidget {

  @override
  Widget build(context) {

    // Instantiate your class using Get.put() to make it available for all "child" routes there.
    final Controller c = Get.put(Controller());

    return Scaffold(
      // Use Obx(()=> to update Text() whenever count is changed.
      appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}"))),

      // Replace the 8 lines Navigator.push by a simple Get.to(). You don't need context
      body: Center(child: ElevatedButton(
              child: Text("Go to Other"), onPressed: () => Get.to(Other()))),
      floatingActionButton:
          FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}

class Other extends StatelessWidget {
  // You can ask Get to find a Controller that is being used by another page and redirect you to it.
  final Controller c = Get.find();

  @override
  Widget build(context){
     // Access the updated count variable
     return Scaffold(body: Center(child: Text("${c.count}")));
  }
}
```

# `getx`を活用する理由

Flutterのアップデート後に、多くのパッケージが壊れることがある。`getx`では開発のための主要なリソース(状態、依存関係、ルート管理)を集中管理し、１つのパッケージを`pubspec`に追加して作業を開始することだけ。`getx`では互換性の問題を解決してくれる。

`getx`の`SmartManagement`を使えば、使われていないものはすべてメモリから削除される。言い換えれば、プログラム内の使われていない依存関係を明確にしてその使用量を削減できる。

Viewとロジックを分離することで、それぞれの部分を個別にテストしやすい