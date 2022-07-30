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

# 参考記事

* [Building a CRUD App with FastAPI and MongoDB](https://testdriven.io/blog/fastapi-mongo/)