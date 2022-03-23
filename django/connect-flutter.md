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