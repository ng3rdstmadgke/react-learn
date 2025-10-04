import LikeButton from './components/like-button';

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() {
  const names = ["Alice", "Bob", "Charlie"];

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
      <LikeButton />
    </div>
  )
}