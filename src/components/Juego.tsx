import { useReducer, useState } from 'react';
import ButSimon from './ButSimon';
import ButIniciar from './ButIniciar';
import EstadoJuego from './EstadoJuego';
import useSound from 'use-sound';

const colors = ['green', 'red', 'yellow', 'blue'];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Juego() {
  const [gameStatus, setGameStatus] = useState<myGameStatus>('off');
  const [sequence, setSequence] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [round, setRound] = useState(0);
  const [simonActive, setSimonActive] = useState<null | number>(null);
  const [simonActiveDelay] = useState(500);
  const [noNewGameTimeout, setNoNewGameTimeout] = useState<number | null>(null);

  const [playSimonSound1] = useSound('/sounds/simonSound1.mp3');
  const [playSimonSound2] = useSound('/sounds/simonSound2.mp3');
  const [playSimonSound3] = useSound('/sounds/simonSound3.mp3');
  const [playSimonSound4] = useSound('/sounds/simonSound4.mp3');
  const [playLosingRound] = useSound('/sounds/losingRound.mp3');
  const [playEndingRound] = useSound('/sounds/endingRound.mp3');

  // async function roundPass(newGame = false) {
  //   setGameStatus('wait');
  //   const nuevaSecuencia = newGame
  //     ? [getRandom(0, 3), getRandom(0, 3), getRandom(0, 3)]
  //     : [...sequence, getRandom(0, 3)];
  //   setSequence(nuevaSecuencia);
  //   setRound(newGame ? 1 : round + 1);
  //   setCurrent(0);

  //   console.log(nuevaSecuencia, 'nuevaSecuencia');
  //   console.log(sequence, 'sequence');
  //   for (let index = 0; index < nuevaSecuencia.length; index++) {
  //     await delay(initialDelay);
  //     if (gameStatus !== 'wait') return;
  //     setSimonActive(nuevaSecuencia[index]);
  //   }
  //   await delay(initialDelay);
  //   setSimonActive(null);
  //   setGameStatus('playing');
  // }

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

    doAnimation(newSequense);
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
      }, 3000)
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

  async function doAnimation(sequence: number[], newRound = false) {
    if (newRound) await delay(200);

    for (let index = 0; index < sequence.length; index++) {
      await delay(simonActiveDelay);
      setSimonActive(sequence[index]);
      simonPlaySound(sequence[index]);
      if (sequence[index + 1] === sequence[index]) {
        await delay(simonActiveDelay / 2);
        setSimonActive(null);
      }
    }
    await delay(simonActiveDelay);
    setSimonActive(null);
    setGameStatus('playing');
  }

  return (
    <>
      <EstadoJuego gameStatus={gameStatus} round={round}></EstadoJuego>
      <main className="container-simon">
        <ButIniciar onClick={newGame}></ButIniciar>
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
    </>
  );
}

export default Juego;
