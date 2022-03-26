# Widget

## `StatelessWidget`

状態がずっと変化しない`Widget`

```dart
class SampleClass extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(); // 戻り値を自分で定義（Containerがデフォルト）
  }
}
```

## `StatefulWidget`

ユーザ操作次第で状態が変化する可能性がある`Widget`

```dart
// 簡単なカウンターアプリ
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int number = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Flutter'),
        ),
        body: Center(
          child: Text(
            '$number',
            style: TextStyle(
              fontSize: 40,
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () {
            setState(
              () {
                number += 1;
              },
            );
          },
        ),
      ),
    );
  }
}
```