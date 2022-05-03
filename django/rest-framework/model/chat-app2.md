# Django REST Frameworkでチャットアプリ開発

# インストール

```powershell
pip intsall django djangorestframework django-widget-tweaks
```

* `django`：DjangoでWeb開発するなら必須
* `djangorestframework`：DjangoでAPI開発するなら必須
* `django-widget-tweaks`：`template`内のフォームフィールドをレンダリングするためによく使われる。これを使うことで`template`を書き換えずにバックエンドでフォームのプロパティを調整できるようになる。

# 使用技術(Django以外)

* [MaterializeCSS](https://materializecss.com/)
* [jQuery](https://jquery.com/) - Ajax通信に活用する

# ディレクトリ

```
ChatApp
├── ChatApp
├── chat
├── chat-env
├── manage.py
```

# セットアップ

## `model`

`ChatApp/chat/models.py`

```py
from django.contrib.auth.models import User
from django.db import models
class Message(models.Model):
     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')        
     receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')        
     message = models.CharField(max_length=1200)
     timestamp = models.DateTimeField(auto_now_add=True)
     is_read = models.BooleanFeild(default=False)
     def __str__(self):
           return self.message
     class Meta:
           ordering = ('timestamp',)
```

順番は、タイムスタンプに従うように設定される。つまり、最新のメッセージがリストの最後になる。

ユーザを管理するために、Django の組み込みモデルである User モデル を利用する。私たちの基本的なアプリケーションでは、`username`フィールドと`password`が必要なだけだ。

`settings.py`

```py
# INSTALLED_APPSに必要なアプリを書き込むことを忘れないように。
# これを忘れるだけでアプリがクラッシュする。
INSTALLED_APPS = [
    .
    .
    'widget_tweaks',
    'rest_framework',
    'chat'
]
```

以下のコマンドでマイグレート。

```
./manage.py makemigrations
./manage.py migrate
```

# 注

`rendering`(レンダリング)：何らかの抽象的なデータ集合を基に、一定の処理や演算を行って画像や映像、音声などを生成すること

Ajax(Asynchronous JavaScript + XML)：**ページ遷移せずにページを読み込める仕組み**。非同期通信の応用。

```html
<!--HTML✕Ajaxのサンプルページ-->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ajax Sample1</title>
</head>
<body>
  <button id="button">送信</button>
  <div><br></div>
  <div id="result">送信ボタンをクリックしてください。Ajax通信します。</div>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script>
  // jQuery
  $(function(){
    $("#button").click(function(event){
      $.ajax({
        type: "GET",
        url: "ajax_test.html",
        dataType : "html"
      })
      // Ajaxリクエストが成功した場合
      .done(function(data){
        $("#result").html(data);
      })
      // Ajaxリクエストが失敗した場合
      .fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert(errorThrown);
      });
    });
  });
  </script>
</body>
</html>
```

# 参考サイト

[How to customize Django forms using Django widget tweaks - educative](https://www.educative.io/edpresso/how-to-customize-django-forms-using-django-widget-tweaks)

[[Part-1] Creating a Simple Chat App with DjangoRestFramework - steemit](https://steemit.com/utopian-io/@ajmaln/part-1-creating-a-simple-chat-app-with-djangorestframework)