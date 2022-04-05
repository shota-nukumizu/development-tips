# 現在開発中のアプリのアイデア

* 文房具サブスクサービス
* スクリーンタイムアプリ「TimeTrack」
* 「Whatsapp」形式のチャットアプリ
* タスク管理アプリ
* Web開発用の専門メディア(主にDjango RESTFramework、TypeScriptとFlutter開発メイン)
* ポモドーロテクニックとTodoアプリをの機能を併せ持ったWebアプリ・スマホアプリ
* Discordクローン
* Stackoverflowクローン
* 読書共有サービス(仮)

全体的にシンプルなUI設計を検討している。ちなみにほとんどAndroidとWebでリリースすることを検討中...

## 文房具サブスクサービス

好きな文房具の種類を自由にチョイスできるサブスクサービス。月額数千円で文房具を使いたい放題。

* 会員登録(Googleアカウント対応)
* プランを選定する
* 文房具をカテゴリー別に分類できる
* Stripe決済
* 基本的な操作は他のeコマースサイトと全く同じ
* シンプルなUI

Webアプリで運用する予定。主に使用する技術はDjango REST FrameworkとNuxt。


## スクリーンタイムアプリ「TimeTrack」

その日一日の自分のスマホ使用時間を計測できるスクリーンタイムアプリ。Androidのデータ使用時間のUIを利用しようか考えている。

WebやAndroid両方でリリースする予定。Flutterで開発か？


## 「Whatsapp」形式のチャットアプリ

「Whatsapp」形式でチャットアプリを開発中。フルスタックに関する質問とその回答を提供できるWebサービスを開発中。

Django REST Framework✕Flutterで開発。


## タスク管理アプリ

個人専用のタスク管理アプリ。TodoistやTicktickを参考に検討。(WebやAndroid両方でリリース)

検討中の案としては、

* カレンダーにTodoタスクを書き込む
* 一日に書き込めるタスクの上限を設定できる。上限を上回るタスクの数を設定した場合、「これ以上は設定できません」と表示する
* 今日のタスク一覧を通知で設定する
* タスクをカテゴリー別に分類できる
* 予め会員登録しておく必要がある(Google, TwitterあるいはFacebookログイン対応)


## Web開発専用の専用メディア

Python、TypeScript、Dartをメインに情報発信する予定。


## ポモドーロ・テクニック✕Todoアプリの機能を併せ持ったWebアプリ・スマホアプリ

WebやAndroid両方ともリリースする予定。


## Discordクローン

NestJS✕Nuxtで開発予定


## Stackoverflowクローン

Next✕Nestで開発予定

## 読書共有サービス

読んだ本を共有したり、その感想やまとめをブログ形式で共有したりできるサービス。

Nest✕Next✕Tailwindで開発予定

# 使用技術

* Django REST Framework
* TypeScript
* Flutter
* Firebase
* SQLite
* MongoDB

主にマイクロサービスやスマホアプリメインで開発を進めていく。