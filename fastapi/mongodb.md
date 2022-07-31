# FastAPIでMongoDBを動かす

# 大まかな流れ

1. FastAPIでREST APIを開発する
2. 非同期通信でMongoDBと連携する
3. MongoDB AtlasでMongoDBを動かす
4. FastAPIをHerokuにデプロイする

# セットアップ

```
mkdir fastapi-mongo
cd fastapi-mongo 
```

```
$ python3.9 -m venv venv
$ source venv/bin/activate
$ export PYTHONPATH=$PWD
```

以下のようにディレクトリを作成する。

```
├── app
│   ├── __init__.py
│   ├── main.py
│   └── server
│       ├── app.py
│       ├── database.py
│       ├── models
│       └── routes
└── requirements.txt
```

`requirements.txt`に以下の内容を記入

```
fastapi==0.73.0
uvicorn==0.17.4
```

以下のコマンドでインストールする

```
(venv)$ pip install -r requirements.txt
```

`app/main.py`でアプリケーションを動かすためのエントリーポイントを定義する

```py
import uvicorn

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)
```

ここでは、ポート8000でUvicornサーバを実行してファイル変更のたびにリロードするようにファイルに命令した。エントリーポイントからサーバを起動する際に`app/server/app.py`にベースとなるルートを設定する。

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
```

エントリーポイントを以下のコマンドで実行する。

```py
(venv)$ python app/main.py
```

`localhost:8000`にアクセスすれば以下のJSONレスポンスが返答される

```json
{
  "message": "Welcome to this fantastic app!"
}
```

# スキーマ

データがMongoDBに保存される方法を表す、データの基盤となるスキーマを定義してみよう。

```py
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class StudentSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    course_of_study: str = Field(...)
    year: int = Field(..., gt=0, lt=9)
    gpa: float = Field(..., le=4.0)

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@x.edu.ng",
                "course_of_study": "Water resources engineering",
                "year": 2,
                "gpa": "3.0",
            }
        }


class UpdateStudentModel(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    course_of_study: Optional[str]
    year: Optional[int]
    gpa: Optional[float]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@x.edu.ng",
                "course_of_study": "Water resources and environmental engineering",
                "year": 4,
                "gpa": "4.0",
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message
```

上記のプログラムでは、`StudentSchema`というスキーマを定義した。これは、生徒のデータをMongoDBデータベースに保存する方法を表すものである。

このスキーマでは、ユーザがAPIに対して適切な形でHTTPリクエストを送信するのに役立つ。

# MongoDB

このセクションでは、MongoDBとFastAPIを連携させる方法を解説する。

## セットアップ

インストール後、ガイドに従ってmongodデーモンプロセスを実行する。これが終了したら、`mongo`シェルコマンドでインスタンスに接続し、MongoDBが稼働しているかどうかを確認できる。

```
mongo
```

本チュートリアルではMongoDB Community Edition v5.0.6を使っている。

```bash
$ mongo --version

MongoDB shell version v5.0.6

Build Info: {
    "version": "5.0.6",
    "gitVersion": "212a8dbb47f07427dae194a9c75baec1d81d9259",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

## Motorのセットアップ

データベースとやり取りするための非同期MongoDBドライバであるMotorを設定する。まずは、要件ファイルに依存関係を追加する。

# 参考記事

* [Building a CRUD App with FastAPI and MongoDB](https://testdriven.io/blog/fastapi-mongo/)