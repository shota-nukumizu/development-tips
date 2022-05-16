# Flutter開発を円滑に進めるために必要なこと

Flutterはデフォルトで高性能だが、アプリケーションを優れた速度で動作させるためにはコードを書く際にいくつかの間違いに注意しなければならない。

# 1. `Widget`を関数で分割しない

以下の例は、ヘッダー、センターやフッタ０のウィジェットを含むもの。

```dart
class MyHomePage extends StatelessWidget {
  Widget _buildHeaderWidget() {
    final size = 40.0;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: CircleAvatar(
        backgroundColor: Colors.grey[700],
        child: FlutterLogo(
          size: size,
        ),
        radius: size,
      ),
    );
  }

  Widget _buildMainWidget(BuildContext context) {
    return Expanded(
      child: Container(
        color: Colors.grey[700],
        child: Center(
          child: Text(
            'Hello Flutter',
            style: Theme.of(context).textTheme.display1,
          ),
        ),
      ),
    );
  }

  Widget _buildFooterWidget() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text('This is the footer '),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildHeaderWidget(),
            _buildMainWidget(context),
            _buildFooterWidget(),
          ],
        ),
      ),
    );
  }
}
```

プログラムを`Widget`全体に変更を加えてリフレッシュするという形でこのように書いてしまうと、メソッド内にある`Widget`もリフレッシュされてしまうのでCPUの無駄遣いになる。

そして、これらのメソッドを次のようにスレートレス`Widget`に変換する。

```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            HeaderWidget(),
            MainWidget(),
            FooterWidget(),
          ],
        ),
      ),
    );
  }
}

class HeaderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final size = 40.0;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: CircleAvatar(
        backgroundColor: Colors.grey[700],
        child: FlutterLogo(
          size: size,
        ),
        radius: size,
      ),
    );
  }
}

class MainWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        color: Colors.grey[700],
        child: Center(
          child: Text(
            'Hello Flutter',
            style: Theme.of(context).textTheme.display1,
          ),
        ),
      ),
    );
  }
}

class FooterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text('This is the footer '),
    );
  }
}
```

このようにそれぞれ`StatelessWidget`で分割することで、万が一`Widget`を変更する際に全体をリフレッシュする必要性がなくなるのだ。

# 参考サイト

* [Flutter best practices for Improve Performance - Medium](https://inficial.medium.com/flutter-best-practices-for-improve-performance-7e21e14efebb)
* [How to improve the performance of your Flutter app - codemagic](https://blog.codemagic.io/how-to-improve-the-performance-of-your-flutter-app./#dont-split-your-widgets-into-methods)