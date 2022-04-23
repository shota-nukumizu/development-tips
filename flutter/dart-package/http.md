# `http`

HTTPリクエストを行うための、Futureベースのコンポーザブルなライブラリ。**Django REST FrameworkやNestJSなどのフレームワークで開発されたAPIを操作する際には非常に重要なライブラリ。**

本パッケージには、HTTPリソースを簡単に消費するための高レベルな関数とクラスが含まれています。マルチプラットフォームに対応し、モバイル、デスクトップ、ブラウザをサポートします。

## インストール

```powershell
\> flutter pub add http
```

※**dartパッケージへのインストールは、大半は`flutter pub add <package-name>`でインストールできる。**

## 使い方

トップレベルの関数を使って実装する方法が一番簡単

```dart
import 'package:http/http.dart' as http;

var url = Uri.parse('https://example.com/whatsit/create');
var response = await http.post(url, body: {'name': 'doodle', 'color': 'blue'});
print('Response status: ${response.statusCode}');
print('Response body: ${response.body}');

print(await http.read(Uri.parse('https://example.com/foobar.txt')));
```

同じサーバーに何度もリクエストをする場合、単発のリクエストではなく、クライアントを使用することで、持続的な接続を維持することができます。この場合、終了したら必ずクライアントを閉じてください。

```dart
var client = http.Client();
try {
  var response = await client.post(
      Uri.https('example.com', 'whatsit/create'),
      body: {'name': 'doodle', 'color': 'blue'});
  var decodedResponse = jsonDecode(utf8.decode(response.bodyBytes)) as Map;
  var uri = Uri.parse(decodedResponse['uri'] as String);
  print(await client.get(uri));
} finally {
  client.close();
}
```

また、`Request`や`StreamedRequest`オブジェクトを自分で作成し、それを`Client.send`に渡すことで、リクエストとレスポンスをより細かく制御することができます。

**このパッケージは、`Composable`になるように設計されています。このため、外部のライブラリが互いに連携して動作を追加することが容易になります。**動作を追加したいライブラリは、別の`Client`をラップした`BaseClient`のサブクラスを作成し、必要な動作を追加する必要があります。

```dart
class UserAgentClient extends http.BaseClient {
  final String userAgent;
  final http.Client _inner;

  UserAgentClient(this.userAgent, this._inner);

  Future<http.StreamedResponse> send(http.BaseRequest request) {
    request.headers['user-agent'] = userAgent;
    return _inner.send(request);
  }
}
```

## リクエストの再送信

```dart
import 'package:http/http.dart' as http;
import 'package:http/retry.dart';

Future<void> main() async {
  final client = RetryClient(http.Client());
  try {
    print(await client.read(Uri.parse('http://example.org')));
  } finally {
    client.close();
  }
}
```

デフォルトでは、応答がステータスコード503 Temporary Failureのリクエストに対して、最大3回まで再試行します。最初の再試行の前には 500ms の待ち時間があり、毎回 1.5 倍の遅延が発生します。これらはすべて、`RetryClient()`コンストラクタでカスタマイズすることができます。