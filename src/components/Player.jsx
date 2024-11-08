import { useRef, useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState('');
  const nameRef = useRef();

  function handleClick() {
    setPlayerName(nameRef.current.value);
    nameRef.current.value = '';
  }
  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'Unknown entity'}</h2>
      <p>
        <input
          ref={nameRef}
          type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
