Reactを始めよう
---

- https://nextjs.org/learn/react-foundations/getting-started-with-react
- [ソースコード](../../react_foundations/4_getting_started_with_react/)


# 初めてのReact



`index.html`
```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/javascript">
      const app = document.getElementById('app');
      const header = document.createElement('h1');
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);
      header.appendChild(headerContent);
      app.appendChild(header);
    </script>
  </body>
</html>
```

プレーンなJavaScriptでDOMを操作する代わりに、 `ReactDOM.createRoot()` を使用して特定のDOM要素をターゲットにして、Reactコンポーネントを表示するためのルートを作成します。
次に `root.render()` でReactコードをDOMにレンダリングします。




`index.html`
```html
<html>
  <body>
    <div id="app"></div>
    <!-- Load React. -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/jsx">
      const domNode = document.getElementById("app");
      const root = ReactDOM.createRoot(domNode);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```

このコードをブラウザで実行しようとするとエラーが発生します。

```bash
Uncaught SyntaxError: expected expression, got '<'
```

この部分が有効なJavaScriptではないからです。このコードはJSXです。


```
<h1>Develop. Preview. Ship.</h1>
```


## JSXとは

JSXは "JavaScript XML" の略で、JavaScriptの構文を拡張したものです。これにより、JavaScriptのコード内にHTMLのようなマークアップを記述することができます。
もともとはReactのために開発されましたが、現在は他のフレームワークでも利用されています。

### 仕組み
JSXで書かれたコードは、ブラウザで直接実行されるわけではありません。BabelのようなトランスパイラによってJavaScript（具体的には `React.createElement()` という関数呼び出し）に変換されてから実行されます。


### Reactとの関係

Reactにおいて必須ではないですが、コンポーネントの構造を視覚的にわかりやすく記述できため、一般的には採用されます。使わない場合は `React.createElement()` を何度も呼び出すことになります。


### 基本的な構文ルール

[The Rules of JSX](https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx)


1. 単一のルート要素を返す。
    - 複数の要素となる場合はそれを `<div>` などでラッピングする必要があります。
2. すべてのタグを閉じる
    - `<img>` は `<img />` と記述する必要があります。
    - `<li>orange` は `<li>orange</li>` と記述する必要があります。
3. すべてのものをキャメルケースで記述
    - JSXはトランスパイルされるとJavaScriptオブジェクトのキーとなるためです。
    - ただし、 `aria-*` `data-*` 属性はHTMLのダッシュを使って記述されます。

## Babelを追加する

`index.html`
```html
<html>
  <body>
    <div id="app"></div>
    <!-- Load React. -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Load Babel Compiler. -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/jsx">
      const domNode = document.getElementById("app");
      const root = ReactDOM.createRoot(domNode);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```