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

`src/pages/Login.tsx`

```tsx
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";

function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // 送信するデータを型定義する
  const handleLogin = (email: string, password: string) => {
    //
  };

  const formik = useFormik({
    // データの初期化
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Le nom d'utilisateur est requis"),
      password: Yup.string().trim().required("Le mot de passe est requis"),
    }),
  });

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password} </div>
            ) : null}
          </div>
          <div className="text-danger text-center my-2" hidden={false}>
            {message}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
```