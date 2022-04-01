# How to connect Django with React

# 前提としてやっておくべきこと

`settings.py`

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders', #追加。これがないと機能しないので十分に注意する。

    'api',
]

CORS_ORIGIN_ALLOWED = [
    'http://localhost:3000', #React側の開発者サーバにアクセスを許可する。
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', #追加。これがないと機能しない。
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```


2通りのアプローチがある。(ただし、データの一覧表示のみ)

## `fetch`を使った実装

```js
import React, {useState, useEffect} from 'react'

const DrfApi = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        try {
            async function fetchTodoAPI(){
                const res = await fetch("http://localhost:8000/api/todos/")
                const todoJson = await res.json() // JSON形式にデータを変換する
                setTodos(todoJson)
            }
            fetchTodoAPI()
        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <div>
            <ul>
                {
                    todos.map(todo => 
                    <li key={todo.id}>{todo.title}: {todo.content}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default DrfApi
```


## `axios`を使った実装

`service/service.ts`

```ts
// 連携するAPIを予め決めておく。
export const baseURL = "http://localhost:8000/api"
export const headers = {
    "Content-type": "application/json",
}
```

`src/List.tsx`

```tsx
import React, { Component } from "react";
import { render } from "react-dom";
import { service } from "service/service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/lead")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <ul>
        {this.state.data.map(contact => {
          return (
            <li key={contact.id}>
              {contact.name} - {contact.email}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
```

これで連携できる。