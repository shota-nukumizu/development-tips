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

