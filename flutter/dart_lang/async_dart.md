# Dart言語における非同期通信

非同期通信では、他の操作の終了を待っている間にプログラムが作業を完了させる。Dart言語における非同期通信には以下の３つがある

* ネットワーク経由でデータを取得する
* データベースへの書き込み
* ファイルからのデータ読み込み

Dartで非同期処理を実装する際には、`Future`クラスと`async`及び`await`キーワードを活用する

▼サンプルコード

```dart
// この場合、createOrderMessage()は保留中の作業を行う。
// createOrderMessage()はfetchUserOrder()を呼び出して、
// 後者の関数の処理が完了するのを待たなければならない。
String createOrderMessage() {
  var order = fetchUserOrder();
  return 'Your order is: $order';
}

// fetchUserOrder()は非同期関数で、遅延後は`Large Latte`を表示する
Future<String> fetchUserOrder() =>
    // 
    Future.delayed(
      const Duration(seconds: 2),
      () => 'Large Latte',
    );

void main() {
  print(createOrderMessage());
}

// この際、createOrderMessage()はfetchUserOrder()の処理終了を待たなかったので、
// fetchUserOrder()が文字列を出力できない。
// Output：Your order is: Instance of '_Future<String>'
```