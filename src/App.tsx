import { useState } from 'react';
import './assets/App.css';
import Simon from './components/Simon';
import ButIniciar from './components/ButIniciar';

const colors = ['green', 'red', 'yellow', 'blue'];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [gameStatus, setGameStatus] = useState('off');
  const [round, setRound] = useState(0);
  const [simonActive, setSimonActive] = useState<null | number>(null);

  async function roundPass(newGame = false) {
    const nuevaSecuencia = newGame
      ? [getRandom(0, 3), getRandom(0, 3), getRandom(0, 3)]
      : [...sequence, getRandom(0, 3)];
    setSequence(nuevaSecuencia);
    setRound(newGame ? 1 : round + 1);
    setCurrent(0);
    setGameStatus('wait');

    for (let index = 0; index < nuevaSecuencia.length; index++) {
      await delay(700);
      console.log(nuevaSecuencia[index]);
      setSimonActive(nuevaSecuencia[index]);
    }
    await delay(700);
    setSimonActive(null);
    setGameStatus('playing');
  }

  function roundLost() {
    setCurrent(0);
    setRound(0);
    setSequence([]);
    alert('Perdiste la ronda');
  }

  return (
    <>
      <h1 className="title">Simon Game</h1>
      <p className="points">Rondas: {round}</p>
      <main className="container-simon">
        <ButIniciar onClick={() => roundPass(true)}></ButIniciar>
        <div className="container-buttons">
          {colors.map((color, index) => (
            <Simon
              key={index}
              isActive={simonActive === index}
              color={color}
              onClick={() => {
                if (gameStatus !== 'playing') return;
                if (sequence[current + 1] === index) {
                  if (!sequence[current + 2]) {
                    roundPass();
                  }
                } else {
                  roundLost();
                }
                setCurrent(current + 1);
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
