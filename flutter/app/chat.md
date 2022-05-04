# Flutter製のチャットアプリ開発

# [Flutter WhatsAppClone](https://github.com/iampawan/FlutterWhatsAppClone)

## アプリのディレクトリ

```
C:.
│  .gitignore
│  .metadata
│  flutterwhatsapp.iml
│  pubspec.lock
│  pubspec.yaml
│  README.md
│  ss1.png
│  ss2.png
│
├─.github
│      FUNDING.yml
│
├─android
│  │  .gitignore
│  │  build.gradle
│  │  gradle.properties
│  │  gradlew
│  │  gradlew.bat
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
│  │      │  │          └─flutterwhatsapp
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
│  │      │      └─values
│  │      │              styles.xml
│  │      │
│  │      └─profile
│  │              AndroidManifest.xml
│  │
│  └─gradle
│      └─wrapper
│              gradle-wrapper.jar
│              gradle-wrapper.properties
│
├─ios
│  │  .gitignore
│  │  Podfile
│  │  Podfile.lock
│  │
│  ├─Flutter
│  │      AppFrameworkInfo.plist
│  │      Debug.xcconfig
│  │      flutter_export_environment.sh
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
│  │  whatsapp_home.dart
│  │
│  ├─models
│  │      chat_model.dart
│  │
│  └─pages
│          call_screen.dart
│          camera_screen.dart
│          chat_screen.dart
│          status_screen.dart
│          store_page_view.dart
│
└─test
        widget_test.dart
```

## `lib`フォルダの中身

```
├─lib
│  │  main.dart
│  │  whatsapp_home.dart
│  │
│  ├─models
│  │      chat_model.dart
│  │
│  └─pages
│          call_screen.dart
│          camera_screen.dart
│          chat_screen.dart
│          status_screen.dart
│          store_page_view.dart
│
└─test
        widget_test.dart
```