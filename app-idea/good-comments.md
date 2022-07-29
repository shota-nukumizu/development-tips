# よいコメントの書き方

優秀なプログラマーは、他の人が読めるようなコードを書きやすい。

前提として、コメントには種類があることを知っているだろうか？そして、それを有効に活用できているだろうか？本記事を読めば、コメントの正しい書き方を十分に理解できるだろう。

# 法的なコメント(リーガルコメント)

大企業で働くときによく利用される。アプリケーションの使い方や法的合意などの規約あるいは定款がこれに含まれる。

```swift
//  SwiftyJSON.swift
//
//  Copyright (c) 2014 - 2017 Ruoyu Fu, Pinglin Tang
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
```

# 情報を提供するためのコメント

```js
// matches US social security number
let pattern = Pattern("^\\{3}-\\d{2}-\\d{4}$")
```

上記のプログラムは正規表現として見ることができる。上記のコメントは、単にアメリカの社会保障番号と一致していると言っているだけだ。これは、チーム内で正規表現に慣れていなければ有益な情報である。理解できていなくても、ただ単に式を読めばいい。

# 意図の説明

```swift
(defun swift-skip-type-name ()
    "Hop over any comments, whitespace, and the name of a type if
one is present, returning t if so and nil otherwise"
  (swift-skip-comments-and-space)
  (let ((found nil))
    ;; repeatedly
    (while
        (and
         ;; match a tuple or an identifier + optional generic param list
         (cond
          ((looking-at "[[(]")
           (forward-sexp)
           (setq found t))
          ((swift-skip-simple-type-name)
           (setq found t)))
          ;; followed by "->"
         (prog2 (swift-skip-re "\\\\?+")
             (swift-skip-re "throws\\\\|rethrows\\\\|->")
           (swift-skip-re "->") ;; accounts for the throws/rethrows cases on the previous line
           (swift-skip-comments-and-space))))
    found))
```

コードそのものを理解しようとするな。このようなコメントは意図的なもので、コードの意図を説明するものである。

# 明確化

```swift
assertTrue(a.compareTo(a) == 0) // a == a
assertTrue(a.compareTo(b) != 0) // a != b
assertTrue(a.compareTo(b) != -1) // a < b
```

このタイプのコメントは、テストコードを書いているときや何かを比較しているときによく利用される。

# 結果に関する警告

```swift
import UIKit
// This test is going to take a while to run
func test_sending_a_really_big_file() {
		loadFile(fileName: "bigfile.data")
}
```

これは特に誰かと一緒に仕事しているときに便利。このコメントがないと、プログラムの動作が遅い場合は同僚が問題を見つけるときに時間を費やしてしまうだろう。

# タスク(いわゆる`TODO`)

```swift
// TODO-Paige
// We expect this to go away when we do the checkout model
private func makeVersion() {
}
```

**TODOコメントの目的は、「これはまだ完成していないこと」を第三者に伝えること**である。いつもこの類いのコメントを書くときに自分の名前をマーキングしておくと安心だ。

# 参考記事

* [Comments: How Google Developers write their comments](https://medium.com/@paigeshin1991/comments-how-google-developers-write-their-comments-5443657ecc4b)