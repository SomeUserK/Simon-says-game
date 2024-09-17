import { useEffect, useState } from 'react';

const storageKey = 'maxRound';
const emojiList = ['😎', '😴', '😯', '🤬'];

export default function Contador({
  gameStatus,
  round
}: {
  gameStatus: myGameStatus;
  round: number;
}) {
  const [maxRound, setMaxRound] = useState(0);

  useEffect(() => {
    const maxRound = localStorage.getItem(storageKey);
    if (maxRound) setMaxRound(parseInt(maxRound));
  }, []);

  useEffect(() => {
    if (round > maxRound) {
      setMaxRound(round);
      localStorage.setItem(storageKey, round.toString());
    }
  }, [round, maxRound]);

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

  return (
    <li className="contador-container">
      <ul className="rounds">Ronda: {round}</ul>
      <ul className="emoji-status">{selectEmoji()}</ul>
      <ul className="maxRounds">Ronda Maxima: {maxRound}</ul>
    </li>
  );
}
