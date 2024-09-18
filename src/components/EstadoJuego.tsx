import { useEffect, useState } from 'react';

const storageKey = 'maxRound-diff-';
const emojiList = ['😎', '😴', '😯', '🤬'];

export default function Contador({
  gameStatus,
  round,
  gameDifficulty
}: {
  gameStatus: myGameStatus;
  round: number;
  gameDifficulty: myDiffLevels;
}) {
  const [maxRound, setMaxRound] = useState(0);

  useEffect(() => {
    const maxRound = localStorage.getItem(storageKey + gameDifficulty);
    if (maxRound) setMaxRound(parseInt(maxRound));
  }, [gameDifficulty]);

  useEffect(() => {
    if (round > maxRound) {
      setMaxRound(round);
      localStorage.setItem(storageKey + gameDifficulty, round.toString());
    }
  }, [round, maxRound, gameDifficulty]);

  function selectEmoji() {
    switch (gameStatus) {
      case 'wait':
        return emojiList[1];
      case 'playing':
        return emojiList[2];
      case 'lost':
        return emojiList[3];
      default:
        return emojiList[0];
    }
  }

  function diffName() {
    switch (gameDifficulty) {
      case 0:
        return 'Facil';
      case 1:
        return 'Normal';
      case 2:
        return 'Dificil';
      case 3:
        return 'Locura';
    }
  }

  return (
    <li className="contador-container">
      <ul className="rounds">Ronda Actual: {round}</ul>
      <ul className="emoji-status">{selectEmoji()}</ul>
      <ul className="maxRounds">
        Ronda Maxima ({diffName()}): {maxRound}
      </ul>
    </li>
  );
}
