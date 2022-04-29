# Vueでtsxを記述する方法

VueではReactと同じようにHTMLやJavaScript(TypeScript)が混在したJSX(TSX)を書ける。

```ts
import { defineComponent, PropType } from 'vue'

interface Props {
  innerTxt: string | null;
}

export const TsxButton = defineComponent({
  props: {
    innerTxt: {
      type: String as PropType<Props['innerTxt']>
    }
  },
  setup(props) {
    return () => (
      <button>{props.innerTxt}</button>
    )
  }
})
```