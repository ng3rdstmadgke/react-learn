Propsでデータを表示する
---

- https://nextjs.org/learn/react-foundations/displaying-data-with-props

# Props


Reactコンポーネントにプロパティとして情報を渡すための仕組みが `props` です。


## propsを使ってみる


コンポーネントではHTML属性と同様にプロパティを指定することができます。

```jsx
function HomePage() {
  return (
    <div>
      <Header title="React" />
    </div>
  );
}
```

propsを渡されたコンポーネントは、それを関数の引数として受け取ることができます。


```jsx
function Header(props) {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

propsはオブジェクトなので分割代入が可能です。

```jsx
function Header({ title }) {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

## JSXでの変数の使用

### 1. 変数の展開には `{}` を使います。

```jsx
function Header(props) {
  return <h1>{props.title}</h1>;
}
```

### 2. テンプレートリテラル内での展開はJSと同じ

```jsx
function Header({ title }) {
  return <h1>{`Cool ${title}`}</h1>;
}
```

### 3. 関数の戻り値をそのまま展開

```jsx
function createTitle(title) {
  if (title) {
    return title;
  } else {
    return 'Default title';
  }
}
 
function Header({ title }) {
  return <h1>{createTitle(title)}</h1>;
}
```

### 4. 三項演算子

```jsx
function Header({ title }) {
  return <h1>{title ? title : 'Default Title'}</h1>;
}
```

```jsx
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
function HomePage() {
  return (
    <div>
      <Header />
      <Header title="React" />
    </div>
  );
}
```

## 配列の反復処理

```jsx
function HomePage() {
  const name = ["Ada Lovelance", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {
          names.map((name) => (
            <li>{name}</li>
          ))
        }
      </ul>
    </div>
  );
}
```

このコードを実行するとReactは `key` プロパティが不足しているという警告を出します。  
これは ReactがDOM内のどの要素を更新すべきかを判断するために配列要素を位置位に識別するなにかを必要としているからです。




```jsx
function HomePage() {
  const name = ["Ada Lovelance", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {
          names.map((name, i) => (
            <li key={i}>{name}</li>
          ))
        }
      </ul>
    </div>
  );
}
```