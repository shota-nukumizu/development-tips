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

# [TaskDiary-Flutter](https://github.com/SurajLad/TaskDiary-Flutter)

## ディレクトリ

```
C:.
│  .gitignore
│  .metadata
│  pubspec.lock
│  pubspec.yaml
│  README.md
│
├─android
│  │  .gitignore
│  │  build.gradle
│  │  gradle.properties
│  │  settings.gradle
│  │
│  ├─app
│  │  │  build.gradle
│  │  │
│  │  └─src
│  │      ├─debug
│  │      │      AndroidManifest.xml
│  │      │
│  │      ├─main
│  │      │  │  AndroidManifest.xml
│  │      │  │
│  │      │  ├─kotlin
│  │      │  │  └─com
│  │      │  │      └─example
│  │      │  │          └─xno_taskapp
│  │      │  │                  MainActivity.kt
│  │      │  │
│  │      │  └─res
│  │      │      ├─drawable
│  │      │      │      launch_background.xml
│  │      │      │
│  │      │      ├─mipmap-hdpi
│  │      │      │      ic_launcher.png
│  │      │      │
│  │      │      ├─mipmap-mdpi
│  │      │      │      ic_launcher.png
│  │      │      │
│  │      │      ├─mipmap-xhdpi
│  │      │      │      ic_launcher.png
│  │      │      │
│  │      │      ├─mipmap-xxhdpi
│  │      │      │      ic_launcher.png
│  │      │      │
│  │      │      ├─mipmap-xxxhdpi
│  │      │      │      ic_launcher.png
│  │      │      │
│  │      │      ├─values
│  │      │      │      styles.xml
│  │      │      │
│  │      │      └─values-night
│  │      │              styles.xml
│  │      │
│  │      └─profile
│  │              AndroidManifest.xml
│  │
│  └─gradle
│      └─wrapper
│              gradle-wrapper.properties
│
├─assets
│  │  no_task_vector.png
│  │  profile_vector.png
│  │  task_splash.png
│  │
│  ├─avatars
│  │      female_01.png
│  │      female_02.png
│  │      female_03.png
│  │      male_01.png
│  │      male_02.png
│  │      male_03.png
│  │      male_04.png
│  │
│  └─font
│          Poppins-Regular.ttf
│
├─ios
│  │  .gitignore
│  │
│  ├─Flutter
│  │      AppFrameworkInfo.plist
│  │      Debug.xcconfig
│  │      Release.xcconfig
│  │
│  ├─Runner
│  │  │  AppDelegate.swift
│  │  │  Info.plist
│  │  │  Runner-Bridging-Header.h
│  │  │
│  │  ├─Assets.xcassets
│  │  │  ├─AppIcon.appiconset
│  │  │  │      Contents.json
│  │  │  │      Icon-App-1024x1024@1x.png
│  │  │  │      Icon-App-20x20@1x.png
│  │  │  │      Icon-App-20x20@2x.png
│  │  │  │      Icon-App-20x20@3x.png
│  │  │  │      Icon-App-29x29@1x.png
│  │  │  │      Icon-App-29x29@2x.png
│  │  │  │      Icon-App-29x29@3x.png
│  │  │  │      Icon-App-40x40@1x.png
│  │  │  │      Icon-App-40x40@2x.png
│  │  │  │      Icon-App-40x40@3x.png
│  │  │  │      Icon-App-60x60@2x.png
│  │  │  │      Icon-App-60x60@3x.png
│  │  │  │      Icon-App-76x76@1x.png
│  │  │  │      Icon-App-76x76@2x.png
│  │  │  │      Icon-App-83.5x83.5@2x.png
│  │  │  │
│  │  │  └─LaunchImage.imageset
│  │  │          Contents.json
│  │  │          LaunchImage.png
│  │  │          LaunchImage@2x.png
│  │  │          LaunchImage@3x.png
│  │  │          README.md
│  │  │
│  │  └─Base.lproj
│  │          LaunchScreen.storyboard
│  │          Main.storyboard
│  │
│  ├─Runner.xcodeproj
│  │  │  project.pbxproj
│  │  │
│  │  ├─project.xcworkspace
│  │  │  │  contents.xcworkspacedata
│  │  │  │
│  │  │  └─xcshareddata
│  │  │          IDEWorkspaceChecks.plist
│  │  │          WorkspaceSettings.xcsettings
│  │  │
│  │  └─xcshareddata
│  │      └─xcschemes
│  │              Runner.xcscheme
│  │
│  └─Runner.xcworkspace
│      │  contents.xcworkspacedata
│      │
│      └─xcshareddata
│              IDEWorkspaceChecks.plist
│              WorkspaceSettings.xcsettings
│
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
│
├─Screenshots
│      app.apk
│      screenshot_1.png
│      screenshot_2.png
│      screenshot_3.png
│      screenshot_4.png
│
└─test
        widget_test.dart
```

## `lib`フォルダの中身

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