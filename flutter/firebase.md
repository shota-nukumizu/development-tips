# Firebaseとは

Firebaseとは、Googleが提供しているバックエンド環境を提供するサービス。

データのリアルタイム同期など、iOSやAndroidなどのモバイルアプリやWebアプリケーションの開発に応用できる。

# 主な特徴

## Firebase Realtime Database

Realtimeでデータを保存して同期できる

## Google Analytics for Firebase

最大で500種類のイベントに関するレポートを無制限に作成できるサービス。

## Firebase Hosting

Webサイトを公開するためのホスティングサービス。

レンタルサーバに登録せずに、実際にWebサイトを公開できる。独自ドメインの設定もできる。

## Firebase Authentication

ユーザ認証機能を提供し、ユーザ情報をクラウドで保存してくれる。

様々な認証に対応。

# Firebaseでデプロイする

1. Googleアカウントでログイン
2. プロジェクトの名前を半角英数字で入力
3. 続行をクリック
4. プロジェクトを作成
5. `firebase init`と入力してプロジェクトを初期化する
6. `Hosting setup`を選択
7. `firebase deploy`へ

都度GitHubとの連携がある。

# firebaseオブジェクト

```js
import firebase from “firebase”;

const firebaseConfig = {
    apiKey: "adfasfavnaAJFDKCnjkasjlkASJLFNKSA",
    authDomain: "myapp-d92bc.firebaseapp.com",
    projectId: "myapp-d92bc",
    storageBucket: "myapp-d92bc.appspot.com",
    messagingSenderId: "15645156456156",
    appId: "1:15645156456156:web:1516532e652c5459f5f6b44",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;
```