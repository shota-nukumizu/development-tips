# Introduction

TypeScriptはMicrosoftに2012年10月1日に発表されたプログラミング言語である。一言で言えば、TypeScriptはスケールするJavaScriptである。「スケールする」の意味とは、開発にかかわる人数や規模が増えた際にも上手に機能するという意味である。

TypeScriptはJavaScriptが実行できるすべてのブラウザ、コンピュータやOSで動作しオープンソースである。TypeScriptはフロントエンド、あるいはバックエンドで実行されるJavaScriptアプリケーションの開発に利用できる。

TypeScriptは大規模なアプリケーションの開発のために設計されている。さらに、既存のJavaScriptプログラムはすべて有効なTypeScriptプログラムとして実行できる。要は、TypeScriptはJavaScriptの完全上位互換なのだ。

そこで今回の記事では、

* TypeScriptの概要とJavaScriptとの違い
* TypeScriptを勉強するべき理由
* TypeScriptの背景

以上の２つに関して、一個人の見解を述べながら徹底解説していく。TypeScriptに興味のある人、あるいはTypeScriptを知らない人やこれっから学ぼうと思っている人にも参考になるように記事を書いた。

今回の記事がTypeScriptへの理解を深める上で参考になれば非常に幸いである。

***

TypeScript is a programming language released by Microsoft on October 1, 2012. In a word, TypeScript is JavaScript that scales. By "scales" we mean that it works well even when the number of developers and the size of the development team increase.

TypeScript runs on all browsers, computers and operating systems that can run JavaScript and is open source.

TypeScript is designed for the development of large applications. Furthermore, any existing JavaScript program can be executed as a valid TypeScript program. In short, TypeScript is fully upward compatible with JavaScript.

Therefore, in this article, we will.

* An overview of TypeScript and how it differs from JavaScript
* The background of TypeScript
* Why you should study TypeScript

I have prepared this article to be useful for those who are interested in TypeScript, as well as for those who have never heard of TypeScript and are thinking of learning it from this point on.

I hope this article will be of help to you in deepening your understanding of TypeScript.

# What is TypeScript?

TypeScriptの主な特徴は次のとおりである。

* JavaScriptの完全上位互換
* 安全性が高い
* 型推論がある
* 開発を楽しくさせる

TypeScriptはJavaScriptに方が追加されて、それ以外の部分は基本的に互換性がある。そのため、これまでJavaScriptに慣れ親しんできたなら時間を書けずに習得できる。

TypeScriptには型推論があり、あらゆるところに型を指定する必要はなく、TypeScriptが自動で型を設定してくれる部分がある。この機能の恩恵でコーディング量を大幅に減らせる。

TypeScriptは型安全である、型があることでプログラムをコンパイルする際に様々な問題を発見してくれる。コンパイルはプログラムのエラーを厳しく指摘してくれる。

TypeScriptはコンパイルが速く、洗練された型機能を持ち、JavaScriptとの互換性を持つ。これまでJavaScriptに型がないことによって悩まされてきた「プログラムを実行してみないとわからない」という恐怖から解放され、プログラミングを楽しくできる。

***

The main features of TypeScript are as follows

* Fully upward compatible with JavaScript
* Highly secure
* Has type inference
* Makes development fun

TypeScript is basically compatible with JavaScript except for the addition of more to JavaScript. Therefore, if you have been familiar with JavaScript so far, you can learn it without writing time.

TypeScript has type inference, which means that there is no need to specify types everywhere, and TypeScript will automatically set types for you in some areas. The benefit of this feature can greatly reduce the amount of coding.

TypeScript is type-safe; the presence of a type will help you find various problems when compiling your program. The compilation will strictly point out errors in the program.

TypeScript compiles quickly, has sophisticated type capabilities, and is compatible with JavaScript. It makes programming fun, freeing you from the fear of "not knowing until you run the program" that has plagued JavaScript in the past due to its lack of types.


# What is JavaScript?

JavaScriptはユーザのブラウザ上で動作するプログラミング言語である。Web系のプログラミング言語は原則サーバ上で実行されるが、JavaScriptについてはユーザのブラウザ上で動作する。

