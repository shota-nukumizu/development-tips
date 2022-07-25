# SolidJS(TypeScript)でタスク管理アプリを開発する

SolidJSはわかりやすい状態管理、きめ細かい反応性や高いパフォーマンスを持つJavaScriptフレームワークである。

# なぜSolidJSを開発で使うのか？

SolidJSが開発された理由は、React Hooksの問題を解決するためである。React Hooksの登場でコンポーネントのローカルな状態管理は簡単になったが、グローバルな状態管理は依然として複雑なままだった。

切断されたコンポーネントがデータを共有するのはまだ難しく、状態管理の問題を解決しようとする多くのライブラリが出現した。

SolidJSは追加の設定なしでグローバルな状態管理ができる。

# SolidJSアプリをTypeScriptでセットアップする

SolidJSをインストールするにはNode.jsをインストールしなければならない。インストールしてある場合は、ターミナルで以下のコマンドを実行すると現在のNode.jsのバージョンが表示される。

```
node --version
```

以下のコマンドでSolidJSアプリをインストールできる。

```
npx degit solidjs/templates/ts task-tracker
```

SolidJSではデフォルトのビルドツールでViteを活用し、デフォルトのパッケージマネージャでpnpmを活用する。これらのツールを組み合わせることで、高速かつ円滑に開発を進められる(例：リロードの高速化、パッケージ管理の一元化など)

基本的には、アプリのコンポーネントは`./src/App.tsx`に書く。

```tsx
import type { Component } from 'solid-js'
...
const App: Component = () => {
  return (
    <div>
      ...
    </div>
  );
}

export default App
```

最初に、`solid-js`から`Component`型をインポートし、これを`App`コンポーネントと定義して使う。コンポーネントは再利用可能で、`Prop`(関数のパラメータあるいは引数)を活用してカスタマイズできる。

`./src/index.tsx`ファイルの内部で、`App`コンポーネントをレンダリングする。

```tsx
import { render } from 'solid-js/web'
import App from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
```

`solid-js/web`の`render()`メソッドは次の２つの引数を想定している。

1. `<App />`コンポーネントを返す関数
2. HTML要素

`./index.html`に移動すると、ルート`div`と`<script />`を経由して`./src/index.tsx`が使用されていることがわかる。

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script src="/src/index.tsx" type="module"></script>
</body>
```

SolidJSアプリを実行するには、まずターミナルで`pnpm install`を実行してパッケージをインストールし、次に`pnpm dev`を実行して開発モードでアプリを開始する必要がある。

成功すれば以下のようなメッセージが表示されるだろう。

```
 vite v2.9.9 dev server running at:

 > Local: http://localhost:3001/
 > Network: use `--host` to expose

 ready in 378ms.
```

`http://localhost:3001/`にアクセスすれば最初のページが表示される

# BootstrapをSolidJSアプリにインストール

以下のコマンドを実行

```
pnpm install bootstrap
```

次に以下のコードを使って`./src/index.tsx`にBootstrapをインポートする。

```tsx
import 'bootstrap/dist/css/bootstrap.min.css'
```

`./index.css`ファイルを削除し、`index.tsx`を以下のようにする。

```tsx
import { render } from 'solid-js/web'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

render(() => <App />, document.getElementById('root') as HTMLElement)
```

# JSXでタスク管理アプリを実装する

JSXを使ってタスク管理アプリを実装してみよう。`.src/App.tsx`ファイルの内部で、現在あるものを以下のように書き換える。

```tsx
import type { Component } from 'solid-js'

const App: Component = () => {
  return (
    <div class="container mt-5 text-center">
      <h1 class="mb-4">Whattodo!</h1>

      <form class="mb-5 row row-cols-2 justify-content-center">
        <input type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." id="taskInput" required />

        <button class="btn btn-primary ms-3 w-auto" type="submit">
          Add task
        </button>
      </form>

      <div>
        <h4 class="text-muted mb-4">Tasks</h4>
        <div class="row row-cols-3 mb-3 justify-content-center">
          <button class="btn btn-danger w-auto">X</button>
          <div class="bg-light p-2 mx-2">Push code to GitHub</div>
          <input type="checkbox" role="button" class="form-check-input h-auto px-3" />
        </div>
      </div>
    </div>
  )
}
export default App
```

次に、SolidJSで状態を作成及び管理する方法を解説する。ここでは、`taskList`の状態を作成し、状態に新しいタスクを追加、削除および完了ステータスを更新するためを関数を作成する。

