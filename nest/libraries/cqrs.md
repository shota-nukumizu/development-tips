# [CQRS](https://docs.nestjs.com/recipes/cqrs)

単純なCRUD(`Create, Read, Update, Delete`)アプリの流れは、以下の手順で説明できる。

1. Controller層はHTTPリクエストを処理し、タスクをService層に委譲する。
2. Serviceレイヤーは、ビジネスロジックの大部分が存在する場所。
3. Serviceでは、リポジトリを使用してエンティティ[^1]の変更と永続化を行う。そのさい、エンティティはsetterとgetterを持つ、値のためのコンテナとして機能する。
  
殆どの場合、小規模及び中規模のアプリケーションではこのパターンで十分である。しかし、要件がかなり複雑になるとCQRSモデルのほうがより適切かもしれない。

[^1]：エンティティ(`entity`)とは、ITの分野における何らかの標識や識別名、所在情報によって示される独立した一意の対象物。引用：[e-words](https://e-words.jp/w/%E3%82%A8%E3%83%B3%E3%83%86%E3%82%A3%E3%83%86%E3%82%A3.html)

# CQRSモデルとは

**CQRS(`Command Query Responsibility Segregation`：コマンドクエリ責務分離)**とは、CRUDとは異なって**データの読み込みと書き込みが違うものという前提に基づく設計思想**である。

CQRSでは、データベースの操作をコマンドとクエリの２つに分類する。コマンドは一般的に、操作の成否以上の情報を呼び出すに過ぎない。また、クエリは**複数回同じ処理を行っても同じ結果が得られる**ようにしなければならない。(これを**冪等性(べきとうせい)**という)

CQRSでは読み込みに使うデータモデルとコマンドを別々のものとして明示的に切り離す。そのため、**エンティティのどのフィールドが更新可能なのかを明確にできる**のが最大の特徴。[^2]


参考：[CQRSとイベントソーシングの使用法、または「CRUDに何か問題でも？」](https://postd.cc/using-cqrs-with-event-sourcing/)

[^2]：例えば、「メールアドレスを変更する」「住所を変更する」「特定のアカウントの投稿記事を削除する」というようなコマンドを検討できる。

## インストール方法

```
npm install --save @nestjs/cqrs
```

