# A Philosophy of Software Design

参考文献：[A Philosophy of Software Design](https://www.amazon.co.jp/Philosophy-Software-Design-English-ebook/dp/B07N1XLQ7D/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=26X8YKAK8S752&keywords=A+Philosophy+of+Software+Design&qid=1649282683&s=digital-text&sprefix=a+philosophy+of+software+design%2Cdigital-text%2C197&sr=1-2)

# 序文

私たちは80年以上もパソコンでプログラムを書いているが、プログラムを設計する方法あるいはより良いプログラムを設計する方法についてはほとんど議論がない。ソフトウェア開発のプロセスにおいて、重要な議論がある。

* アジャイル開発
* デバッガ
* バージョン管理システム
* テストツール

さらに、広範囲に渡るプログラミング技術の分析も存在する。

* オブジェクト指向プログラミング
* 関数型プログラミング
* デザインパターン
* アルゴリズム

これらのことに関する議論は価値があるものだが、ソフトウェア設計の重要な問題については全く触れられていない。

**本書ではソフトウェア設計の重要な問題について言及されている画期的な一冊。原則は非常に難しいので、抽象的な内容を理解するのは困難である。プログラムを書いたり、失敗したり、自分の間違いとその後の修正が原則にどのように関連しているかどうかを見たりすることでこれらの原則をしっかり学ぶことができる。**

# Chapter 1

ソフトウェアを書くことは、人類の歴史の中で最も純粋な創造的活動の１つにすぎない。プログラマーは、物理法則などの実用的な制限に縛られない。プログラミングは、バレエやバスケットボールのような優れた身体的スキルや調整を必要としない。必要なのは創造力と考えを整理する能力である。**ソフトウェアを書くときの最大の障壁は、作成しているシステムを理解する能力である。**

優れた開発ツールは複雑さに対処するのに役立ち、過去数十年にわたって多くの優れたつるが開発されてきた。**しかし、ツールだけでできることには限界がある。より強力なシステムをより安価に構築できるように、ソフトウェアを簡単に設計したいならより簡単にする方法を見つける必要がある。**

## 本書で述べられているアプローチ

* コードをよりシンプルかつ明確にすることで複雑さを排除する
* 複雑さをカプセル化して、プログラマーが一度にすべての複雑さにさらされることなくシステムで作業できるようにすること
  
ソフトウェアは非常に柔軟なので、ソフトウェア設計はソフトウェアシステムのライフサイクル全体に渡る継続的なプロセスである。プログラミングの歴史の大部分において、デザインは他のエンジニアリング分野と同じように、プロジェクトの開始時に集中していた。このアプローチの極端はウォーターフォールモデルと呼ばれ、プロジェクトは要件定義、設計、コーディング、テストや保守などの個別のフェーズに分割される。

**残念ながら、ウォーターフォールモデルがソフトウェアで上手に機能することはない。ソフトウェアシステムは本質的に物理システムよりも複雑である。**大規模なソフトウェアシステムの設計を視覚化して、何かを構築する前にその影響を全て理解するのは非常に困難だ。

これらの問題を解決するために、今日のほとんどのソフトウェア開発プロダクトでは、初期設計が全体的な機能の小さなサブセットに焦点を当てるアジャイル開発などの増分アプローチを使っている。このサブセットは、設計、実装、及び評価される。

# Chapter 2

## 2-1

本章では、ソフトウェアシステムの複雑さを最小限に抑えるためにソフトウェアシステムを設計する方法について説明する。最初のステップは、敵を理解すること。ソフトウェアの複雑さを認識する能力は、重要な設計スキルである。

複雑さは、ソフトウェアシステムの構造に関連するもので、システムの理解と変更を困難にする。複雑さには様々な形がある。たとえば、コードがどのように機能するのかを理解するのは難しいかもしれない。複雑さとは、開発者が特定の目標を達成しようとする特定の時点で経験するものである。必ずしもシステムの全体的なサイズや機能に関連しない。

決して見られない場所で複雑さを分離することは、複雑さを完全に排除することと同じくらい良いことである。コードの一部を書いて、それが他人にとって複雑に見えるなら、それは複雑である。

## 2-2

複雑さの最初の症状は、変更の増幅。一見単純な変更では、様々な場所でコードを変更する必要があること。例えば、複数のページを含むWebサイトでは、各ページに背景色のバナーが表示されるとする。**ページごとに色が明示的に指定されるWebサイトの背景を変更するには、開発者は既存の全てのページを手動で変更する必要がある。これは、数千ページに渡る大規模なサイトではほぼ不可能に近い。**

２つ目の症状は認知負荷。これは開発者がタスクを完了するためにどの程度知る必要があるかどうかを示す。

システム設計者は、複雑さはコード行で測定できると想定することがある。彼らは、ある実装が別の実装よりも短い場合、それはより単純でなければならないと仮定する。変更するために数行のコードしか必要としない場合、変更は簡単でなければならない。より多くのコード業を必要とするアプローチは、認知不可を軽減するため、実際にはより単純な場合がある。

３つ目の症状は未知の未知。これは、タスクを完了するために度のコードを変更する必要があるか、またはタスクを正常に実行するために開発者が必要とする城堡が明確でないことを意味する。**これら３つの症状のうち、未知の未知が最悪である。どこをどうすればいいのかわからないからだ。**

**優れた設計の最も重要な目標の１つは、システムそのものが明確であること。**

## 2-3

複雑さは、依存関係と曖昧さの２つの要因によって引き起こされる。このセクションでは、これらの要因を大まかに説明する。以降の章では、これらが下位レベルの設計上の決定にどのように関連しているかについて説明する。

依存関係：ソフトウェアの基本的な部分であり、完全に排除できない。実際、ソフトウェア設計のプロセスの一環として依存関係を意図的に導入している。新しいクラスを作成するたびに、そのクラスのAPIの周りに依存関係を作成する。<br>
曖昧さ：重要な城堡が明らかではない時に発生する。簡単な例は、あまり有用な情報を持たない変数名。(例えば、`time`や`retval`などのような抽象的な名前)

## 2-4

複雑さは、単一の壊滅的なエラーによって引き起こされない。単一の依存関係や曖昧さは、それ自体ではソフトウェアシステムの保守性に大きな影響を与える可能性は低い。

## 2-5：結論

複雑さは、依存関係と曖昧さの蓄積から生じる。複雑さが増すにつれて、それは変更の増幅、認知不可や未知の未知につながる。その結果、新しい機能を実装するたびに、より多くのコード変更が必要になる。さらに、開発者は変更を安全に行うのに十分な情報を取得するためにより多くの時間を費やし、最悪の場合は必要なすべての情報を見つけることさえできない。

要するに、複雑さが既存のコードベースを変更することを困難かつ危険にしていることにつながるのだ。