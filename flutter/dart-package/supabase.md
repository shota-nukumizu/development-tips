# `supabase`

Supabaseとは、Firebaseの代替となるオープンソースのデータサービス。以下の特徴がある

* データベースの変更を監視する
* フィルタリング、ページネーション、深いネストされた関係を含むテーブルのクエリ行の作成、更新、削除
* ユーザとそのPermissionの管理
* シンプルなUIを使ったデータベースとの対話

# 具体例

```dart
import 'dart:async';
import 'dart:io';

import 'package:supabase/supabase.dart';

Future<void> main() async {
  const supabaseUrl = '';
  const supabaseKey = '';
  final client = SupabaseClient(supabaseUrl, supabaseKey);

  // query data
  final selectResponse = await client
      .from('countries')
      .select()
      .order('name', ascending: true)
      .execute(count: CountOption.exact);
  if (selectResponse.error == null) {
    print('response.data: ${selectResponse.data}');
  }

  // insert data
  final insertResponse = await client.from('countries').insert([
    {'name': 'Singapore'},
  ]).execute();
  if (insertResponse.error == null) {
    print('insertResponse.data: ${insertResponse.data}');
  }

  // update data
  final updateResponse = await client
      .from('countries')
      .update({'name': 'Singapore'})
      .eq('id', 1)
      .execute();
  if (updateResponse.error == null) {
    print('updateResponse.data: ${updateResponse.data}');
  }

  // delete data
  final deleteResponse =
      await client.from('countries').delete().eq('id', 1).execute();
  if (deleteResponse.error == null) {
    print('deleteResponse.data: ${deleteResponse.data}');
  }

  // realtime
  final subscription1 =
      client.from('countries').on(SupabaseEventTypes.delete, (x) {
    print('on countries.delete: ${x.table} ${x.eventType} ${x.oldRecord}');
  }).subscribe((String event, {String? errorMsg}) {
    print('event: $event error: $errorMsg');
  });

  final subscription2 = client.from('todos').on(SupabaseEventTypes.insert, (x) {
    print('on todos.insert: ${x.table} ${x.eventType} ${x.newRecord}');
  }).subscribe((String event, {String? errorMsg}) {
    print('event: $event error: $errorMsg');
  });

  // remember to remove subscription
  client.removeSubscription(subscription1);
  client.removeSubscription(subscription2);

  // stream
  final streamSubscription = client
      .from('countries')
      .stream(['id'])
      .order('name')
      .limit(10)
      .execute()
      .listen((snapshot) {
        print('snapshot: $snapshot');
      });

  // remember to remove subscription
  streamSubscription.cancel();

  // Upload file to bucket "public"
  final file = File('example.txt');
  file.writeAsStringSync('File content');
  final storageResponse =
      await client.storage.from('public').upload('example.txt', file);
  print('upload response : ${storageResponse.data}');

  // Get download url
  final urlResponse =
      await client.storage.from('public').createSignedUrl('example.txt', 60);
  print('download url : ${urlResponse.data}');

  // Download text file
  final fileResponse =
      await client.storage.from('public').download('example.txt');
  if (fileResponse.hasError) {
    print('Error while downloading file : ${fileResponse.error}');
  } else {
    print('downloaded file : ${String.fromCharCodes(fileResponse.data!)}');
  }

  // Delete file
  final deleteFileResponse =
      await client.storage.from('public').remove(['example.txt']);
  print('deleted file id : ${deleteFileResponse.data?.first.id}');

  // Local file cleanup
  if (file.existsSync()) file.deleteSync();
}
```

## データベースで活用するとき

```dart
import 'package:supabase/supabase.dart';

main() {
  final client = SupabaseClient('supabaseUrl', 'supabaseKey');

  // Select from table `countries` ordering by `name`
  final response = await client
      .from('countries')
      .select()
      .order('name', ascending: true)
      .execute();
}
```


## 双方向通信

```dart
import 'package:supabase/supabase.dart';

main() {
  final client = SupabaseClient('supabaseUrl', 'supabaseKey');

  // Set up a listener to listen to changes in `countries` table
  final subscription = await client
      .from('countries')
      .on(SupabaseEventTypes.all, (payload) {
        // Do something when there is an update
      })
      .subscribe();

  // remember to remove subscription when you're done
  client.removeSubscription(subscription);
}
```

## 認証(`Authentication`)

```dart
import 'package:supabase/supabase.dart';

main() {
  final client = SupabaseClient('supabaseUrl', 'supabaseKey');

  // Sign up user with email and password
  final response = await client
      .auth
      .signUp('email', 'password');
}
```