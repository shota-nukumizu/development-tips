# Djangoにおける`view`の書き方

`view`関数とは、Webリクエストを受け取ってWebレスポンスを返すPythonの関数。何でもデータを返すことができる優れもの。`view`自体には、そのレスポンスを返すために必要な任意のロジックが含まれている。慣例的には`views.py`に記述する。

次のプログラムは簡単な`view`である。

```py
# 自国を表示するだけの簡単なプログラム
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
```

**非同期通信を行う際には、予約語`def`の前に`async`を置く。**

```py
import datetime
from django.http import HttpResponse

async def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s.</body></html>' % now
    return HttpResponse(html)
```

# 参考

[Writing views - Django Document](https://docs.djangoproject.com/en/4.0/topics/http/views/)