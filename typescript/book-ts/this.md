# TypeScriptにおける`this`

`this`は現在のオブジェクトを参照するもので、文脈によっては参照するオブジェクトが異なる。

TypeScriptの`this`の使い方は、それが使われる文脈に依存する。

次の例では、トラッククラスが`this`を使用しています。このキーワードはコンストラクタと`getEmployeeName`関数で異なるオブジェクトを参照しています。コンストラクタでは`Employee`クラスを参照しているが、`getEmployeeName`では TypeScriptの特殊型である`any`型を参照している。

```ts
class Employee{
	name:string;
	constructor(name:string) {
		this.name = name;
		alert(this.name);
		alert(this.getEmployeeName().name);
		}

getEmployeeName=function() {
	return this; //this is of any type
}
```