JavaScriptはブラウザ上で動作するプログラミング言語なので、Web制作に利用されるケースが多くある。例えば、マウスの処理や遅延処理などを実現するためにJavaScriptが利用されている。また、フォームの送信や非同期処理などもJavaScriptを利用して実装されるケースが大半だ。Webサイトを実装するにあたって、フロントエンドで実装するべきものは原則JavaScriptで書かれている。

***

JavaScript is a programming language that runs in the user's browser. In principle, web-based programming languages are executed on the server, but JavaScript runs in the user's browser.

Since JavaScript is a programming language that runs on the browser, it is often used in web development. For example, JavaScript is used to realize mouse processing and delay processing. In most cases, form submissions and asynchronous processing are also implemented using JavaScript.


# The difference between TypeScript and JavaScript

プログラミング言語には、動的型付けと性的型付けの2種類がある。先程、JavaScriptの完全上位互換がTypeScriptであると説明した。簡潔に述べるなら、JavaScriptが動的型付け、TypeScriptは静的型付けの言語で、この点が両者の最も大きな違いと言っていいだろう。

動的型付けと静的型付けの違いを簡潔に説明する。

***

There are two types of programming languages: dynamically and statically typed. Earlier, I explained that TypeScript is the fully upward compatible of JavaScript. To put it succinctly, JavaScript is a dynamically typed language and TypeScript is a statically typed language, and this is the most significant difference between the two.

The difference between dynamic and static typing is briefly explained below.

## Easy Coding

TypeScriptはJavaScriptと比較して記述がシンプルに済ませられるように設計されている。これはTypeScriptがオブジェクト指向に対応しているからだ。オブジェクト指向を利用することで繰り返しのコード量を最小限に抑えられ、これによってシンプルに記述できるようになっている。

JavaScriptはすべての処理を愚直に記述する必要があるので、どうしてもプログラムが冗長になりがちである。他のプログラミング言語であれば簡略化できる内容でも、JavaScriptではそのように記述できない。しかし、TypeScriptでは他のプログラミングに近い書き方ができるので、読みやすく開発しやすいシンプルな記述を実現できる。

***

TypeScript is designed to be simpler to write than JavaScript. This is because TypeScript supports object-oriented programming. By using object orientation, the amount of repetitive code can be kept to a minimum, which makes it simple to write.

Since JavaScript requires all processes to be written in a straightforward manner, programs tend to be verbose. Even if other programming languages can be simplified, JavaScript cannot be written in such a way. However, TypeScript can be written in a way that is similar to other programming languages, making it possible to achieve simple descriptions that are easy to read and easy to develop.

## 型宣言のしくみ

TypeScriptとJavaScriptには型宣言のしくみに大きな違いがある。前述した通り、TypeScriptは事前に型を指定する静的型付けであるが、JavaScriptはプログラムの実行時に型が判断される動的型付けである。型宣言の違いはプログラム開発において大きな影響を与えるので、特に理解しておかなければならない。

また、TypeScriptのような静的型付けでは事前に変数の型を宣言して置かなければならない。プログラマが意図的にデータの型を決定する必要があり、開発の手間がかかるけど意図しない値が入るのを未然に防げるメリットをもたらす。

それ以外にも、型宣言があることで以下のようなメリットがある。

* バグの早期発見
* コーディングの効率アップ
* コードの読みやすさの向上
* 大人数での開発の効率化

逆に、JavaScriptのような動的型付けでは事前に変数の型を宣言する必要がないので、意図しない型の値の代入やスペルミスなどで別の変数を宣言した扱いになるなどのトラブルを引き起こす。

***

There is a major difference between TypeScript and JavaScript in the way type declarations work. As mentioned above, TypeScript is statically typed, where the type is specified in advance, while JavaScript is dynamically typed, where the type is determined at program execution. The difference in type declarations has a significant impact on program development and must be understood in particular.

In addition, with static typing such as TypeScript, the type of a variable must be declared in advance. This requires the programmer to deliberately determine the type of data, which is time-consuming to develop but has the advantage of preventing unintended values from being entered.

Besides that, the type declaration has the following advantages.

* Early detection of bugs
* Increased coding efficiency
* Improved code readability
* Improved efficiency of development with a large number of developers

Conversely, dynamic typing such as JavaScript does not require declaring the type of a variable in advance, which causes problems such as assigning a value of an unintended type or treating a variable as having been declared differently due to a misspelling.

# The background of TypeScript


# The reason why you should use TypeScript


# Overview
