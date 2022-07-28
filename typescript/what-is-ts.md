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

## The Mechanism of Type Delaration

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

## Learning costs

TypeScriptもJavaScriptも両方根本的な部分で大きな違いや差はない。TypeScriptはあくまでJavaScriptを改良したプログラミング言語で、実装できる機能などはJavaScriptのものを踏襲している。ところが、両者では学習コストが異なる。

基本的にTypeScriptはJavaScriptよりも学習コストが高い。これはまったく知識がない状態からTypeScriptを学習する場合でJavaScriptの知識があることを考慮していない。JavaScriptの前提知識があるとTypeScriptの学習コストは大幅に下がる。

TypeScriptの学習コストが高い最大の理由は、TypeScriptがコンパイルの必要なプログラミング言語だからだ。一般的に、プログラミング言語はコンパイルが必要となると開発環境の準備をしなければならない。これは時間を要し一定のスキルを要求されるので、学習コストが高くなってしまう。

それだけではなく、TypeScriptは方宣言が必要なプログラミング言語である。この点もJavaScriptよりも学習コストが高くなる最大の要因となっている。型宣言のルールが厳しいプログラミング言語は文法が複雑な傾向にあり、TypeScriptもこれに該当してしまうので学習コストが高い。

***

There are no fundamental differences between TypeScript and JavaScript; TypeScript is a programming language that has been modified from JavaScript and follows JavaScript in the features it can implement. However, the learning cost is different between the two.

Basically, TypeScript is more expensive to learn than JavaScript. This is because TypeScript is learned with no knowledge at all and does not take JavaScript knowledge into consideration.

The main reason for the high learning cost of TypeScript is that TypeScript is a programming language that requires compilation. In general, a programming language requires a development environment to be prepared when it needs to be compiled. This is time consuming and requires a certain level of skill, making the learning cost high.

Not only that, but TypeScript is a programming language that requires a directional declaration. This is also the biggest factor that makes it more expensive to learn than JavaScript. Programming languages with strict type declaration rules tend to have complex grammars, and TypeScript falls into this category, making it expensive to learn.


# The background of TypeScript

TypeScriptはJavaScriptでも大規模なアプリケーションを開発しやすくすることを目的に開発されたプログラミング言語である。

もともと、JavaScriptは大規模な開発を想定した設計ではなかった。それでも、JavaScript自体を進化させて大規模なキーワードに対応していけばよかったはずだ。しかし、その方法はうまくいかなかった。かわりに、大規模開発の一部はTypeScriptが引き受けることになったのである。

どうしてそうなったのだろうか？その答えはJavaScriptの歴史にある。

1995年にリリースされたJavaScriptは当初、大規模な開発に用いられることが想定されていない。10年もすると、大規模開発のニーズが顕在化し始め、JavaScriptは対応に迫られる。しかし、ベンダー同士の合意を取り付けられずJavaScriptの進化は停滞する。

JavaScriptが硬直状態だった間も、Webアプリケーションは大規模化が進んで開発のレベルが日に日に増してきた。それに対して、様々な解決策がコミュニティからなされるようになる。

その流れの中でTypeScriptが発明された。TypeScriptは大規模開発の困難さに立ち向かう言語として、JavaScriptの完全上位互換・型・モジュール性の3つの特徴を携えて2012年に発表された。

TypeScriptが発表されて以来、JavaScriptも進化を始めて6年ぶりのアップデートとしてECMAScript 2015を発表し、そこから毎年新しい仕様を発表し続けている。それでもなお、TypeScriptの最大の特徴である「型」は依然としてJavaScriptにはない。

今日においてTypeScriptが大規模開発で支持されるのは、JavaScriptでは得られない開発体験があるためである。

***

TypeScript is a programming language developed with the goal of making it easier to develop large-scale applications in JavaScript.

Originally, JavaScript was not designed for large-scale development. Nevertheless, it would have been better if JavaScript itself had evolved to support large-scale keywords. However, that approach did not work. Instead, TypeScript took over some of the large-scale development.

How did this happen? The answer lies in the history of JavaScript.

Released in 1995, JavaScript was not initially intended for large-scale development. 10 years later, the need for large-scale development began to emerge and JavaScript was forced to adapt. However, JavaScript's evolution stalled due to the lack of consensus among vendors.

Even while JavaScript was in a rigid state, web applications were becoming larger and larger, and the level of development was increasing day by day. In response, the community came up with various solutions.

TypeScript was invented in 2012 as a language that could face the difficulties of large-scale development, with the three features of full upward compatibility with JavaScript, types, and modularity.

