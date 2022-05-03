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

# フロントエンド構築

【主な手順】

* フロントエンドの`view`を作成する
* `view`のテンプレートを設計する
* Django REST Frameworkを通じて、jQueryのAjax通信でリアルタイムにデータベースにアクセスする

**フロントエンドを構築する前に、HTMLテンプレート用のフォルダとCSSやJSなどの静的ファイル用のフォルダを用意する必要がある。**

`settings.py`

```py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,  'templates')], /*We added the templates folder in our project's base directory*/
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

ディレクトリ構造は以下の通り

```
ChatApp
├── ChatApp
├── chat
├── db.sqlite3
├── manage.py
├── static
└── templates
```

MaterializeCSSファイルをダウンロード

次のようなディレクトリになるように、`static`フォルダにコンテンツを展開する

```
static
├── css
│   ├── materialize.css
│   ├── materialize.min.css
│   └── style.css  //For custom styles (Not a part of MaterializeCSS)
├── fonts
│   └── roboto
└── js
    ├── chat.js  //For custom scripts (Not a part of MaterializeCSS)
    ├── materialize.js
    └── materialize.min.js
```

フロントエンドを構築する上で必要なことはざっくり以下の３つ。

* ユーザ認証と登録
* チャットを表示するページ

## ユーザ認証と登録

`chat/views.py`

以下のモジュールをインポートする

```py
from django.contrib.auth import authenticate, login #Django's inbuilt authentication methods
from django.contrib.auth.models import User #Inbuilt User model
from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from chat.models import Message
from chat.serializers import MessageSerializer, UserSerializer
```

ログインページを実装。

```py
# chat/views.py
def index(request):
    if request.user.is_authenticated: #If the user is authenticated then redirect to the chat console
        return redirect('chats')
    if request.method == 'GET':
        return render(request, 'chat/index.html', {})
    if request.method == "POST": #Authentication of user
        username, password = request.POST['username'], request.POST['password'] #Retrieving username and password from the POST data.
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
        else:
            return HttpResponse('{"error": "User does not exist"}')
        return redirect('chats')
```

ルーティングに新規で上記の`view`を追加(`chat/urls.py`)

```py
ChatApp/chat/urls.py

urlpatterns = [
     ...    
     path('', views.index, name='index'),
]
```

基本となるテンプレートをここで表示する(`templates/chat/index.html`)

```html
{% load staticfiles %} (html comment removed: Django template tag for loading static files)
  <!DOCTYPE html>
  <html>
    <head>
      (html comment removed: Import Google Icon Font)
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        (html comment removed: Import materialize.css)
        <link type="text/css" rel="stylesheet" href="{% static 'css/materialize.min.css' %}"  media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="{% static 'css/style.css' %}"  media="screen,projection"/>
      (html comment removed: Let browser know website is optimized for mobile)
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      (html comment removed: Import jQuery before materialize.js)
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="{% static 'js/materialize.min.js' %}"></script>
        <script type="text/javascript" src="{% static 'js/chat.js' %}"></script>
    </head>
    <body>
    {% block body %}
        <div class="section blue lighten-3">
            <div class="container white-text center-align text">
            <h2>Chat</h2>
            <p>A simple Chat App using DjangoRestFramework</p>
            <div class="chip">
                <img src="https://opbeat.com/docs/static/images/stacks/logo_django_alt.svg" class="white">
                Django
            </div>
            <div class="chip">
                <img src="http://materializecss.com/res/materialize.svg" class="white">
                MaterializeCSS
            </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
            <div class="col s12 m8 l6 offset-m2 offset-l3">
                <div class="section center-block">
                <div>
                    {% block form %}
                    <h3>
                    Login
                    </h3>
                    <form id="login-form" class="form-group" method="post">
                        {% csrf_token %}
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="username" id="id_username" type="text">
                                <label for="id_username">Username</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="password" id="id_password" type="password">
                                <label for="id_password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s8">
                                <a href="{% url 'register' %}">Register</a>
                            </div>
                            <div class="col s4">
                            <div class="right">
                                <button class="btn blue waves-effect waves-light pull-s12">Login</button>
                            </div>
                            </div>
                        </div>
                    </form>
                    {% endblock %}
                </div>
            </div>
            </div>
            </div>
        </div>
        {% endblock %}
    </body>
  </html>
```

更に追加で登録`view`を作成

```py
# Simply render the template
def register_view(request):
    if request.user.is_authenticated:
        return redirect('index')
    return render(request, 'chat/register.html', {})
```

ルーティング

```py
urlpatterns = [
    ...
    path('register', views.register_view, name='register'),
]
```

HTMLに反映させる

`templates/chat/register.html`

```html
{% extends 'chat/index.html' %} (html comment removed:  Extending index.html )
{% block form %} (html comment removed:  Overriding block form )
    <h3>
    Register
    </h3>
    <form id="register-form" class="form-group">
        {% csrf_token %}
        <div class="row">
            <div class="input-field col s12">
                <input name="username" id="id_username" type="text" class="validate invalid">
                <label for="id_username" data-error="Username already taken">Username</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input name="password" id="id_password" type="password">
                <label for="id_password">Password</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input name="password2" id="id_password2" type="password">
                <label for="id_password2">Repeat Password</label>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
            <div class="right">
                <button class="btn blue waves-effect waves-light pull-s12">Register</button>
            </div>
            </div>
        </div>
    </form>
    <script>
    //Script for validating user registration.
    $(function () {
        $('#register-form').on('submit', function (event) {
            event.preventDefault(); //Prevent the default behavior on submit.
            var username = $('#id_username').val();
            var password;
            if(username !== '') //Check if username in not blank
            {
                password = $('#id_password').val();
                if(password !== '' && password === $('#id_password2').val()) //Check if password is not blank and matches with the confirmation.
                {
                    register(username, password); //Calling register function, which we will define in 'chat.js'
                }
                else{
                    alert("The passwords doesn't match!");
                }
            }
            else
                alert("Please enter a valid username!");
        })
    })
    </script>
{% endblock %}
```

▼JS部分。**これがないとログインページでの誤った入力に対する処理を表示できない。地味だけど意外と重要。**

```js
$(function () {
    $('#register-form').on('submit', function (event) {
        event.preventDefault(); //Prevent the default behavior on submit.
        var username = $('#id_username').val();
        var password;
        if(username !== '') //Check if username in not blank
        {
            password = $('#id_password').val();
            if(password !== '' && password === $('#id_password2').val()) //Check if password is not blank and matches with the confirmation.
            {
                register(username, password); //Calling register function, which we will define in 'chat.js'
            }
            else{
                alert("The passwords doesn't match!");
            }
        }
        else
            alert("Please enter a valid username!");
    })
})
```

## チャットを表示するページ



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