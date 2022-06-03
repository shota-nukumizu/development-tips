# Flutterの状態管理パッケージ徹底比較

本ファイルで紹介するのは以下の３つ。

* GetX
* Get It
* Riverpod

それぞれ順番に解説する。

## GetX

高性能な状態管理やルーティング管理を迅速かつ実用的に組み合わせている。各機能が別のコンテナに入っている。

**GetXは、パフォーマンスとリソースの最小消費に焦点を当てている。しかし、実装するのに必要なコード量が甚大なので要注意。**

### 使用例

```dart
// lib/main.dart
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

void main() {
  runApp(GetMaterialApp(
    // It is not mandatory to use named routes, but dynamic urls are interesting.
    initialRoute: '/home',
    defaultTransition: Transition.native,
    translations: MyTranslations(),
    locale: Locale('pt', 'BR'),
    getPages: [
      //Simple GetPage
      GetPage(name: '/home', page: () => First()),
      // GetPage with custom transitions and bindings
      GetPage(
        name: '/second',
        page: () => Second(),
        customTransition: SizeTransitions(),
        binding: SampleBind(),
      ),
      // GetPage with default transitions
      GetPage(
        name: '/third',
        transition: Transition.cupertino,
        page: () => Third(),
      ),
    ],
  ));
}

class MyTranslations extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'en': {
          'title': 'Hello World %s',
        },
        'en_US': {
          'title': 'Hello World from US',
        },
        'pt': {
          'title': 'Olá de Portugal',
        },
        'pt_BR': {
          'title': 'Olá do Brasil',
        },
      };
}

class Controller extends GetxController {
  int count = 0;
  void increment() {
    count++;
    // use update method to update all count variables
    update();
  }
}

class First extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.add),
          onPressed: () {
            Get.snackbar("Hi", "I'm modern snackbar");
          },
        ),
        title: Text("title".trArgs(['John'])),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GetBuilder<Controller>(
                init: Controller(),
                // You can initialize your controller here the first time. Don't use init in your other GetBuilders of same controller
                builder: (_) => Text(
                      'clicks: ${_.count}',
                    )),
            ElevatedButton(
              child: Text('Next Route'),
              onPressed: () {
                Get.toNamed('/second');
              },
            ),
            ElevatedButton(
              child: Text('Change locale to English'),
              onPressed: () {
                Get.updateLocale(Locale('en', 'UK'));
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () {
            Get.find<Controller>().increment();
          }),
    );
  }
}

class Second extends GetView<ControllerX> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('second Route'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Obx(
              () {
                print("count1 rebuild");
                return Text('${controller.count1}');
              },
            ),
            Obx(
              () {
                print("count2 rebuild");
                return Text('${controller.count2}');
              },
            ),
            Obx(() {
              print("sum rebuild");
              return Text('${controller.sum}');
            }),
            Obx(
              () => Text('Name: ${controller.user.value?.name}'),
            ),
            Obx(
              () => Text('Age: ${controller.user.value?.age}'),
            ),
            ElevatedButton(
              child: Text("Go to last page"),
              onPressed: () {
                Get.toNamed('/third', arguments: 'arguments of second');
              },
            ),
            ElevatedButton(
              child: Text("Back page and open snackbar"),
              onPressed: () {
                Get.back();
                Get.snackbar(
                  'User 123',
                  'Successfully created',
                );
              },
            ),
            ElevatedButton(
              child: Text("Increment"),
              onPressed: () {
                controller.increment();
              },
            ),
            ElevatedButton(
              child: Text("Increment"),
              onPressed: () {
                controller.increment2();
              },
            ),
            ElevatedButton(
              child: Text("Update name"),
              onPressed: () {
                controller.updateUser();
              },
            ),
            ElevatedButton(
              child: Text("Dispose worker"),
              onPressed: () {
                controller.disposeWorker();
              },
            ),
          ],
        ),
      ),
    );
  }
}

class Third extends GetView<ControllerX> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(onPressed: () {
        controller.incrementList();
      }),
      appBar: AppBar(
        title: Text("Third ${Get.arguments}"),
      ),
      body: Center(
          child: Obx(() => ListView.builder(
              itemCount: controller.list.length,
              itemBuilder: (context, index) {
                return Text("${controller.list[index]}");
              }))),
    );
  }
}

class SampleBind extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ControllerX>(() => ControllerX());
  }
}

class User {
  User({this.name = 'Name', this.age = 0});
  String name;
  int age;
}

class ControllerX extends GetxController {
  final count1 = 0.obs;
  final count2 = 0.obs;
  final list = [56].obs;
  final user = User().obs;

  updateUser() {
    user.update((value) {
      value!.name = 'Jose';
      value.age = 30;
    });
  }

  /// Once the controller has entered memory, onInit will be called.
  /// It is preferable to use onInit instead of class constructors or initState method.
  /// Use onInit to trigger initial events like API searches, listeners registration
  /// or Workers registration.
  /// Workers are event handlers, they do not modify the final result,
  /// but it allows you to listen to an event and trigger customized actions.
  /// Here is an outline of how you can use them:

  /// made this if you need cancel you worker
  late Worker _ever;

  @override
  onInit() {
    /// Called every time the variable $_ is changed
    _ever = ever(count1, (_) => print("$_ has been changed (ever)"));

    everAll([count1, count2], (_) => print("$_ has been changed (everAll)"));

    /// Called first time the variable $_ is changed
    once(count1, (_) => print("$_ was changed once (once)"));

    /// Anti DDos - Called every time the user stops typing for 1 second, for example.
    debounce(count1, (_) => print("debouce$_ (debounce)"),
        time: Duration(seconds: 1));

    /// Ignore all changes within 1 second.
    interval(count1, (_) => print("interval $_ (interval)"),
        time: Duration(seconds: 1));
  }

  int get sum => count1.value + count2.value;

  increment() => count1.value++;

  increment2() => count2.value++;

  disposeWorker() {
    _ever.dispose();
    // or _ever();
  }

  incrementList() => list.add(75);
}

class SizeTransitions extends CustomTransition {
  @override
  Widget buildTransition(
      BuildContext context,
      Curve? curve,
      Alignment? alignment,
      Animation<double> animation,
      Animation<double> secondaryAnimation,
      Widget child) {
    return Align(
      alignment: Alignment.center,
      child: SizeTransition(
        sizeFactor: CurvedAnimation(
          parent: animation,
          curve: curve!,
        ),
        child: child,
      ),
    );
  }
}
```

