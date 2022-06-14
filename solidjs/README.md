# SolidJS

```tsx
// main.tsx
// Webページ上に起動してからの時間を秒単位で表示するプログラム
import { render } from "solid-js/web";
import { onCleanup, createSignal } from "solid-js";

// HTML要素とその処理をアロー関数で書く
const CountingComponent = () => {

  // ここに状態管理を書く
  const [count, setCount] = createSignal(0);

  // 実行する処理を関数で作成する
  const interval = setInterval(
    () => setCount(count => count + 1),
    1000
  );

  // リロードした時にcountの数値をリセットする
  onCleanup(() => clearInterval(interval));

  // returnの後に表示するHTMLコードを書く
  return <div>Count value is {count()}</div>;
};

// これで表示するコンポーネントをWebページに表示する
render(() => <CountingComponent />, document.getElementById("app"));
```