# SolidJSでタスクの作成と更新を実装する

SolidJSには状態を作成するための`createSignal`Hookがある。例として、タスクを格納する`taskList`状態を作成する。`./src/App.tsx`ファイル内で、各タスクの型を作成することから始める。

```tsx
const App: Component = () => {
  type Task = {
    text: string
    text: string
    completed: boolean
  }

  return (...)
}
```

そして、以下のように状態管理を実装する

```tsx
import { Component, createSignal } from 'solid-js'

...
const [taskList, setTaskList] = createSignal([] as Task[])
...
```

# タスクを追加する

```tsx
const [taskList, setTaskList] = createSignal([] as Task[])

const addTask = (e: Event) => {
  e.preventDefault()

  const taskInput = document.querySelector('#taskInput') as HTMLInputElement

  const newTask: Task = {
    id: Math.random().toString(36).substring(2),
    text: taskInput.value,
    completed: false,
  }

  setTaskList([newTask, ...taskList()])
  taskInput.value = ''
}
```

# タスクを削除する

```tsx
...
const deleteTask = (taskId: string) => {
  const newTaskList = taskList().filter((task) => task.id !== taskId)
  setTaskList(newTaskList)
}
```

あとは追加したプログラムをHTML上に書く

```tsx
...
return (
 <div class="container mt-5 text-center">
    <h1 class="mb-4">Whattodo!</h1>
    <form class="mb-5 row row-cols-2 justify-content-center" onSubmit={(e) => addTask(e)}>
     ...
    </form>
  </div>
)
```

# SolidJSで制御フローを実装する

```tsx
...
<div>
  <h4 class="text-muted mb-4">Tasks</h4>
  <For each={taskList()}>
    {(task: Task) => (
      <div class="row row-cols-3 mb-3 justify-content-center">
        <button class="btn btn-danger w-auto">X</button>
        <div class="bg-light p-2 mx-2">{task.text}</div>
        <input type="checkbox" checked={task.completed} role="button" class="form-check-input h-auto px-3" />
      </div>
    )}
  </For>
</div>
...
```

▼タスクの削除ボタン

```tsx
<button class="btn btn-danger w-auto" onclick={() => deleteTask(task.id)}>
  X
</button>
```

# タスクの更新

```tsx
...
const toggleStatus = (taskId: string) => {
  const newTaskList = taskList().map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed }
    }
    return task
  })
  setTaskList(newTaskList)
}
```

▼タスクの更新ボタン

```tsx
<div class={`bg-light p-2 mx-2 ${task.completed && 'text-decoration-line-through text-success'}`}>
  {task.text}
</div>
```

`onClick`と`toggleStatus`関数で実装する。

```tsx
<input
  type="checkbox"
  checked={task.completed}
  role="button"
  class="form-check-input h-auto px-3"
  onClick={() => {
    toggleStatus(task.id)
  }}
/>
```

JSXコードは以下のようになる。

```tsx
<div class="container mt-5 text-center">
      <h1 class="mb-4">Whattodo!</h1>
      <form class="mb-5 row row-cols-2 justify-content-center" onSubmit={(e) => addTask(e)}>
        <input type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." id="taskInput" required />
        <button class="btn btn-primary ms-3 w-auto" type="submit">
          Add task
        </button>
      </form>
      <div>
        <h4 class="text-muted mb-4">Tasks</h4>
        <For each={taskList()}>
          {(task: Task) => (
            <div class="row row-cols-3 mb-3 justify-content-center">
              <button class="btn btn-danger w-auto" onclick={() => deleteTask(task.id)}>
                X
              </button>
              <div class={`bg-light p-2 mx-2 ${task.completed && 'text-decoration-line-through text-success'}`}>
                {task.text}
              </div>
              <input
                type="checkbox"
                checked={task.completed}
                role="button"
                class="form-check-input h-auto px-3"
                onClick={() => {
                  toggleStatus(task.id)
                }}
              />
            </div>
          )}
        </For>
      </div>
    </div>
```

# SolidJSにおける`createStore`を実装する

```tsx
import { createStore } from 'solid-js/store'

const [taskList, setTaskList] = createStore([] as Task[])

const toggleStatus = (taskId: string) => {
  setTaskList(
    (task) => task.id === taskId,
    'completed',
    (completed) => !completed,
  )
}
```

# 参考

* https://blog.logrocket.com/build-task-tracker-solidjs-typescript/