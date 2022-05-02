# Django REST FrameworkでJWT認証

## JWT(`JSON Web Token`)認証とは

認証情報を含んだJSON形式のデータをHTTPヘッダで送信できるようにエンコードしたトークン。署名を含んでいるので改ざん検知ができるのが最大の特徴。**トークンそのものに認証情報が含まれていて直接ユーザを特定できるので、トークンをデータベースに保存する必要がないメリットがある。サーバ側でユーザのログイン状態を管理する必要がないのだ。**

JWT認証では、トークンが改ざんされていないかどうかリクエストのたびに毎回検証が実施される。それによってJWTを返した正規のサイトからのリクエストであることが特定できる。

ただし注意点として、**JWTは署名されているものの、鍵を持っている人しか読めないように「暗号化」されているわけではない。**

# 実装方法

## インストール

```
pip install djangorestframework-simplejwt
```

Djangoプロジェクトを作成して、`settings.py`に以下のプログラムを書く

```py
INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt',
    ...
]
...
REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    ...
}
```

`urls.py`

```py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    ...
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ...
]
```

これで実装は終了。

# 使い方

SimpleJWTが機能していることを確認するために、`curl`コマンドを使っていくつかテストリクエストを発行できる。

```powershell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "davidattenborough", "password": "boatymcboatface"}' \
  http://localhost:8000/api/token/

...
{
  "access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU",
  "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImNvbGRfc3R1ZmYiOiLimIMiLCJleHAiOjIzNDU2NywianRpIjoiZGUxMmY0ZTY3MDY4NDI3ODg5ZjE1YWMyNzcwZGEwNTEifQ.aEoAYkSJjoWH1boshQAaTkf8G3yn0kapko6HFRt7Rh4"
}
```

この短命のアクセストークンの有効期限が切れると、長命のリフレッシュトークンを活用して別のアクセストークンを取得できる。

```powershell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImNvbGRfc3R1ZmYiOiLimIMiLCJleHAiOjIzNDU2NywianRpIjoiZGUxMmY0ZTY3MDY4NDI3ODg5ZjE1YWMyNzcwZGEwNTEifQ.aEoAYkSJjoWH1boshQAaTkf8G3yn0kapko6HFRt7Rh4"}' \
  http://localhost:8000/api/token/refresh/

...
{"access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNTY3LCJqdGkiOiJjNzE4ZTVkNjgzZWQ0NTQyYTU0NWJkM2VmMGI0ZGQ0ZSJ9.ekxRxgb9OKmHkfy-zs1Ro_xs1eMLXiR17dIDBVxeT-w"}
```

# 参考サイト

[Simple JWT - Django REST Framework](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)

[Django REST Framework Simple JWT- GitHub](https://github.com/jazzband/djangorestframework-simplejwt)