Since TypeScript was announced, JavaScript has also begun to evolve, releasing ECMAScript 2015 as its first update in six years, and continuing to release new specifications every year from there. Still, TypeScript's most important feature, "types," remains absent from JavaScript.

Today, TypeScript is favored for large-scale development because it offers a development experience not available in JavaScript.


# The reason why you should use TypeScript

なぜTypeScriptを学ぶべきなのか？Webアプリケーションのフロントエンドを開発するのに、最低限必要となる言語はHTMLとCSSを除けばJavaScriptだけである。JavaScriptをマスターできれば、かなり自由にフロントエンドを実装できる。それにもかかわらず、どうしてTypeScriptを学ぶべきだろうか？

本記事ではTypeScriptを学ぶべき理由を紹介する。

## 大規模開発に最適だから

前章でTypeScriptが発明されるに至った歴史的背景を「TypeScript誕生の背景」で見たが、TypeScriptはJavaScriptでは対応しきれない大規模開発を克服するために誕生した。

TypeScriptは大規模開発に要求される三大特徴を備えている。

* 型チェック
* モジュール性
* 緩やかな学習コスト

これらのうち特に型による静的チェックは、TypeScriptにTypeという名前があるようにTypeScriptの注目するべき機能だ。型チェックはプログラムを実行しなくても、プログラムのバグに気づける。バグは発見が遅れるほど修正するコストが高くなるものの、TypeScriptはコーディング中に頻繁にチェックできるのでバグを早期発見しやすい。Airbnbによれば、TypeScriptを使っていたらAirbnbの38%のバグを未然に防げたと見る分析を発表している。

また、型があることでプログラムの可読性や理解しやすさが上がったり、エディタの保管機能を活かすことができるので、コーディングの効率がアップします。

しかし、静的チェックは品質保証の銀の弾丸ではないことは注意してください。静的チェックは、誰が読んでも絶対におかしいと客観的に判断できるような欠陥を見つけ出すためにある。より詳しく言うと、静的チェックは定義されていない変数へのアクセスや正しくないデータ型の取り扱いなどには対応できない。それでもなお、静的チェックのおかげでTypeScriptで検出できる類いのバグテストはテスト工程から省略できるのは事実である。

## JavaScriptの前提知識があれば使える

TypeScriptはJavaScriptの完全上位互換だ。これをわかりやすく言えば、TypeScriptはJavaScriptの仕様をそのままにTypeScriptならではの新しい機能や利点を追加したものだ。

この特徴により、JavaScriptの知識さえあればTypeScriptを使い始められる。これは新しい言語の学習コストをとても緩やかにしてくれる。新しい言語を導入するとなると、難しい言語だと学習に数ヶ月要し、そこからやっと書き始めるということがよくある。

ところが、TypeScriptの場合はとりあえずJavaScriptとして書き始め、少しずつTypeScriptを学んでいき、徐々にTypeScriptの恩恵を最大化できるようにコードを手直しするというようなアプローチができる。

JavaScriptの上位互換であるということは、裏を返せばJavaScriptを知らなければならないということになる。そのため、TypeScriptを学ぶならまずはJavaScriptについてよく学んでおく必要があるのだ。JavaScriptの前提知識さえあれば、TypeScriptを学ぶのにそれほど苦労はしないだろう。

***

Why should I learn TypeScript? Nevertheless, why should you learn TypeScript?The only minimum language required to develop the front end of a web application, aside from HTML and CSS, is JavaScript.If you can master JavaScript, you can implement a front end quite freely.

In this article, we will introduce four reasons why you should learn TypeScript.

We saw the historical background that led to the invention of TypeScript in the previous chapter, "Background of the birth of TypeScript," and TypeScript was born to overcome large-scale development that JavaScript could not handle.

TypeScript has three major characteristics required for large-scale development.

* Type checking
* Modularity
* Moderate learning cost

Among these, static checking by type is a particularly noteworthy feature of TypeScript, as TypeScript has the name Type. Type checking can detect bugs in a program without executing the program. According to Airbnb, TypeScript could have prevented 38% of Airbnb's bugs. TypeScript is also a very useful tool for the development of programs.

Types also increase the readability and understandability of a program, and they increase coding efficiency because they allow editors to take advantage of the storage capabilities of the editor.

It is important to note, however, that static checks are not a silver bullet for quality assurance. Static checks are there to find defects that can be objectively determined to be absolutely wrong by anyone who reads the file. To be more precise, static checks cannot deal with accessing variables that are not defined or handling incorrect data types. Still, it is true that static checks can eliminate from the testing process the kinds of bug tests that TypeScript can detect.




# Overview
