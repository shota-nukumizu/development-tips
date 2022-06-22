# GraphQLとは

```
// document 明日の天気と降水確率を取得する
{
  tomorrow {
    weather
    rainyPercent
  }
}
```

```json
{
  "tomorrow": {
    "weather": "cloudy",
    "rainyPercent": 30
  }
}
```