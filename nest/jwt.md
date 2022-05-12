# NestJSでJWT認証

NestJSを利用したJWT認証の方法を詳細に解説していく。(認証はアプリ開発においては非常に重要な要素)

## JWT認証とは

JWT(`JSON Web Token`)とは、JSON形式で表現された認証情報などをURL文字列などとして安全に送受信できるように符号化やデジタル署名の仕組みを規定した標準規格。

* ヘッダー(`header`)
* ペイロード(`payload`)
* 署名(`signature`)

これら３つの部分に分かれており、これらをそれぞれbase64URL方式で符号化して「.」(ピリオド)で連結したものがトークン(`token`)だ。

# NestJSにおける認証(`Authentication`)

**認証(`Authentication`)は殆どのアプリケーションで必要不可欠な要素である。**どのようなプロジェクトでどのようなアプローチを取るのかは、そのアプリケーション独自の要件に依存する。

NestJSでJWT認証を実装する際には以下の2つの要件が必要。

* ユーザ名とパスワードで認証させる。認証後はJWTを返す。このJWTでアプリケーションを呼び出す。
* 有効なJWTを使ってアクセスできるAPIルートを実装する。

以下のような感じでNestJSでJWT認証を実装する。

# インストール

```powershell
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

* `@nestjs/jwt`：JWTの操作を支援するパッケージ。
* `passport-jwt`：JWTのロジックを実装する際に必要。
* `@types/passport-jwt`：開発を容易にする際に必要な型定義を提供。

# 参考サイト

[How to implement NestJS JWT Authentication using JWT Strategy?](https://progressivecoder.com/how-to-implement-nestjs-jwt-authentication-using-jwt-strategy/)