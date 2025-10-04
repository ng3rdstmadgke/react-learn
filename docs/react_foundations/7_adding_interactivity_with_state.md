状態によるインタラクティブ性の追加
---

- https://nextjs.org/learn/react-foundations/updating-state


# イベントのリスニング

`onClick` `onChange` `onSubmit` など、Reactでは、は、イベント名はキャメルケースで表記されます。


```jsx
function HomePage() {
  return (
    <div>
      <button onClick={}>Like</button>
    </div>
  );
}
```

# イベントの処理

イベントにはイベントハンドラを設定することができます。

```jsx
function HomePage() {

  // イベントハンドラ
  function handleClick() {
    console.log('increment like count');
  }
 
  return (
    <div>
      {/* handleCheck イベントハンドラを設定 */}
      <button onClick={handleClick}>Like</button>
    </div>
  );
}
```

# 状態とフック

- [Using Hooks | React](https://react.dev/learn#using-hooks)

Reactにはフックと呼ばれる一連の関数があります。フックを使用すると、コンポーネントに状態などの追加ロジックを実装できます。  
例えば、イイネボタンのクリック回数を保存・インクリメントするには `state` を利用できます。状態を管理するReactフックは `useState()` と呼ばれます。


`React.useState()` の引数

1. デフォルト値

`React.useState()` の戻り値

1. 最初の要素は状態( `value` )であり、任意の名前をつけることができます。
2. 2番目の要素は状態を更新する関数( `update` )で、任意の名前をつけることができます。(一般的に `value` の名称の先頭に `set` をつけます。)

```jsx
function HomePage() {
  const [likes, setLikes] = React.useState(0);
}
```

`onClick` イベントで `likes` ステートの値を更新するイベントハンドラ `handleClick` を実装します。


```jsx
function HomePage() {
  const [likes, setLikes] = React.useState(0);
 
  function handleClick() {
    setLikes(likes + 1);
  }
 
  return (
    <div>
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  );
}
```