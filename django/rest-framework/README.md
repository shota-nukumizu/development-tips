# Django REST Framework

Django REST Framework(以下、DRFと表記する)はPythonのWebフレームワーク「Django」でWeb API(REST)を開発できるサードパーティ製のライブラリです。

DjangoやPythonの知見や特徴をフル活用したWebアプリを開発できます。実際のプロジェクトでは、Webアプリのベースとなる機能はDjangoを利用し、REST APIに特化した機能はDRFで実装するというように使います。

# 特徴

DRFの主な強みは以下のとおりです。

* Djangoの強力な機能をフル活用できる
* REST APIを開発するのに必要な機能がデフォルトで揃っている
* APIの実行結果を確認できるテストクライアント「Browsable API」がある
* 公式ドキュメントや公式チュートリアルの内容が豊富で充実している
* OpenAPIやSwaggerに対応しており、自動でAPIドキュメントを生成できる

DRFの最大の強みは、デフォルトで多種多様な機能を揃えているDjangoの強みを最大限に活用できる点です。

# インストール

```powershell
# Install Django and Django REST Framework
pip install django
pip install djangorestframework

# Set up a new project
django-admin startproject   .
django-admin startapp firstapp
```

プロジェクトは以下のようになります。

```
./manage.py
./__init__.py
./firstapp
./firstapp/__init__.py
./firstapp/admin.py
./firstapp/apps.py
./firstapp/migrations
./firstapp/migrations/__init__.py
./firstapp/models.py
./firstapp/tests.py
./firstapp/views.py
./asgi.py
./settings.py
./urls.py
./wsgi.py
```

`./settings.py`

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #add these two literals
    'rest_framework',
    'myapp',
]
```

ここで初めてデータベースを同期させます。

```
py manage.py migrate
```

あと、パスワードが`password123`の`admin`というユーザを作成します。

```
python manage.py createsuperuser --email admin@example.com --username admin
```

# Serializer

`./firstapp/serializers.py`ファイルを新規作成し、以下のコードを書く。

```py
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
```

# View

`./firstapp/views.py`ファイルに以下のコードを書く。

```py
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
```

基本的には、DRFのViewは`ViewSets`クラスで書く。

# URL

`./urls.py`ファイルに以下のようなコードを書く。

```py
from django.urls import include, path
from rest_framework import routers
from firstapp import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

# APIをテストする

APIをこのように組み立てたら、コマンドラインで実行しましょう。

```
py manage.py runserver
```

`curl`コマンドを使って実際に開発したAPIをテストしましょう。

```
bash: curl -H 'Accept: application/json; indent=4' -u admin:password123 http://127.0.0.1:8000/users/

{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "email": "admin@example.com",
            "groups": [],
            "url": "http://127.0.0.1:8000/users/1/",
            "username": "admin"
        },
    ]
}
```

これで簡単なAPIを開発できます。