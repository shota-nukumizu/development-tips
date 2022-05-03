# Django REST Frameworkでチャットアプリ開発(バックエンド)

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

## `serializer`の作成

`serializer`は、クエリセットやモデルインスタンスなどの複雑なデータをPythonのネイティブなデータ型に変換し、JSONやXMLなどのコンテンツタイプに簡単にレンダリングできるようにする。`serializer`はデシリアライゼーションも提供し、入力されたデータを最初に検証した後、parse(解析)されたデータを複雑な型に変換することができる。

`ChatApp/chat/serializer.py`

```py
from django.contrib.auth.models import User
from rest_framework import serializers
from chat.models import Message
# 
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """For Serializing User"""
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'password']
# 
# Message Serializer
class MessageSerializer(serializers.ModelSerializer):
    """For Serializing Message"""
    sender = serializers.SlugRelatedField(many=False, slug_field='username', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='username', queryset=User.objects.all())
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'message', 'timestamp']
```

それでは、ひとつずつ見ていきましょう...。

`serializer`クラスを利用するために、`rest_framework`から`serializer`をインポートしています。

ModelSerializerクラスは、Modelのフィールドに対応するフィールドを持つSerializerクラスを自動的に作成できるショートカットを提供する。

UserSerializerでは、GETリクエスト時に表示されるパスワードを取得しないように、`password`を`write_only`で指定しています。新しいユーザを作成する場合、POSTリクエストの時だけ必要です。

Messageの送り手と受け手は`SlugRelatedField`としてシリアライズし、リレーションシップの対象を対象のフィールドで表現しています。フィールドはslug_fieldとして指定する。**また、`many`という引数を取り、リレーションが多対多であるかどうかを識別する。メッセージは単一の送信者と受信者のみを含むことができるため、`false`を指定。**`query`引数は、関連するオブジェクトを選択するためのオブジェクトのリストを取る。

その後は、設計した`serializer`に対する`view`を記述していく。

## `view`

### UserView

`Chatapp/chat/views.py`

```py
from django.contrib.auth.models import User                                # Django Build in User Model
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer, UserSerializer # Our Serializer Classes
# Users View
@csrf_exempt                                                              # Decorator to make the view csrf excempt.
def user_list(request, pk=None):
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        if pk:                                                                      # If PrimaryKey (id) of the user is specified in the url
            users = User.objects.filter(id=pk)              # Select only that particular user
        else:
            users = User.objects.all()                             # Else get all user list
        serializer = UserSerializer(users, many=True, context={'request': request}) 
        return JsonResponse(serializer.data, safe=False)               # Return serialized data
    elif request.method == 'POST':
        data = JSONParser().parse(request)           # On POST, parse the request object to obtain the data in json
        serializer = UserSerializer(data=data)        # Seraialize the data
        if serializer.is_valid():
            serializer.save()                                            # Save it if valid
            return JsonResponse(serializer.data, status=201)     # Return back the data on success
        return JsonResponse(serializer.errors, status=400)     # Return back the errors  if not valid
```

### MessageView

```py
@csrf_exempt
def message_list(request, sender=None, receiver=None):
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        messages = Message.objects.filter(sender_id=sender, receiver_id=receiver)
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
```

上記のビューはUserビューとほとんど同じですが、URLパラメータとしてsenderとreceiverを必要とします。送信者と受信者は、メッセージに関連付けられたユーザーのIDを期待する。

`ChatApp/urls.py`を作成する

```py
urlpatterns = [
    ...
    path('', include('chat.urls')), # これがないと機能しない
]
```

`chat/urls.py`を新規作成

```py
from django.urls import path
from . import views
urlpatterns = [
    # URL form : "/api/messages/1/2"
    path('api/messages/<int:sender>/<int:receiver>', views.message_list, name='message-detail'),  # For GET request.
    # URL form : "/api/messages/"
    path('api/messages/', views.message_list, name='message-list'),   # For POST
    # URL form "/api/users/1"
    path('api/users/<int:pk>', views.user_list, name='user-detail'),      # GET request for user with id
    path('api/users/', views.user_list, name='user-list'),    # POST for new user and GET for all users list
]
```

以下のコマンドで管理者を作成する。

```
./manage.py createsuperuser
```

管理サイトでデータを編集できるように、`chat/admin.py`を編集する

```py
from django.contrib import admin
from chat.models import Message

admin.site.register(Message)
```

あとはAPIをテストする際にcurlコマンドを入力する

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

[[Part 2] Simple Chat Application using DjangoRestFramework - steemit](https://steemit.com/utopian-io/@ajmaln/part-2-simple-chat-application-using-djangorestframework)