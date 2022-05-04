# Django REST Frameworkにおける`view`

# 概要

Djangoの`view`の大まかな役割とは、リクエストオブジェクトを受け取り、レスポンスオブジェクトを作成して返すこと。

Django REST Frameworkのクラスベースの`view`は主に以下の３つのいずれかを継承して作成する。

* `rest_framework.views.APIView`
* `rest_framework.generics.CreateAPIView`
* `rest_framework.viewsets.ModelViewSet`(または`ReadOnlyModelViewSet`)

単一モデルのCRUDを処理するREST APIを開発する際には`ModelViewSet`のみを継承する。そうではない場合、単一モデルを対象とするREST APIを開発するのであれば対応するアクションに合わせて`CreateAPIView`を継承する。

継承元のクラスは多数用意されているが、どのクラスを継承しても最終的には`rest_framework.views.APIView`を継承することがポイントになる。

Django REST Frameworkにおける`view`は、通常のDjangoと同様に`views.py`に記述する。

## `APIView`を直接継承する時

登録されているAPIでは主に以下のような処理を実施する

1. 入力データを保持したシリアライザオブジェクトを作成
2. バリデーションを実行
3. モデルオブジェクトを追加
4. レスポンスオブジェクトを作成して返す

▼`APIView`を継承したAPIクラスの例。取得した記事の一覧を表示するだけ。

```py
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article


class ArticleView(APIView):
    def get(self, request):
        articles = Article.objects.all()
        return Response({"articles": articles})
```

取得(一覧)APIでは、主に以下のような処理を実施する。

1. クエリ文字列を使ってモデルオブジェクトをフィルタリングした結果を取得
2. モデルオブジェクトの一覧を保持したシリアライザオブジェクトを作成
3. レスポンスオブジェクトを作成して返す

▼`APIView`を継承した、`Book`モデルオブジェクトの一覧を取得するための`view`

```py
# django-filterでクエリ文字列を使ったフィルタリングを行う
from django_filters import rest_framework as filters
from rest_framework import status, views
from rest_framework.exceptions import validationError
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


class BookFilter(filters.FilterSet):

    class Meta:
        model = Book
        fields = '__all__'

class BookListAPIView(views.APIView):
    def get(self, request, *args, **kwargs):
        filterset = BookFilter(request.query_params, queryset=Book.objects.all())

        if not filterset.is_valid():
            raise ValidationError(filterset.errors)
        
        serializer = BookSerializer(instance=filterset.qs, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
```

**ここで注意しておきたいことは、リスト形式のJSONを出力する際に`BookSerializer`をインスタンス化する際のキーワード引数として`many=True`を指定していることだ。**

取得(詳細)APIでは主に以下のような処理を実施する。

1. 引数の`pk`でモデルオブジェクトを取得(無ければ`Http404`を`raise`)
2. モデルオブジェクトを保持したシリアライザオブジェクトを作成
3. レスポンスオブジェクトを作成して返す

▼`APIView`を継承した取得(詳細)APIクラスの例

```py
from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


class BookRetrieveAPIView(views.APIView):
    def get(self, request, pk, *args, **kwargs):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(instance=book)
        return Response(serializer.data, status.HTTP_200_OK)
```

上記のプログラムにおけるハンドラメソッドの引数である`pk`は、`URLconf`において`/books/<pk>/`のようなパスコンパータを含めたURLパターンを登録しておくことでURLディスパッチャからこのような引数付きで呼び出すことができるようになる。

# 参考

[現場で使える Django REST Framework の教科書 （Django の教科書シリーズ）](https://www.amazon.co.jp/%E7%8F%BE%E5%A0%B4%E3%81%A7%E4%BD%BF%E3%81%88%E3%82%8B-Django-Framework-%EF%BC%88Django-%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%EF%BC%89-ebook/dp/B07XWL8FPM/ref=sr_1_1?keywords=django+rest+framework&qid=1651700947&s=digital-text&sprefix=django+res%2Cdigital-text%2C291&sr=1-1)

[Creating a Django API using Django Rest Framework APIView](https://medium.com/the-andela-way/creating-a-django-api-using-django-rest-framework-apiview-b365dca53c1d)