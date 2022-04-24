# Flutter Metronome

## [metronome](https://github.com/manishmeganathan/metronome)

### ディレクトリ構造

```
C:.
│  .gitignore
│  .metadata
│  LICENSE
│  pubspec.yaml
│  README.md
│
├─android
│
├─assets
│      worldmap.png
│
├─images
│      UI1.webp
│      UI2.png
│      UI3.webp
│      UI4.webp
│
├─ios
│
├─lib
│  │  main.dart
│  │
│  ├─data
│  │      cities.dart
│  │      theme.dart
│  │
│  ├─screens
│  │      clockpage.dart
│  │      homepage.dart
│  │
│  └─widgets
│          digitalclock.dart
│          menubuttons.dart
│          worldmap.dart
│
├─test
│      widget_test.dart
│
└─web
    │  favicon.png
    │  index.html
    │  manifest.json
    │
    └─icons
            Icon-192.png
            Icon-512.png
```

### `lib`ファイル

```
├─lib
│  │  main.dart
│  │
│  ├─data
│  │      cities.dart
│  │      theme.dart
│  │
│  ├─screens
│  │      clockpage.dart
│  │      homepage.dart
│  │
│  └─widgets
│          digitalclock.dart
│          menubuttons.dart
│          worldmap.dart
```

主に以下の４つに分けてアプリを開発している

* `main.dart`：アプリのホームページとなる部分
* `data`：データを格納する場所
* `screens`：スクリーンの表示
* `widgets`：アプリの画面表示