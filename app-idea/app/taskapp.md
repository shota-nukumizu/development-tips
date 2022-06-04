# タスク管理アプリ

簡単かつシンプルなタスク管理アプリを開発しようと考えている。こちらはDRFとNestJS両方とも開発してお互いに挙動を確認する。

# 設計予想

## フロントエンド(Flutter)

```
├─lib
│  │  main.dart
│  │
│  ├─helpers
│  │      app_constants.dart
│  │      layout_helper.dart
│  │      text_styles.dart
│  │
│  ├─model
│  │  │  task_controller.dart
│  │  │
│  │  └─hive
│  │          label.dart
│  │          label.g.dart
│  │          task.dart
│  │          task.g.dart
│  │          user.dart
│  │          user.g.dart
│  │
│  └─ui
│      │  add_task.dart
│      │  home_page.dart
│      │  splash_page.dart
│      │
│      └─widgets
│              calender_view.dart
│              custom_calender.dart
│              custom_textfield.dart
│              label_widget.dart
│              material_button.dart
│              ui_helpers.dart
```

## バックエンド(Django REST Framework)

主にAPIで開発する予定。

# 使用技術

* Flutter
* Django REST Framework
* AWS
* Firebase
* Visual Studio Code
* Android Studio

使用する認証はCookie認証あるいはJWT認証。マイクロサービスで運用する予定？

# 参考

[TaskDiary-Flutter](https://github.com/SurajLad/TaskDiary-Flutter)