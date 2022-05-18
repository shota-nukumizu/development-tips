# Flutterで日付・時間入力をする方法

**紹介するコンポーネントは日本語化して活用するようにする。**英語で表示されることがあるので要注意だ。

まずは、以下のパッケージをインストールしておく必要がある。

* `flutter_localizations`：各種言語に対するパッケージ
* `intl`：日付や数値入力の多言語化

あとは`lib/main.dart`に以下のコードを追加する。

基本的な設定は以下の通り。

```dart
// （1） 必要なパッケージをimport
import 'package:flutter_localizations/flutter_localizations.dart';
// 省略
return MaterialApp(
    // （2） 多言語対応処理の追加
    localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
    ],
    // （3） 対応する言語の宣言
    supportedLocales: [
        Locale('ja',''),
        Locale('en',''),
    ],
);
```

## 単一日付を入力する

```dart
class _DatePickerWidget extends State<DatePickerWidget> {

  // （1） 入力された日付変数
  DateTime _inputDate = DateTime.now();
  // : （省略）

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        alignment: Alignment.center,
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton(
                  // （2） ボタンを押した時に入力できるようにする
                  onPressed: () => _openSample1(context),
                  child: Text("日付選択")
              ),
              // : （省略）
            ])
    );
  }

  Future<void> _openSample1(BuildContext context) async {
    // （3） ダイアログを表示する
    final DateTime? _date = await showDatePicker(
        context: context,
        // （4） 処理指定日付
        initialDate: DateTime.now(),
        // （5） 指定できる日付範囲
        firstDate: DateTime(2022,1,1),
        lastDate: DateTime(2022,12,31),
    );
    // （6） 選択された場合に、値を設定する
    if(_date != null){
      setState(() {
        _inputDate = _date;
      });
    }
  }
  // 
```

# 参考サイト

[Flutterのマテリアルデザインを活用した日付入力と時間入力コンポーネントを紹介 - CodeZine](https://codezine.jp/article/detail/15873)