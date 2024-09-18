import '../assets/Juego.css';
import { useEffect, useReducer, useState } from 'react';
import ButSimon from './ButSimon';
import ButReintentar from './ButIniciar';
import EstadoJuego from './EstadoJuego';
import useSound from 'use-sound';

const colors = ['green', 'red', 'yellow', 'blue'];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Juego({
  gameStatus,
  gameDifficulty,
  setGameStatus
}: {
  gameStatus: myGameStatus;
  gameDifficulty: myDiffLevels;
  setGameStatus: React.Dispatch<React.SetStateAction<myGameStatus>>;
}) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [round, setRound] = useState(0);
  const [simonActive, setSimonActive] = useState<null | number>(null);
  const [simonActiveDelay, setSimonActiveDelay] = useState(500);
  const [noNewGameTimeout, setNoNewGameTimeout] = useState<number | null>(null);

  const [playSimonSound1] = useSound('/sounds/simonSound1.mp3', { volume: 3 });
  const [playSimonSound2] = useSound('/sounds/simonSound2.mp3', { volume: 3 });
  const [playSimonSound3] = useSound('/sounds/simonSound3.mp3', { volume: 3 });
  const [playSimonSound4] = useSound('/sounds/simonSound4.mp3', { volume: 3 });
  const [playLosingRound] = useSound('/sounds/losingRound.mp3', { volume: 5 });
  const [playEndingRound] = useSound('/sounds/endingRound.mp3');

  function simonPlaySound(index: number) {
    switch (index) {
      case 0:
        playSimonSound1();
        break;
      case 1:
        playSimonSound2();
        break;
      case 2:
        playSimonSound3();
        break;
      case 3:
        playSimonSound4();
    }
  }

  function newGame() {
    const newSequense = [getRandom(0, 3)];

    if (gameStatus === 'starting') return;
    if (noNewGameTimeout) clearTimeout(noNewGameTimeout);

    setGameStatus('starting');
    setSequence(newSequense);
    setRound(1);
    setCurrent(0);

    doAnimation(newSequense, false, true);
  }

  function roundPass() {
    playEndingRound();
    setRound(round + 1);
    setCurrent(0);
    setGameStatus('wait');
    const newSequense = [...sequence, getRandom(0, 3)];
    setSequence(newSequense);

    doAnimation(newSequense, true);
  }

  function roundLost() {
    playLosingRound();
    setCurrent(0);
    setRound(0);
    setSequence([]);
    setGameStatus('lost');
    setSimonActive(null);
    setNoNewGameTimeout(
      setTimeout(() => {
        setGameStatus('off');
      }, 6 * 1000)
    );
  }

  function simonClick(index: number) {
    if (gameStatus !== 'playing') return;
    const myCurrent = current;

    setCurrent(myCurrent + 1);
    setSimonActive(index);
    simonPlaySound(index);

    if (sequence[myCurrent] === index) {
      if (sequence.length - 1 === myCurrent) {
        roundPass();
      }
      setTimeout(() => {
        if (myCurrent === current) setSimonActive(null);
      }, simonActiveDelay);
    } else {
      roundLost();
    }
  }

  async function doAnimation(
    theSequence: number[],
    isNewRound = false,
    isNewGame = false
  ) {
    if (isNewRound) await delay(200);
    if (isNewGame) await delay(800);

    for (let index = 0; index < theSequence.length; index++) {
      await delay(simonActiveDelay);
      setSimonActive(theSequence[index]);
      simonPlaySound(theSequence[index]);
      if (theSequence[index + 1] === theSequence[index]) {
        await delay(simonActiveDelay / 2);
        setSimonActive(null);
      }
    }
    await delay(simonActiveDelay);
    if (gameStatus === 'off') return;
    setSimonActive(null);
    setGameStatus('playing');
  }

  function goBack() {
    if (noNewGameTimeout) clearTimeout(noNewGameTimeout);
    setGameStatus('off');
  }

  useEffect(() => {
    switch (gameDifficulty) {
      case 1:
        setSimonActiveDelay(500);
        break;
      case 2:
        setSimonActiveDelay(300);
        break;
      case 3:
        setSimonActiveDelay(100);
        break;

      default:
        setSimonActiveDelay(700);
        break;
    }

    newGame();
  }, [gameDifficulty]);

  return (
    <div className="container-game">
      <EstadoJuego
        gameStatus={gameStatus}
        round={round}
        gameDifficulty={gameDifficulty}
      ></EstadoJuego>
      <main className="container-simon">
        <ButReintentar onClick={newGame}></ButReintentar>
        <div className="container-buttons">
          {colors.slice(0, 4).map((color, index) => (
            <ButSimon
              key={index}
              isActive={simonActive === index}
              color={color}
              onClick={() => simonClick(index)}
            />
          ))}
        </div>
      </main>
      <button className="butback" onClick={goBack}>
        Volver
      </button>
    </div>
  );
}

export default Juego;
