import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() {
  const names = ["Alice", "Bob", "Charlie"];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

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
      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}