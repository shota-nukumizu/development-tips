# Django REST Frameworkにおける認証(`authentication`)

* Basic認証
* Cookie認証
* トークン認証
* リモートユーザ認証(Webサーバに認証を委譲し、その結果として環境変数が設定されていればそのユーザを認証できるものとみなす)
* JWT認証(デフォルトではサポートされていないが、トークン認証の１つ)

## Basic認証

トークンとして、ユーザ名(`USERNAME_FIELD`で指定したフィールド)とパスワードをBase64でエンコードしたものを利用する。トークンはWebブラウザの内部に保存され、リクエストのたびにリクエストヘッダに書き込まれ自動送信される。

そのためCSRF(Cross Site Request Forgeries)認証が必須になるが、**そもそもユーザ名とパスワードなどの機密情報が簡単に複合できる**のでWebアプリの認証方式としては採用できない。

## Cookie認証

管理サイトなど、通常のDjangoでも採用されている認証方式。サーバ側の「セッション」(`session`と呼ばれる保存領域)にユーザのセッション情報を保存し、それを特定するためのID(セッションID)をWebブラウザ側のCookieに保存する。

その後、リクエストヘッダにセッションIDをセットして毎回送信することでサーバ側でユーザのログイン状態を管理する。

## トークン認証

トークン認証とは、後述するJWT認証と合わせてSPAの認証方式として最もポピュラーなアプローチ。Django REST Frameworkのトークン認証では、サーバ側のデータベースにユーザに1対1で紐づくトークンを発行し保存することで、ユーザのログイン状態を把握できる。**データベースのマイグレートが必要。**トークンをCookieに保存する必要はない。

# DRFにおける認証(`authentication`)

**DRFにおける認証スキームは、常にクラスのリストとして定義されている。DRFはリストの各クラスで認証を試み、認証に成功した最初のクラスの返り値を使用して`request.user`と`request.auth`を設定する。**

認証に成功したクラスがない場合は、`request.user`にha
`django.contrib.auth.models.AnonymousUser`のインスタンスが設定されて、`request.auth`には`None`が設定される。

認証されないリクエストに対する`request.user`と`request.auth`の値は、`UNAUTHENTICATED_USER`と`UNAUTHENTICATED_TOKEN`の設定を利用して変更できるのだ。

## 例

`settings.py`

```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

また、`APIView`のクラスベースの`View`を使用して、`View`単位または`ViewSet`単位で認証スキームを設定できる。

```py
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)
```

あるいは、関数ベースで`@api_view`をデコレートして実装する方法もある。

```py
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    return Response(content)
```

## 許可されていない、あるいは禁止されている場合のレスポンス(401エラーと403エラー)

どのような応答をするかは、認証スキームに依存する。複数の認証方式を使うことはもちろんできるが、レスポンスの種類を決定するために使えるのは一つの方式のみ。

レスポンスの種類を決定する際には、`View`に設定された最初の認証クラスが使われる。**ただし、リクエスト認証に成功してもその実行を拒否されることがあるのは十分に注意が必要である。**

# JWT(`JSON Web Token`)認証

実装には`django-rest-framework-simplejwt`を使う。インストールは以下のコマンドで行う。

```
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
django-admin startproject backend .
py manage.py migrate
```

## 基本設定

`backend/settings.py`

```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': {
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    }
}
```

`backend/urls.py`にアクセスして、以下のプログラムを書いてDjangoに簡単なJWT認証を実装できるように命令する。

```py
# backend/urls.py
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

再度`backend/settings.py`にアクセスして、変数`INSTALL_APPS`に`rest_framework_simplejwt`を追加。

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt', #追加
]
```

あとはコマンドで管理者を作成し、仮想サーバを立ち上げたあとは`http:localhost:8000/api/token`にアクセスする。

その後、`username`と`password`を入力しておこう。そうすれば、簡単にJWT認証を実装できる。(**フロントエンドで連携すれば簡単に認証ができるかも？**)