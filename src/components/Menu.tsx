import useSound from 'use-sound';
import '../assets/Menu.css';

export default function Menu({
  onClickStart,
  gameDifficulty,
  setGameDifficulty
}: {
  onClickStart: () => void;
  gameDifficulty: myDiffLevels;
  setGameDifficulty: (difficulty: myDiffLevels) => void;
}) {
  const [pickMinecraftSound] = useSound('/sounds/pickMinecraftSound.mp3');

  function difficultyClick(index: myDiffLevels) {
    pickMinecraftSound();
    setGameDifficulty(index);
  }

  return (
    <div className="menu">
      <h1>Menu</h1>
      <ul className="menu-difficulty">
        <li>
          <button
            className={`diff ${gameDifficulty === 0 ? 'diff-active' : ''}`}
            onClick={() => difficultyClick(0)}
          >
            Facil
          </button>
        </li>
        <li>
          <button
            className={`diff ${gameDifficulty === 1 ? 'diff-active' : ''}`}
            onClick={() => difficultyClick(1)}
          >
            Normal
          </button>
        </li>
        <li>
          <button
            className={`diff ${gameDifficulty === 2 ? 'diff-active' : ''}`}
            onClick={() => difficultyClick(2)}
          >
            Dificil
          </button>
        </li>
        <li>
          <button
            className={`diff ${gameDifficulty === 3 ? 'diff-active' : ''}`}
            onClick={() => difficultyClick(3)}
          >
            Locura
          </button>
        </li>
      </ul>
      <button className="menu-start" onClick={onClickStart}>
        Iniciar
      </button>
    </div>
  );
}
