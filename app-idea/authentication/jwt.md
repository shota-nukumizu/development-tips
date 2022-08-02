# JWT(JSON Web Token)

JWTとは、JSONベースのデータを暗号化して作られる文字列で、認証や認可のための仕組みとしてWebアプリケーションなどで用いられる技術。

# 通常のトークン認証との違い

通常のトークン形式の認証では、トークンの正当性を確認するためにサーバへ問い合わせる必要がある。JWTでは、公開鍵を使ってクライアント側でトークンの正当性を確認できるという特徴がある。トークンはオフラインで正当性が保証されるので、逆に一度発行したトークンが困難であるというデメリットも存在する。

また、通常のトークンがそれ自体ではまったく意味を持たないケースが大半であることに対して、JWTはそれ自体が情報を持つ。このため、JWTの内部に個人情報を含めることは推奨されない。

# JWTの生成

```js
const crypto = require('crypto')

const base64 = json => {
    const jsonStr = JSON.stringify(json)
    const jsonB64 = Buffer.from(jsonStr).toString('base64')
    const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '')
    return jsonB64NoPadding
}

const HMAC_SHA256 = (key, data) => {
    const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
    const hashNoPadding = hash.replace(/={1,2}$/, '')
    return hashNoPadding
}

const header = { alg: 'HS256', typ: 'JWT' }
const payload = { sub: '1234567890', iat:1516239022 }
const key = 'secret'
const unsignedToken = `${base64(header)}.${base64(payload)}`
const signature = HMAC_SHA256(key, unsignedToken)
const jwt = `${unsignedToken}.${signature}`

console.log(jwt)
```

出力結果

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
t42p4AHef69Tyyi88U6+p0utZYYrg7mmCGhoAd7Zffs
```

# JWTの検証

```js
const crypto = require('crypto')

const HMAC_SHA256 = (key, data) => {
    const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
    const hashNoPadding = hash.replace(/={1,2}$/, '')
    return hashNoPadding
}

const key = 'secret'
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.t42p4AHef69Tyyi88U6+p0utZYYrg7mmCGhoAd7Zffs'

const splits = jwt.split('.')
const unsignedToken = [splits[0], splits[1]].join('.')
const signature = splits[2]

console.log(HMAC_SHA256(key, unsignedToken) === signature)
```

出力結果

```
true
```

# JWTで新規登録する際

## ユーザ登録

1. `name-hoge`、`password=hoge`に設定し、`/register`に`POST`リクエスト
2. APサーバはデータベースに新規登録をリクエスト
3. データベースはユニークなIDを設定しつつ、`name`と`password`を登録
4. DBはAPサーバに対してユーザIDを出力する
5. APサーバは、ユーザIDと秘密鍵によってTokenを生成する
6. APサーバはユーザにTokenを返す

## ユーザ情報のリクエスト

1. `Authorization`にJWTを設定し、`/user`に`GET`リクエストを送る
2. APサーバは秘密鍵を用いてTokenを検証する
3. APサーバはTokenからユーザIDを取得する
4. APサーバはデータベースに対してIDに対するユーザ取得をリクエストする
5. データベースはIDに対するユーザ情報を返す
6. APサーバはユーザにユーザ情報を返す


# 参考

* [【JWT】 入門 - Qiita](https://qiita.com/knaot0/items/8427918564400968bd2b)
* [JWT の仕組み - Zenn](https://zenn.dev/mikakane/articles/tutorial_for_jwt)