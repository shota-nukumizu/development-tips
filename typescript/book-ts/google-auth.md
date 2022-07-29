# Nextjs(TypeScript)でFirebase Authを利用したGoogleログインを実装する方法

`lib/Firebase.ts`

```ts
import Firebase from 'firebase/compat/app';
import 'Firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const FirebaseCredentials = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}

const auth = Firebase.auth();

// エクスポートした変数を使うことで、Googleログイン実装できる。
export {Firebase, auth};
```

`pages/signup.tsx`

```tsx
import React from 'react';
import {useRouter} from 'next/dist/client/router';
import {useEffect} from 'react';
import type {NextPage} from 'next';
import {Firebase, auth} from '../lib/Firebase';

const SignUp: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('ユーザーログインしてる？');
      console.log(!!user);
    });
  }, []);

  const signUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const provider = new Firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider).catch(alert);
      router.push('/');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="wrapper">
        <form className="auth" onSubmit={signUp}>
          <button className="auth-btn" type="submit">
            Googleでログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
```

# 参考

* [2021年11月にNext.jsとTypescriptでFirebase AuthでGoogle ログインする方法 React](https://off.tokyo/blog/next-js-typescript-firebase-auth-google/)