## Get It

シンプルな状態管理ライブラリ。UIからオブジェクトにアクセスしやすい。

### 使用例

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:get_it_example/app_model.dart';

// This is our global ServiceLocator
GetIt getIt = GetIt.instance;

void main() {
  getIt.registerSingleton<AppModel>(AppModelImplementation(),
      signalsReady: true);

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    // Access the instance of the registered AppModel
    // As we don't know for sure if AppModel is already ready we use getAsync
    getIt
        .isReady<AppModel>()
        .then((_) => getIt<AppModel>().addListener(update));
    // Alternative
    // getIt.getAsync<AppModel>().addListener(update);

    super.initState();
  }

  @override
  void dispose() {
    getIt<AppModel>().removeListener(update);
    super.dispose();
  }

  void update() => setState(() => {});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: FutureBuilder(
          future: getIt.allReady(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Scaffold(
                appBar: AppBar(
                  title: Text(widget.title),
                ),
                body: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        'You have pushed the button this many times:',
                      ),
                      Text(
                        getIt<AppModel>().counter.toString(),
                        style: Theme.of(context).textTheme.headline4,
                      ),
                    ],
                  ),
                ),
                floatingActionButton: FloatingActionButton(
                  onPressed: getIt<AppModel>().incrementCounter,
                  tooltip: 'Increment',
                  child: Icon(Icons.add),
                ),
              );
            } else {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Waiting for initialisation'),
                  SizedBox(
                    height: 16,
                  ),
                  CircularProgressIndicator(),
                ],
              );
            }
          }),
    );
  }
}
```


## Riverpod

**実行時ではなく、コンパイル時にエラーを検出できる状態管理ライブラリ。**

### 使用例

コメントだらけだが、コード量が３つのライブラリの中ではもっとも少ない。

```dart
///  A pure Dart script that fetches the list of comics from https://developer.marvel.com/
///
///  The process is split into two objects:
///
///  - [Configuration], which stores the API keys of a marvel account.
///    This object is loaded asynchronously by reading a JSON file.
///  - [Repository], a utility that depends on [Configuration] to
///    connect to https://developer.marvel.com/ and request the comics.
///
///  Both [Repository] and [Configuration] are created using `riverpod`.
///
///  This showcases how to use `riverpod` without Flutter.
///  It also shows how a provider can depend on another provider asynchronously loaded.
library main;

import 'dart:convert';
import 'dart:io';

import 'package:riverpod/riverpod.dart';

import 'models.dart';

/// A Provider that reads a json file and decodes it into a [Configuration].
final configurationProvider = FutureProvider<Configuration>((_) async {
  final file = await File.fromUri(Uri.file('configuration.json')) //
      .readAsString();
  final map = json.decode(file) as Map<String, Object?>;

  return Configuration.fromJson(map);
});

/// Creates a [Repository] from [configurationProvider].
///
/// This will correctly wait until the configurations are available.
final repositoryProvider = FutureProvider<Repository>((ref) async {
  /// Reads the configurations from [configurationProvider]. This is type-safe.
  final configs = await ref.watch(configurationProvider.future);

  final repository = Repository(configs);
  // Releases the resources when the provider is destroyed.
  // This will stop pending HTTP requests.
  ref.onDispose(repository.dispose);

  return repository;
});

Future<void> main() async {
  // Where the state of our providers will be stored.
  // Avoid making this a global variable, for testability purposes.
  // If you are using Flutter, you do not need this.
  final container = ProviderContainer();

  /// Obtains the [Repository]. This will implicitly load [Configuration] too.
  final repository = await container.read(repositoryProvider.future);

  final comics = await repository.fetchComics();
  for (final comic in comics) {
    print(comic.title);
  }

  /// Disposes the providers associated to [container].
  container.dispose();
}
```


# 参考

[Most Popular Packages for State Management in Flutter (2022)](https://www.kindacode.com/article/most-popular-packages-for-state-management-in-flutter/)