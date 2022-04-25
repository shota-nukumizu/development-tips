/* 
デコレータとは、クラス宣言、メソッド、アクセサ、プロパティやパラメータに 
付加できる特殊な宣言。
実行時に装飾された宣言の情報とともに呼び出さなければならない
*/

function first() {
    console.log('first(): factory evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('first(): called')
    }
}

function second() {
    console.log('second(): factory evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('second(): called')
    }
}

class ExampleClass {
    @first()
    @second()
    method() { console.log('METHOD') }
}