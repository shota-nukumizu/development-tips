# [`flutter_web3`](https://pub.dev/packages/flutter_web3)

# Web3.0とは

実装に入る前に、Web3.0に関する基本的な内容を軽く説明しておく。

**Web3.0（Web3）とは「次世代インターネット」とも呼ばれており、2018年頃から始まった比較的新しい概念**だ。この概念は「分散型インターネットの時代」の皮切りとなり、今や大きな注目を集めている。

現在、私たちを取り巻くインターネット環境は、Google・Amazon・Meta・Apple・Microsoftの5大企業に独占されている。つまり、インターネット上でやり取りされる個人情報は、特定企業によってコントロールされているわけだ。

中央集権的なインターネット環境では、プライバシーの侵害だけでなくサイバー攻撃を受けやすいという問題点を抱えている。これらの問題点を解決するために登場したのがWeb3.0（Web3）だ。

**Web3.0（Web3）は権力分散型のブロックチェーン技術を活用しているため、特定企業に個人情報が渡ることなくサービスを利用できるようになる。さらに、Web3.0（Web3）は特定企業がサイバー攻撃を受けても、個人情報が大量に流出することはない。**

**なぜなら、ブロックチェーン技術によって個人情報が暗号化され、特定企業ではなく複数のユーザーで共有し合う仕組みができているからだ。**

特徴をざっくりまとめると、

* 個人情報を自分で管理できる
* サーバに依存せず情報を交換できる
* 仲介組織を介さず通信できる
* 言論の自由が保証される
* セキュリティが向上する
* 真のグローバル市場が確立される

こんな感じになる。

# パッケージ説明

仮想通貨「イーサリアム」をMetaMaskから取得するための完全なDartクラス及び関数ラッパー。

* Ether.jsパッケージの活用-イーサリアムブロックチェーンと対話するための完全でコンパクトなライブラリ。
* QRコードを活用して仮想通貨の残高確認や取引ができる。

# はじめかた

まずは以下のコマンドを入力してインストール。

```powershell
\> flutter pub add flutter_web3
```

Etherjsと連携する際は以下のプログラムを`web/index.html`へコピペする。

```html
<!--Ethers-->
<script src="https://cdn.ethers.io/lib/ethers-5.4.umd.min.js" type="application/javascript"></script>
<!--Wallet Connect-->
<script src="https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.6.5/dist/umd/index.min.js" type="application/javascript"></script>
```

# 使い方

## 公式

`lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_web3/flutter_web3.dart';
import 'package:get/get.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      GetMaterialApp(title: 'Flutter Web3 Example', home: Home());
}

class HomeController extends GetxController {
  bool get isInOperatingChain => currentChain == OPERATING_CHAIN;

  bool get isConnected => Ethereum.isSupported && currentAddress.isNotEmpty;

  String currentAddress = '';

  int currentChain = -1;

  bool wcConnected = false;

  static const OPERATING_CHAIN = 56;

  final wc = WalletConnectProvider.binance();

  Web3Provider? web3wc;

  connectProvider() async {
    if (Ethereum.isSupported) {
      final accs = await ethereum!.requestAccount();
      if (accs.isNotEmpty) {
        currentAddress = accs.first;
        currentChain = await ethereum!.getChainId();
      }

      update();
    }
  }

  connectWC() async {
    await wc.connect();
    if (wc.connected) {
      currentAddress = wc.accounts.first;
      currentChain = 56;
      wcConnected = true;
      web3wc = Web3Provider.fromWalletConnect(wc);
    }

    update();
  }

  clear() {
    currentAddress = '';
    currentChain = -1;
    wcConnected = false;
    web3wc = null;

    update();
  }

  init() {
    if (Ethereum.isSupported) {
      connectProvider();

      ethereum!.onAccountsChanged((accs) {
        clear();
      });

      ethereum!.onChainChanged((chain) {
        clear();
      });
    }
  }

  getLastestBlock() async {
    print(await provider!.getLastestBlock());
    print(await provider!.getLastestBlockWithTransaction());
  }

  testProvider() async {
    final rpcProvider = JsonRpcProvider('https://bsc-dataseed.binance.org/');
    print(rpcProvider);
    print(await rpcProvider.getNetwork());
  }

  test() async {}

  testSwitchChain() async {
    await ethereum!.walletSwitchChain(97, () async {
      await ethereum!.walletAddChain(
        chainId: 97,
        chainName: 'Binance Testnet',
        nativeCurrency:
            CurrencyParams(name: 'BNB', symbol: 'BNB', decimals: 18),
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      );
    });
  }

  @override
  void onInit() {
    init();

    super.onInit();
  }
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<HomeController>(
      init: HomeController(),
      builder: (h) => Scaffold(
        body: Center(
          child: Column(children: [
            Container(height: 10),
            Builder(builder: (_) {
              var shown = '';
              if (h.isConnected && h.isInOperatingChain)
                shown = 'You\'re connected!';
              else if (h.isConnected && !h.isInOperatingChain)
                shown = 'Wrong chain! Please connect to BSC. (56)';
              else if (Ethereum.isSupported)
                return OutlinedButton(
                    child: Text('Connect'), onPressed: h.connectProvider);
              else
                shown = 'Your browser is not supported!';

              return Text(shown,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20));
            }),
            Container(height: 30),
            if (h.isConnected && h.isInOperatingChain) ...[
              TextButton(
                  onPressed: h.getLastestBlock,
                  child: Text('get lastest block')),
              Container(height: 10),
              TextButton(
                  onPressed: h.testProvider,
                  child: Text('test binance rpc provider')),
              Container(height: 10),
              TextButton(onPressed: h.test, child: Text('test')),
              Container(height: 10),
              TextButton(
                  onPressed: h.testSwitchChain,
                  child: Text('test switch chain')),
            ],
            Container(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Wallet Connect connected: ${h.wcConnected}'),
                Container(width: 10),
                OutlinedButton(
                    child: Text('Connect to WC'), onPressed: h.connectWC)
              ],
            ),
            Container(height: 30),
            if (h.wcConnected && h.wc.connected) ...[
              Text(h.wc.walletMeta.toString()),
            ],
          ]),
        ),
      ),
    );
  }
}
```

