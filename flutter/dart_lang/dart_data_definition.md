# Dartで扱うデータ一覧

* Numbers：`Int`(整数)、`double`(64bitまでの小数点)
* `String`：文字列
* `Boolean`：真偽値の判定。`true`または`false`で判定する。
* `List`：PythonやJavaScriptにおけるリストみたいなもの
* `Set`：中身をいじれない配列。
* `Map`：Pythonにおける辞書型と似ている。

特に配列は結構重要なので押さえておくべし。

```dart
// list
var nums = [1, 2, 3];

// set
var subjects = {
    'Japanese', 'Math', 'Science', 'History', 'Economy'
};

// empty set
var names = <String>{};
names.add('English');
names.addAll(subjects);

// map
var characters = {
    1: 'Mario',
    2: 'Link',
    3: 'Kirby',
    4: 'Pikachu'
};

// emptys map
var fighters = Map<Int, String>{}
fighters[1] = 'Mario'
```