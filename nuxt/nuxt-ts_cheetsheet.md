# Vue+TypeScript Cheatsheets

Cheatsheets for experienced Vue developers getting started with TypeScript.

-   [Vue 3 specifics](vue-3.md)
-   [Class Components & Decorators](class-components.md)

# Section 1: Setup

## Prerequisites

1. A good understanding of [Vue.js](https://vuejs.org/)
2. Read the TypeScript support section in the Vue docs [2.x](https://vuejs.org/v2/guide/typescript.html) | [3.x](https://v3.vuejs.org/guide/typescript-support.html#typescript-support)

## Vue + TypeScript Starter Kits

1. Using the [Vue CLI](https://vuejs.org/v2/guide/installation.html#CLI) , you can select the [TypeScript plugin](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript) to be setup in a new a Vue project.

```bash
# 1. Install Vue CLI, if it's not already installed
npm install --global @vue/cli
# 2. Create a new project, then choose the "Manually select features" option
vue create <my-project-name>
```

2. [Vite](https://github.com/vitejs/vite) is a new build tool by Evan You. It currently only works with Vue 3.x but supports TypeScript out-of-the-box.

> ⚠ Currently in beta. Do not use in production.
```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

# Section 2: Getting Started

## Recommended `ts.config` setup

> note: `strict:true` stricter inference for data properties on `this`. If you do not use it, `this` will always be treated as `any`
```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "strict": true,
        "moduleResolution": "node"
    }
}
```

## Usage in `.vue` files

Add `lang="ts"` to the script tag to declare TS as the `lang` used.

```js
<script lang='ts'>...</script>
```

In Vue 2.x you need to define components with `Vue.component` or `Vue.extend`:

```js
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  // type inference enabled
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>
```

In Vue 3.x you can use `defineComponent` to get type inference in Vue component options

```js
import { defineComponent } from 'vue';
const Component = defineComponent({
    // type inference enabled
});
```

## Props

`PropType` can be used to annotate props with a particular object shape.

```vue
import Vue, { PropType } from 'vue'
<script lang="ts">
import Vue from "vue";
interface PersonInfo { 
  firstName: string,
  surname: string,
  age: number
}
export default Vue.extend({
  
  name: "InfoCard",
  props: {
    info: {
      type: Object as PropType<PersonInfo>,
      required: true
    }
  }
});
</script>
```

Alternatively, you can also annote your prop types with an anonymous function:

```vue
<script lang="ts">
import Vue from "vue";
interface PersonInfo { 
  firstName: string,
  surname: string,
  age: number
}
export default Vue.extend({
  
  name: "InfoCard",
  props: {
    info: {
      type: Object as () => PersonInfo,
      required: true
    }
  }
});
</script>
```

## Data Properties (Options API)

You can enforce types on Vue data properties by annotating the return data object:

```ts
interface Post {
  title: string;
  contents: string;
  likes: number;
}
export default Vue.extend({
  data(): { newPost: Post } {
    return {
      newPost: {
        title: "",
        contents: "",
        likes: 0
      }
    };
  }
});
```

It might be tempting to annotate your Vue data properties using `as` like this:

```ts
interface Post {
  title: string;
  contents: string;
  likes: number;
}
export default Vue.extend({
  data() {
    return {
      newPost: {
        title: "",
        contents: "",
        likes: 0
      } as Post // ❌ Avoid doing this
    };
  }
});
```
Note that [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) like this does not provide any type safety. If for example, the `contents` property was missing in `newPost`, TypeScript would not catch this error. 

## Computed Properties (Options API)

Typing the return type for your computed properties is important especially when `this` is involved as TypeScript sometimes has trouble infering the type. 

```ts
export default Vue.extend({
  data() {
    return {
      name: 'World',
    }
  },
  computed: {
    greet(): string {  //👈 Remember to annotate your computed properties like so. 
      return 'Hello ' + this.name
    },
  }
})
```

# Class Components

## Overview

[Vue Class Components](https://class-component.vuejs.org/) offers an alternative class-style syntax for Vue components which integrates well with TypeScript.

To have consistent support for decorators in your Vue components, it's also recommended to install [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).


To get started with both libraries in your existing Vue project, run: 
```
npm install vue-class-component vue-property-decorator
```

You only need to import `vue-property-decorator` into your `.vue` file as it extends `vue-class-component`. 

You can now write TS in your components like this:

```vue
<template>
  <div>
    {{ count }}
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
    {{ computedValue }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Hello extends Vue {

  count: number = 0
  vue: string = "vue"
  ts: string = "ts"

  // Lifecycle methods can be accessed like this
  mounted() {
    console.log('component mounted')
  }

  // Method are component methods
  increment(): void {
    this.count++
  }

  decrement(): void {
    this.count--
  }

  // Computed values are getters
  get computedValue(): string {
    return `${vue} and ${ts} rocks!`
  }
}
</script>
```
See the [full guide for Vue Class Components](https://class-component.vuejs.org/guide/class-component.html#data).

> _Class components should not confused with the now abandoned [Class API proposal](https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121)._

## Props
You can use the `Prop` decorator to annoate your prop types like so:

```ts
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface PersonInfo { 
  firstName: string,
  surname: string,
  age: number
}

@Component
export default class InfoCard extends Vue {
  @Prop() readonly info!: PersonInfo;
  @Prop({ default: false }) readonly admin?: boolean;
}
</script>
```
Is equivalent to:

```ts
import Vue from "vue-property-decorator";
import Vue, { PropType } from 'vue'

interface PersonInfo {
  firstName: string,
  surname: string,
  age: number
}
export default {
  props: {
    info: {
      type: Object as PropType<PersonInfo>,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
}

```

# This document is for Vue-3 specific syntax

### Setup Template Attribute Syntax

⚠️ This feature is still a WIP, and is an active RFC. [Follow the conversation](https://github.com/vuejs/rfcs/pull/182) to stay up to date with the lifecycle.

This provides a better DX when using the setup function in Vue SFCs.
Type inference still works, and you don't need to use `defineComponent`..
It's important to note that this is just **syntactic sugar**, and still get's compiled down to a component
using `defineComponent` and the `setup` function.

```vue
<script setup lang="ts">
import { ref } from 'vue';

export const welcome = ref('Welcome to Vue 3 with TS!');
</script>
```

`props` and the `context` object work as well.
For TS inference, declare them using TS syntax.

```vue
<script setup="props, ctx" lang="ts">
import { computed } from 'vue'

declare const props: {
    name: string
}

export const welcome = computed(() => `Welcome, ${props.name}!`)
```

## Composition API

### Refs

Vue can infer the type of your `ref`'s but if you need to represent some more complex types you can do so with generics:

```ts
import {ref} from "vue"

interface PersonInfo { 
  firstName: string,
  surname: string,
  age: number
}

const people = ref<PersonInfo[]>([])

```

Alternatively you can use casting with `as`. This should be used if the type is unknown. Consider this example where we create a composition wrapper function around `fetch` and we dont know the data structure that will be returned.

```ts

import { ref, Ref } from "vue";

type ApiRequest = () => Promise<void>;

// When using this function we can supply the type via generics
export function useAPI<T>(url: RequestInfo, options?: RequestInit) {
  
  const response = ref() as Ref<T>;  // 👈 note we're typing our ref using `as`

  const request: ApiRequest = async () => {
    const resp = await fetch(url, options);
    const data = await resp.json();
    response.value = data;
  };

  return { response, request };
}

```

> 

# Other Vue + TypeScript resources
- Views on Vue podcast - https://devchat.tv/views-on-vue/vov-076-typescript-tell-all-with-jack-koppa/
- Focuses a lot on class components and vue-property-decorator - https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/
- Vue 3 Hooks and Type Safety with TypeScript - https://www.youtube.com/watch?v=aJdi-uEKYAc