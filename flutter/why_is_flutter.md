# なぜFlutterなのか

Flutterがモバイルアプリ開発で選ばれる理由は主に以下の２つ。

* 高速で作成できるモックアップ
* ホットリロード

## 高速で作成できるモックアップ

FlutterはMaterial Designで短時間でモックアップを作成できる。そのため、レイアウトや機能の使い勝手の調査をチーム内で共有しながらできる。

## ホットリロード

**ソースコードを変更するだけで勝手に画面が更新される。**これはモバイルアプリ開発で非常に有効。(というか、ストレスフリーで開発を進められる)

# Flutterでサンプルアプリを開発

Flutterはコーディングが簡単で、様々なUIを手軽に実装できる。

* 公式ドキュメントが充実しており、学習や問題解決が簡単
* UIの要素とあらゆるウィジェット(`Widget`)が整理されている
* ホットリロードにより時間をかけてビルドしなくても実装の変更点を画面上で確認できる

# 基本的なUIの実装

データを一列に表示するだけのサンプルアプリ

```dart
import 'package:flutter/material.dart'; 
void main() => runApp(MyApp()); 

class MyApp extends StatelessWidget { 
   // This widget is the root of your application. 
   @override 
   Widget build(BuildContext context) {
      return MaterialApp(
         title: 'Flutter Demo', theme: ThemeData(
            primarySwatch: Colors.blue,
         ), 
         home: MyHomePage(title: 'Product layout demo home page'), 
      );
   }
}
class MyHomePage extends StatelessWidget { 
   MyHomePage({Key key, this.title}) : super(key: key); 
   final String title; 
   
   @override 
   Widget build(BuildContext context) { 
      return Scaffold( 
         appBar: AppBar(title: Text("Product Listing")), 
         body: ListView(
            shrinkWrap: true, 
            padding: const EdgeInsets.fromLTRB(2.0, 10.0, 2.0, 10.0), 
            children: <Widget>[ 
               ProductBox(
                  name: "iPhone", 
                  description: "iPhone is the stylist phone ever", 
                  price: 1000, 
                  image: "iphone.png"
               ), 
               ProductBox( 
                  name: "Pixel",    
                  description: "Pixel is the most featureful phone ever", 
                  price: 800, 
                  image: "pixel.png"
               ), 
               ProductBox( 
                  name: "Laptop", 
                  description: "Laptop is most productive development tool", 
                  price: 2000, 
                  image: "laptop.png"
               ), 
               ProductBox( 
                  name: "Tablet", 
                  description: "Tablet is the most useful device ever for meeting", 
                  price: 1500, 
                  image: "tablet.png"
               ), 
               ProductBox( 
                  name: "Pendrive", 
                  description: "Pendrive is useful storage medium", 
                  price: 100, 
                  image: "pendrive.png"
               ), 
               ProductBox(
                  name: "Floppy Drive", 
                  description: "Floppy drive is useful rescue storage medium", 
                  price: 20, 
                  image: "floppy.png"
               ), 
            ],
         )
      );
   }
}
class ProductBox extends StatelessWidget {
   ProductBox({Key key, this.name, this.description, this.price, this.image}) :
      super(key: key); 
   final String name; 
   final String description; 
   final int price; 
   final String image; 
   
   Widget build(BuildContext context) {
      return Container(
         padding: EdgeInsets.all(2), 
         height: 120, 
         child: Card(
            child: Row(
               mainAxisAlignment: MainAxisAlignment.spaceEvenly, 
               children: <Widget>[ 
                  Image.asset("assets/appimages/" + image), 
                  Expanded( 
                     child: Container( 
                        padding: EdgeInsets.all(5), 
                        child: Column(    
                           mainAxisAlignment: MainAxisAlignment.spaceEvenly, 
                           children: <Widget>[ 
                              Text(
                                 this.name, style: TextStyle(
                                    fontWeight: FontWeight.bold
                                 )
                              ),
                              Text(this.description), Text(
                                 "Price: " + this.price.toString()
                              ), 
                           ], 
                        )
                     )
                  )
               ]
            )
         )
      );
   }
}
```

# Flutterの学習方法

* [GitHub](https://github.com/flutter/flutter)
* [docs](https://docs.flutter.dev/)
* [Flutter Samples](https://flutter.github.io/samples/#)
* [Flutter Gallary](https://gallery.flutter.dev/)
* [freeCodeCamp](https://www.freecodecamp.org/)

GitHub-Flutterの公式リポジトリやIssues、Flutterエンジンのリポジトリを閲覧することで開発時に起こるフレームワークが原因の不具合のヒントを得られる。

Flutter開発では、主にこれら５つのドキュメントを中心に進める。

# 参考サイト

[Flutter - Introduction to Layouts](https://www.tutorialspoint.com/flutter/flutter_introduction_to_layouts.htm)