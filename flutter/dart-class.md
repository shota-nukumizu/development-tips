# Dartにおけるクラス定義

ここでは、3つのプロパティと2つのコンストラクター、そして1つのメソッドを持つクラスの例を示します。プロパティのひとつは直接設定できないので、（変数の代わりに）ゲッターメソッドを使用して定義されています。

```dart
class Spacecraft {
  String name;
  DateTime? launchDate;

  // Read-only non-final property
  int? get launchYear => launchDate?.year;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  // Method.
  void describe() {
    print('Spacecraft: $name');
    // Type promotion doesn't work on getters.
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

`Spacecraft`クラスはこのように使用します。

```dart
var voyager = Spacecraft('Voyager I', DateTime(1977, 9, 5));
voyager.describe();

var voyager3 = Spacecraft.unlaunched('Voyager III');
voyager3.describe();
```

# クラス継承(`inheritance`)

単一のクラスでコードを再利用するための方法

```dart
class Orbiter extends Spacecraft {
  double altitude;

  Orbiter(String name, DateTime launchDate, this.altitude)
      : super(name, launchDate);
}
```

# `Mixin`

`Mixin`は、複数のクラス階層でコードを再利用するための方法です。以下は`Mixin`の宣言です。

```dart
mixin Piloted {
  int astronauts = 1;

  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

`Mixin`で定義したクラスを付けたいなら、元のクラスに`Mixin`を付けておこう。

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ···
}
```