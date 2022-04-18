# Flutter TodoApp

# [Task Management](https://github.com/iahmadamin/task_management)

## ディレクトリ構造

Flutter開発では主に`lib`フォルダにUIやデータの処理などのアプリケーションの核となる部分を記述する。**言い換えれば、`lib`フォルダを見ればアプリの構造をソースコードから把握できるのだ。**

ただし、実際に挙動を確認したいとき

```
flutter pub get
```

以上のコマンドを入力してアプリを動かすのに必要な`dart_tool`をインストールしておく必要があるのでご用心。

```
C:.
│  .flutter-plugins
│  .flutter-plugins-dependencies
│  .gitignore
│  .metadata
│  .packages
│  pubspec.lock
│  pubspec.yaml
│  README.md
│
├─android
│
├─images
│      girl.jpg
│      task.svg
│
├─ios
│
└─lib
    │  main.dart
    │
    ├─controllers
    │      task_controller.dart
    │
    ├─db
    │      db_helper.dart
    │
    ├─models
    │      task.dart
    │
    ├─services
    │      notification_services.dart
    │      theme_services.dart
    │
    └─ui
        │  size_config.dart
        │  theme.dart
        │  
        ├─pages
        │      add_task_page.dart
        │      home_page.dart
        │
        └─widgets
                button.dart
                input_field.dart
                task_tile.dart
```

`main.dart`

```dart
// 主に外部パッケージをインポート
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

// こちらは自作のファイルをインポート
import 'package:task_management/db/db_helper.dart';
import 'package:task_management/services/theme_services.dart';
import 'package:task_management/ui/pages/home_page.dart';
import 'package:task_management/ui/theme.dart';

// ネットワーク通信なので非同期通信を使っている
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await DBHelper.initDb();
  await GetStorage.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: Themes.light,
      darkTheme: Themes.dark,
      themeMode: ThemeService().theme,
      home: HomePage(), // 表示する画面
    );
  }
}
```


# [Taskly](https://github.com/JobinBiju/Taskly)

## ディレクトリ構造

```
C:.
│  .gitignore
│  .metadata
│  LICENSE
│  pubspec.lock
│  pubspec.yaml
│  README.md
│
├─.github
│  └─workflows
│          flutter.yml
│
├─.vscode
│      settings.json
│
├─android
│
├─assets
│  ├─icons
│  │      alarm-clock.svg
│  │      breakfast.svg
│  │      celeb.svg
│  │      laptopPerson2.svg
│  │      Lunch.svg
│  │      notepad.svg
│  │      online-learning.svg
│  │      settings.svg
│  │      shopping.svg
│  │      taskly_logo.svg
│  │      travel.svg
│  │      treadmill.svg
│  │
│  ├─images
│  │      containerMask.png
│  │      female-user-1.png
│  │      male-user-1.png
│  │
│  ├─lottie
│  │      work-from-home.json
│  │
│  └─readmeFiles
│          addTaskFn.jpg
│          allTasks.jpg
│          confirmDelete.jpg
│          confirmLogOut.jpg
│          dailyTasks.jpg
│          deleteOption.jpg
│          editAccount.jpg
│          editOption.jpg
│          greenDark.jpg
│          greenLight.jpg
│          iconSelection.jpg
│          login.jpg
│          profile.jpg
│          redDark.jpg
│          redLight.jpg
│          settings.jpg
│          splash.jpg
│          TasklyCover.png
│          tealDark.jpg
│          tealLight.jpg
│          updateTaskFn.jpg
│          welcome.jpg
│          yellowDark.jpg
│          yellowLight.jpg
│
├─ios
│
├─lib
│  │  main.dart
│  │
│  └─app
│      ├─data
│      │  ├─model
│      │  │      task_model.dart
│      │  │      user_model.dart
│      │  │
│      │  └─services
│      │          notification_service.dart
│      │          time_zone.dart
│      │
│      ├─global_widgets
│      │      bottom_sheet.dart
│      │      decorated_Container.dart
│      │      expandable_container.dart
│      │      input_text_feild.dart
│      │      proceed_button.dart
│      │      user_avatar.dart
│      │
│      ├─modules
│      │  ├─home
│      │  │  ├─bindings
│      │  │  │      home_binding.dart
│      │  │  │
│      │  │  ├─controllers
│      │  │  │      home_controller.dart
│      │  │  │
│      │  │  └─views
│      │  │          all_tasks_view.dart
│      │  │          dashboard_view.dart
│      │  │          home_view.dart
│      │  │          past_tasks_view.dart
│      │  │          today_task_view.dart
│      │  │
│      │  ├─profile
│      │  │  ├─bindings
│      │  │  │      profile_binding.dart
│      │  │  │
│      │  │  ├─controllers
│      │  │  │      profile_controller.dart
│      │  │  │
│      │  │  └─views
│      │  │          account_details_view.dart
│      │  │          profile_view.dart
│      │  │
│      │  ├─settings
│      │  │  ├─bindings
│      │  │  │      settings_binding.dart
│      │  │  │
│      │  │  ├─controllers
│      │  │  │      settings_controller.dart
│      │  │  │
│      │  │  └─views
│      │  │          settings_view.dart
│      │  │
│      │  ├─splash_screen
│      │  │  ├─bindings
│      │  │  │      splash_screen_binding.dart
│      │  │  │
│      │  │  ├─controllers
│      │  │  │      splash_screen_controller.dart
│      │  │  │
│      │  │  └─views
│      │  │          splash_screen_view.dart
│      │  │
│      │  └─welcome
│      │      ├─bindings
│      │      │      welcome_binding.dart
│      │      │
│      │      ├─controllers
│      │      │      welcome_controller.dart
│      │      │
│      │      └─views
│      │              login_view.dart
│      │              welcome_view.dart
│      │
│      ├─routes
│      │      app_pages.dart
│      │      app_routes.dart
│      │
│      └─theme
│              app_theme.dart
│              color_theme.dart
│              text_theme.dart
│
└─test
        widget_test.dart
```

`main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:taskly/app/theme/app_theme.dart';

import 'app/routes/app_pages.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  await GetStorage.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: appThemeData[AppTheme.YellowLight],
      debugShowCheckedModeBanner: false,
      title: "Taskly",
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
    );
  }
}
```