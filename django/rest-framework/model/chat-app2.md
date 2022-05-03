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

`ChatApp/chat/models.py`

```py

```

# 注

`rendering`(レンダリング)：何らかの抽象的なデータ集合を基に、一定の処理や演算を行って画像や映像、音声などを生成すること

Ajax：

# 参考サイト

[How to customize Django forms using Django widget tweaks - educative](https://www.educative.io/edpresso/how-to-customize-django-forms-using-django-widget-tweaks)

[[Part-1] Creating a Simple Chat App with DjangoRestFramework - steemit](https://steemit.com/utopian-io/@ajmaln/part-1-creating-a-simple-chat-app-with-djangorestframework)