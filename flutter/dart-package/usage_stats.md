# `usage_stats`

Androidアプリ使用時間の統計。

# 使い方

## xmlファイルの設定

まずは以下のプログラムを書いてパッケージを機能させる

```xml
<uses-permission
        android:name="android.permission.PACKAGE_USAGE_STATS"
        tools:ignore="ProtectedPermissions" />
```

## dartプログラム

```dart
import 'package:usage_stats/usage_stats.dart';

getUsage() async {

    DateTime endDate = new DateTime.now();
    DateTime startDate = DateTime(endDate.year, endDate.month, endDate.day, 0, 0, 0);
    
    // grant usage permission - opens Usage Settings
    UsageStats.grantUsagePermission();
    
    // check if permission is granted
    bool isPermission = UsageStats.checkUsagePermission();
    
    // query events
    List<EventUsageInfo> events = await UsageStats.queryEvents(startDate, endDate);
    
    // query usage stats
    List<UsageInfo> usageStats = await UsageStats.queryUsageStats(startDate, endDate);
    
    // query eventStats API Level 28
    List<EventInfo> eventStats = await UsageStats.queryEventStats(startDate, endDate);
    
    // query configurations
    List<ConfigurationInfo> configurations = await UsageStats.queryConfiguration(startDate, endDate);
    
    // query aggregated usage statistics
    Map<String, UsageInfo> queryAndAggregateUsageStats = await UsageStats.queryAndAggregateUsageStats(startDate, endDate);

    // query network usage statistics
    List<NetworkInfo> networkInfos = await UsageStats.queryNetworkUsageStats(startDate, endDate);

}
```

# 使用例

`example/lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:usage_stats/usage_stats.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  List<EventUsageInfo> events = [];
  Map<String?, NetworkInfo?> _netInfoMap = Map();

  @override
  void initState() {
    super.initState();
    initUsage();
  }

  Future<void> initUsage() async {
    UsageStats.grantUsagePermission();
    DateTime endDate = new DateTime.now();
    DateTime startDate = endDate.subtract(Duration(days: 1));

    List<EventUsageInfo> queryEvents =
        await UsageStats.queryEvents(startDate, endDate);
    List<NetworkInfo> networkInfos =
        await UsageStats.queryNetworkUsageStats(startDate, endDate);
    Map<String?, NetworkInfo?> netInfoMap = Map.fromIterable(networkInfos,
        key: (v) => v.packageName, value: (v) => v);

    List<UsageInfo> t = await UsageStats.queryUsageStats(startDate, endDate);

    for (var i in t) {
      if (double.parse(i.totalTimeInForeground!) > 0) {
        print(DateTime.fromMillisecondsSinceEpoch(int.parse(i.firstTimeStamp!))
            .toIso8601String());

        print(DateTime.fromMillisecondsSinceEpoch(int.parse(i.lastTimeStamp!))
            .toIso8601String());

        print(i.packageName);
        print(DateTime.fromMillisecondsSinceEpoch(int.parse(i.lastTimeUsed!))
            .toIso8601String());
        print(int.parse(i.totalTimeInForeground!) / 1000 / 60);

        print('-----\n');
      }
    }

    this.setState(() {
      events = queryEvents.reversed.toList();
      _netInfoMap = netInfoMap;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text("Usage Stats"), actions: [
          IconButton(
            onPressed: UsageStats.grantUsagePermission,
            icon: Icon(Icons.settings),
          )
        ]),
        body: Container(
          child: RefreshIndicator(
            onRefresh: initUsage,
            child: ListView.separated(
              itemBuilder: (context, index) {
                var event = events[index];
                var networkInfo = _netInfoMap[event.packageName];
                return ListTile(
                  title: Text(events[index].packageName!),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                          "Last time used: ${DateTime.fromMillisecondsSinceEpoch(int.parse(events[index].timeStamp!)).toIso8601String()}"),
                      networkInfo == null
                          ? Text("Unknown network usage")
                          : Text("Received bytes: ${networkInfo.rxTotalBytes}\n" +
                              "Transfered bytes : ${networkInfo.txTotalBytes}"),
                    ],
                  ),
                  trailing: Text(events[index].eventType!),
                );
              },
              separatorBuilder: (context, index) => Divider(),
              itemCount: events.length,
            ),
          ),
        ),
      ),
    );
  }
}
```