# How to Connect Django with Flutter

`settings.py`

```py
ALLOWED_HOSTS = [
    '10.0.2.2', #needed for Android emulator
    'localhost'
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'todo',
]
```

`models.py`

```py
from django.db import models

class Todo(models.Model):
  title = models.CharField(max_length=50)
  completed = models.BooleanField(default=False)
```

`lib/models/task.dart`

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class Task {
  int id;
  String title;
  bool completed;

  Task({this.id, @required this.title, this.completed = false});

  void toggleCompleted() {
    completed = !completed;
  }

  factory Task.fromJason(Map<String, dynamic> json) {
    return Task(
      id: json['id'],
      title: json['title'],
      completed: json['completed'],
    );
  }
  dynamic toJson() => { 'title': title, 'completed': completed };
}
```

# まとめ

ざっくりとした流れを踏まえると、

1. Djangoの`ALLOWED_HOST`の設定を変更する
2. Djangoでモデルを設計する
3. Flutter側でDjangoと連携する

このような感じになる。


# 別解

Dartのパッケージである`http`を活用する

`student.dart`

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;


class Student {
  //　ここでAPIのURLを持ってくる
  String baseUrl = 'http://localhost:8000/api/items/';
  // データをリスト化して表示する
  Future<List> getAllStudent() async {
    try {
      var response = await http.get(Uri.parse(baseUrl));
      if(response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error('Server Error')
      }
    } catch(e) {
      return Future.error(e);
    }
  }
}
```

`main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutterapp/student.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Connect Flutter with Django',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Connect Flutter with Django'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Student studentService = Student();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Container(
          child: FutureBuilder<List>(
            // ここでStudentサービスのデータを持ってくる
            future: studentService.getAllStudent(),
            builder: (context, snapshot) {
              print(snapshot.data);
              if (snapshot.hasData) {
                return ListView.builder(
                    itemCount: snapshot.data?.length,
                    itemBuilder: (context, i) {
                      return Card(
                        child: ListTile(
                          title: Text(
                            snapshot.data![i]['stuname'],
                            style: TextStyle(fontSize: 30.0),
                          ),
                          subtitle: Text(
                            snapshot.data![i]['email'],
                            style: TextStyle(fontSize: 30.0),
                          ),
                        ),
                      );
                    });
              } else {
                return const Center(
                  child: Text('No Data Found'),
                );
              }
            },
          ),
        ));
  }
}
```