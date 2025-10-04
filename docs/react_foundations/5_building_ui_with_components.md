コンポーネントを使ったUIの構築
---

- https://nextjs.org/learn/react-foundations/building-ui-with-components
- [ソースコード](../../react_foundations/5_building_ui_with_components/)




# Reactのコアコンセプト

- Component
- Props
- State



# Component

ReactではコンポーネントはUI要素(JSX)を返す関数です。

関数の定義と呼び出しには、いくつかの決まりがあります

1. Reactコンポーネントは大文字から始める必要があります。
  - `function Header() { return <h1>Hello</h1> }`
1. Reactコンポーネントは `<Header />` のように呼び出します。

`component_1.html`
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
      const app = document.getElementById("app");

      // React Component
      function Header() {
        return <h1>Develop. Preview. Ship.</h1>;
      }

      const root = ReactDOM.createRoot(app);

      root.render(<Header />);
    </script>
  </body>
</html>
```


## コンポーネントのネスト

Reactコンポーネントはネストすることも可能です。

`component_2.html`
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
      const app = document.getElementById("app");

      // React Component
      function Header() {
        return <h1>Develop. Preview. Ship.</h1>;
      }

      function HomePage() {
        return <div>
          {/* JSX のコメント */}
          <Header />
        </div>
      }

      const root = ReactDOM.createRoot(app);

      root.render(<HomePage />);
    </script>
  </body>
</html>
```