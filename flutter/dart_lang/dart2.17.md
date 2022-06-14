# Dart 2.17の新機能

# `Enum`でのメンバ変数機能

これまで`Enum`の定義は以下のように非常に簡単な定義しかできなかった。

```dart
enum Account {
  student,
  parent,
  staff;
}
```

Dart 2.17からは以下のように`Enum`にメンバ変数を定義できるようになる。

```dart
enum Account {
  student('stu'),
  parent('pat'),
  staff('stf');

  final String accountType;
  const Account(this.accountType);

  @override
  String toString() {
    return "Account type is $accountType}";
  }
}
```

# コンストラクタでの`super`を使った初期化

クラスを継承した時にコンストラクタの記述をより簡略化できるようになった。

```dart
class Sample{
  String label1;
  String label2;

  Sample({ required this.label1, required this.label2 });
}

/// Dart2.17以前
class Hoge1 extends Sample{

  Hoge1(
      { required String label1,
        required String label2
      }) : super (
        label1: label1,
        label2: label2
      );
}

/// Dart2.17以降
class Hoge2 extends Sample{
  Hoge2({
    required super.label1,
    required super.label2
  });
}
```

Flutterはコンストラクタで必要な係数が多いケースがよくある。その場合に記述しやすく、さらに、短いコードでも`super`で基底クラスとの依存関係を理解しやすいようになる。

# メソッドでの名前付き引数の宣言の緩和

**これまで、名前付き引数は定義と同じように通常の引数の後に記述する必要があった。**しかし、この制限がなくなって引数をどこに記述しても問題なくなった。

```dart
void sample(int size, { required String label1 , required String label2 } ){
  print(size);
  print(label1);
  print(label2);
}

main(){
  // Dart2.17以前
  sample(10, label1: 'test1', label2: 'test2');

  // Dart2.17以降
  sample(label1: 'test1', label2: 'test2', 10);
  sample(label2: 'test2', 10 , label1: 'test1');
}
```

Flutterではコンストラクタメソッド内の引数だけで定義を記述することが多いので、引数の記述がどうしても冗長になりがち。そのような場合に、より見やすいように順番を変えたくなることがよくあるが、そのような要望に応えられるようになった。