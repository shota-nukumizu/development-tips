# Flutter開発で基本となる`Widget`

Flutterのウィジェットは、Reactからインスピレーションを得たモダンなフレームワークを使用して構築されています。中心的なアイデアは、ウィジェットからUIを構築することです。ウィジェットは、現在の構成と状態を考慮して、ビューがどのように見えるべきかを記述します。ウィジェットの状態が変わると、ウィジェットはその記述を再構築します。フレームワークは、ある状態から次の状態に移行するために、基盤となるレンダー ツリーに必要な最小限の変更を決定するために、以前の記述との差分を取ります。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

`runApp()`関数は、指定されたWidgetを受け取り、それをWidget Treeのルートとします。この例では、ウィジェットツリーは、`Center`ウィジェットとその子である `Text`ウィジェットの 2 つのウィジェットで構成されています。フレームワークでは、ルート・ウィジェットが画面を覆うように強制されるので、"Hello, world "というテキストは画面の中央に表示されることになります。この場合、テキストの方向を指定する必要がありますが、`MaterialApp`ウィジェットを使用すると、後で示すように、この処理を行います。

アプリを書くとき、一般的に新しいウィジェットを作成します。ウィジェットが状態を管理するかどうかに応じて、`StatelessWidget`または `StatefulWidget`のサブクラスとなります。ウィジェットの主な仕事は、`build()`関数を実装することです。この関数は、他の下位レベルのウィジェットの観点からウィジェットを記述します。フレームワークはこれらのウィジェットを順番にビルドしていき、その過程で、ウィジェットのジオメトリを計算し、記述する、基礎となる`RenderObject`を表すウィジェットが底を打ちます。


# 基本となる`Widget`

## `Text`

アプリ内でスタイル付きのテキストを表示できる

## `Row`, `Column`

これらのフレックスウィジェットは、水平方向（Row）と垂直方向（Column）の両方向に柔軟なレイアウトを作成することができます。これらのオブジェクトのデザインは、ウェブのフレックスボックス・レイアウト・モデルに基づいています。

## `Stack`

スタックウィジェットは、直線的（水平または垂直）に配置されるのではなく、ペイント順にウィジェットを重ねることができます。スタックの子ウィジェットにPositionedウィジェットを使えば、スタックの上端、右端、下端、左端から相対的な位置に配置することができます。スタックは、Webの絶対位置レイアウトモデルに基づいています。

## `Container`

コンテナウィジェットを使うと、長方形のビジュアルエレメントを作成することができます。コンテナには、背景、枠線、影などの BoxDecoration をつけることができます。また、コンテナには、マージン、パディング、サイズに応じた制約を適用することができます。さらに、コンテナは行列を使って3次元空間に変換することができます。

以下に、これらと他のウィジェットを組み合わせた簡単なウィジェットをいくつか紹介します。

```dart
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  const MyAppBar({required this.title, Key? key}) : super(key: key);

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        // <Widget> is the type of items in the list.
        children: [
          const IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child
          // to fill the available space.
          Expanded(
            child: title,
          ),
          const IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  const MyScaffold({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece
    // of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: [
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context) //
                  .primaryTextTheme
                  .headline6,
            ),
          ),
          const Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'My app', // used by the OS task switcher
      home: SafeArea(
        child: MyScaffold(),
      ),
    ),
  );
```

