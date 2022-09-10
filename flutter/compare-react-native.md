# FlutterとReact Nativeの徹底比較

# はじめに

今回の記事の対象者は、主に以下の通りである。

* モバイルアプリ開発者
* Flutterの特徴やできることを知りたい人
* Flutter以外にもモバイルアプリを開発する方法を知りたい人
* モバイルアプリの開発に関する案件を検討していて技術を選定されている人
* FlutterとReact Nativeの違いを詳しく知りたい人

# クロスプラットフォーム開発とは

FlutterとReact Nativeの違いを解説する前に、クロスプラットフォームに関する理解を深めておく必要がある。

クロスプラットフォーム開発とは、AndroidやiOS両方に対応したアプリを開発する手法を意味する。クロスプラットフォーム開発の最大の強みは、単一のプログラミング言語でAndroidやiOS両方に対応したアプリを開発できることである。

１つのプログラミング言語で複数のOSに対応したアプリを開発できることは、データベースアクセスや通信処理などのロジック部分のコードを共通化できることに繋がる。これによって、開発にかかる時間や費用などの工数を大幅に削減できる。

FlutterはDart言語、React NativeはJavaScriptで開発されている。

# Flutterとは

FlutterはGoogleが開発したクロスプラットフォームのUIフレームワークである。情報量が非常に豊富で、かつFlutterに関係するコミュニティ活動が活発なので世界で最も人気のあるフレームワークの１つに数えられる。

# React Nativeとは

React NativeはFacebookが開発したクロスプラットフォームのフレームワークである。React NativeはJavaScriptで開発されているゆえ、Web開発者がモバイルアプリの開発に対する難易度を下げてくれる。

もしあなたがTypeScriptに関する知識や経験があれば、React Nativeを使ったモバイルアプリの開発の難易度はそこまで高くないだろう。

# 両者の共通点と違い

## ドキュメント

FlutterとReact Nativeは両方とも公式ドキュメントが非常に充実しています。公式ドキュメントやチュートリアルが充実しているので、開発者は簡単にアプリを開発できます。

## プログラミング言語

FlutterはDart言語、React NativeはJavaScriptで開発されている。

JavaScriptはもともと動的型付け言語である。言い換えれば、JavaScriptでは様々なデータの型や値を自由に変更できる。一方で、Dart言語は動的型付けと静的型付け両方の特徴を兼ね備えているので、両方のメリットを取り入れられる。

## UI

FlutterはUI構築にウィジェットスタイルを採用している一方で、React NativeはJavaScriptとJSXを採用している。

Flutterのウィジェットはデフォルトで用意されているので、何も変更しない限りはカスタムでウィジェットを作る必要はない。一方で、React Nativeにはデフォルトで用意されているウィジェットがない。それゆえ、自分でUIを設計する必要がある。

## パフォーマンス

FlutterとReact Nativeのどちらがパフォーマンスで優れているかどうかは判断するのは難しい。開発するアプリの種類、コードベース、アニメーション、トランジション、アプリのサイズやレイアウトなど考慮するべき要素がたくさんあるからだ。

両者ともオープンソースで、無料で使うことができる。両者もホットリロードを採用しており、変更内容を即座に確認できるので効率的にアプリを開発できるのだ。

# サンプルコード

## Flutter

`main.dart`ファイルはアプリケーションの主要なファイルで、アプリケーションの異なるビューのための異なるルートを決定するものだ。`HomeScreen`ウィジェットでアプリケーションの初期ビューを決定し、`ProfileScreen`という別のルートで、ユーザのActionに基づいてトリガーできる。

```dart
import 'package:flutter/material.dart';
import 'package:social_app/screens/home_screen.dart';
import 'package:social_app/screens/profile_screen.dart';

void main() {
  runApp(Social());
}

class Social extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: HomeScreen.id,
      routes: {
        HomeScreen.id: (context) => HomeScreen(),
        ProfileScreen.id: (context) => ProfileScreen(),
      },
    );
  }
}
```

## React Native

他のReactアプリケーションと同様に、`App.js`コンポーネントがエントリポイントになり、ルートとビュー、`HomeScreen`と`ProfileScreen`を定義する。

Flutterアプリと同様に、`HomeScreen`はユーザが見る最初のルートである。

```js
// Import statements for the components used in the app and the navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
// The main component with all of the screen routing business logic
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ gestureEnabled: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Social' }} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Social' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
```

# 結論：あなたはFlutterそれともReact Nativeを使うべき？

個人的にはFlutterをオススメする。JavaScriptあるいはTypeScriptが得意な人で、学習コストを最低限にして効率よくアプリを開発したいならばReact Nativeのほうがいいだろう。