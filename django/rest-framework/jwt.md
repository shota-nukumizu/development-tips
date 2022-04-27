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

# 参考サイト

[Simple JWT - Django REST Framework](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)

[Django REST Framework Simple JWT- GitHub](https://github.com/jazzband/djangorestframework-simplejwt)