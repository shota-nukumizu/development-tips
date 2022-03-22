# MERNとは

MERNとは、

* MongoDB―ドキュメント指向のデータベース
* Express―NodeのWebフレームワーク
* React―フロントエンドのフレームワーク(JavaScript)
* Node.js―JavaScriptのWebサーバ

これらの４つの言葉の頭文字をとったもの。フルスタックの新しいアプローチ。

## フロントエンドをReactで開発

Reactはシンプルなコンポーネントで複雑なUIを構築し、バックエンドと連携してHTMLとしてレンダリングできる。

Reactはステートフル(システムが現在の状態を表すデータなどを保持しており、その内容を処理に反映させる)なデータ駆動型のUIを最小限のコードと最小限の手間で処理することが得意。**フロントエンド開発に必要な機能を一式揃えているのが特徴。**

## バックエンドをNode.jsとExpressで開発

ExpressはNodeのフレームワークで、ルーティングとHTTPリクエストとそのレスポンスを処理するための強力なモデルを持っている。

ReactからXML形式のHTTPリクエストあるいは`GET`や`POST`を実行すると、アプリケーションを動かすExpressの関数に接続できる。これらの関数はコールバックや`Promise`を活用して、MongoDBの`Node.js`ドライバを使用し、MongoDBデータベースのデータにアクセスして更新できる。

## データベースをMongoDBで処理

**アプリケーションが何らかのデータを保存する場合はデータベースが必要になる。**

Reactで作成したJSONはExpressサーバに送られ、そこでMongoDBが直接JSONを処理する。(**MongoDBはSQLを使わないので、直接JSON形式でデータを抽出できるのが最大の強み**)

# MERNを選ぶ理由

最大の特徴：すべてがJavaScript(TypeScript)とJSONで構成されているので、開発が簡単。**特にMongoDBはNodeとの相性が抜群でアプリケーションの各層でJSONの保存や操作、表示が驚くほど簡単。データはJSON形式でやり取りされる。**

MERNは特にReactやExpressの開発者にとってはWeb開発の最適解かもしれない。



# 参考サイト

[MERN Stack Social Media App - Javascript Mastery](https://www.youtube.com/watch?v=VsUzmlZfYNg&list=WL&index=1&t=17s)

[MERN Stack Explained - MongoDB](https://www.mongodb.com/mern-stack)