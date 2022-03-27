// TypeScriptにおけるnamespaceとは、他のオブジェクトとの衝突を避ける際によく使う
namespace SingletonPattern {
    export class Singleton {
        private static singleton: Singleton

        private constructor() {
        }

        public static getInstance(): Singleton {
            if (!Singleton.singleton) {
                Singleton.singleton = new Singleton()
            }

            return Singleton.singleton
        }
    }
}

// シングルトンとは、オブジェクト指向プログラミングにおけるクラスのデザインパターンの１つで、
// 実行時にそのクラスのインスタンスが必ず単一になるように設計すること