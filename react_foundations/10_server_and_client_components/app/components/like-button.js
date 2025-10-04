'use client';  // クライアント側でコンポーネントをレンダリングすることを明示

import { useState } from 'react';


export default function LikeButton() {

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return <button onClick={handleClick}>like ({likes})</button>;

}