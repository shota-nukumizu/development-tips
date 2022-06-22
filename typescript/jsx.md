# JSX(JavaScript XML)とは

```jsx
// jsxの場合
function render() {
    return (
        <h1>Hello World</h1>
    )
}
```

```tsx
declare module JSX {
    interface IntrinsicElements {
        a: React.HTMLAttributes;
        abbr: React.HTMLAttributes;
        div: React.HTMLAttributes;
        span: React.HTMLAttributes;

        /// などなど
    }
}
```

```tsx
type Props = {
  foo: string;
}
const MyComponent: React.FC<Props> = (props) => {
    return <span>{props.foo}</span>
}

<MyComponent foo="bar" />
```

```tsx
type Props = {
  foo: string;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>
    }
}

<MyComponent foo="bar" />
```