## 二次情報

`lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_web3/flutter_web3.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

const kboyAddress = '0x4BD1D324F124907AB59DCD9fFdF7146Ff4242Ecf';

class _MyHomePageState extends State<MyHomePage> {
  String account = '';
  double balanceString = 0;

  void _fetchBalance() async {
    print(ethereum);
    // `Ethereum.isSupported` is the same as `ethereum != null`
    if (ethereum != null) {
      try {
        // Prompt user to connect to the provider, i.e. confirm the connection modal
        final accounts = await ethereum!.requestAccount();
        final firstAccount = accounts.first;

        final BigInt balance = await provider!.getBalance(kboyAddress);
        final ethBalance =
            balance.toDouble() * 1 / 1000000000000000000; // WEI to ETH

        setState(() {
          account = firstAccount;
          balanceString = ethBalance;
        });
      } on EthereumUserRejected {
        print('User rejected the modal');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter Web3 Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Address: $account',
            ),
            Text(
              '$balanceString ETH',
              style: Theme.of(context).textTheme.headline4,
            ),
            TextButton(
                onPressed: () async {
                  // Send 1000000000 wei to `0xcorge`
                  final tx = await provider!.getSigner().sendTransaction(
                        TransactionRequest(
                          to: kboyAddress,
                          value: BigInt.from(1000000000000),
                        ),
                      );
                  final receipt = await tx.wait();
                  print(receipt);
                },
                child: const Text('send')),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _fetchBalance,
        child: const Icon(Icons.account_balance_wallet),
      ),
    );
  }
}
```

注：引用は[コチラ](https://github.com/kboy-silvergym/flutter_web3_sample/blob/main/lib/main.dart)

# 参考記事

* [Web3.0（Web3）とは？基礎知識や注目されている理由をわかりやすく解説 - Digital Shift Times](https://digital-shift.jp/flash_news/s_220214_2#:~:text=%E8%A7%A3%E8%AA%AC%E3%81%97%E3%81%BE%E3%81%99%E3%80%82-,%E6%AC%A1%E4%B8%96%E4%BB%A3%E5%88%86%E6%95%A3%E5%9E%8B%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%81%AE%E3%81%93%E3%81%A8,%E6%B3%A8%E7%9B%AE%E3%82%92%E9%9B%86%E3%82%81%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)
* [flutter_web3 - dart package](https://pub.dev/packages/flutter_web3)
* [FlutterエンジニアのためのWeb3入門 - Zenn](https://zenn.dev/kboy/articles/347a408ab6f902)