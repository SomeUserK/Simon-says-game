import { useState } from 'react';
import Juego from './components/Juego';
import Menu from './components/Menu';
import './assets/App.css';

function App() {
  const [gameStatus, setGameStatus] = useState<myGameStatus>('off');
  const [gameDifficulty, setGameDifficulty] = useState<myDiffLevels>(1);

  return (
    <>
      <h1 className="title">Simon Says</h1>
      {gameStatus === 'off' ? (
        <Menu
          onClickStart={() => setGameStatus('newgame')}
          gameDifficulty={gameDifficulty}
          setGameDifficulty={setGameDifficulty}
        ></Menu>
      ) : (
        <Juego
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          gameDifficulty={gameDifficulty}
        />
      )}
    </>
  );
}

export default App;
