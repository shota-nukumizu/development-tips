# `final`と`const`の違い

`final`ではコンパイル後に処理が実行され、`const`ではコンパイル時に処理が実行される。

**`final`では定数の値に変数の代入ができる一方で、`const`では変数を代入するとエラーが発生する。**

```dart
String x = 'Dart';

final String a = x; // こちらはエラーにならない
const String y = x; // エラーが発生する
```


# 参考サイト

[初心者のためのFlutter入門学習サイト](https://flutternyumon.com/)

[Final and const - Dart.dev](https://dart.dev/guides/language/language-tour#final-and-const)