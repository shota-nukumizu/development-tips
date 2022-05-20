# TypeScriptにおける非同期処理(Promise, async/await)

▼Promiseを活用しない時

```ts
// Promiseを活用しない時

type Callback<T> = (result: T) => void 
 
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(callback: Callback<number>) {
  setTimeout(() => {
    callback(1) 
  }, 1000) 
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number, callback: Callback<number>) {
  setTimeout(() => {
    callback(result1 + 1) 
  }, 1000) 
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number, callback: Callback<number>) {
  setTimeout(() => {
    callback(result2 + 2) 
  }, 1000) 
}
 
// コールバック地獄
// 一つ前のAPIの結果を待って次のAPIをリクエストするために
// コールバック関数が入れ子になってしまう
request1((result1) => {
  request2(result1, (result2) => {
    request3(result2, (result3) => {
      console.log(result3) 
      // @log: 4
    }) 
  }) 
}) 
```

▼Promiseを活用する時

```ts
// Promiseを活用した時

// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1) 
    }, 1000) 
  }) 
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result1 + 1) 
    }, 1000) 
  }) 
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result2 + 2) 
    }, 1000) 
  }) 
}
 
request1()
  .then((result1) => {
    return request2(result1) 
  })
  .then((result2) => {
    return request3(result2) 
  })
  .then((result3) => {
    console.log(result3) 
    // @log: 4
  }) 
```