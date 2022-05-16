# FastAPI

FastAPIとは、モダンで高速なAPIを開発するためのPython製Webフレームワークである。パフォーマンスはGoやNodeに匹敵するレベル。MicrosoftやNetflixなどの世界有数の企業がFastAPIを導入している。

# インストール

```powershell 
pip install fastapi uvicorn
```

# `Hello World`文字列の表示

`app.py`ファイルを作成する。

```py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

以下のコマンドで実行すれば開発者サーバが立ち上がる。

```powershell
uvicorn app:app -- reload
```


# 参考サイト

* [FastAPI Docs](https://fastapi.tiangolo.com/)
* [FastAPI: The Modern Age API Framework For Pythonista](https://medium.com/analytics-vidhya/fastapi-the-modern-age-api-framework-for-pythonista-4b2cd1e6652)