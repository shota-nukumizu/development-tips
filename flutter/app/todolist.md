# Flutter TodoApp

# [Task Management](https://github.com/iahmadamin/task_management)

## ディレクトリ構造

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