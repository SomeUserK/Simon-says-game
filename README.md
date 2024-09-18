# Simon Says Game
![](https://img.shields.io/badge/Dev-Kevin%20A.-darkred)

> Simon says es un juego de memoria el cual es jugador debe cumplir con un patron al azar que genera el juego

Éste juego funciona a traves de usos de estados, en este caso el estado más importante es el `gameStatus` ya que determina el estado total que mantiene el juego, declaracion:
```typescript
const [gameStatus, setGameStatus] = useState<myGameStatus>('off');
```

Como se puede apreciar dentro de los <>, utiliza un tipo especial (declarado en `src/types.d.ts`) el cual sirve para limitar a la hora de programacion, transpilacion y depuracion los valores que pueda llegar a obtener `gameStatus`. 
Sus valores pueden ser unicamente:
```typescript
declare type myGameStatus = 'off' | 'newgame' | 'starting' |'wait' | 'playing' | 'lost';
```

El poder poner tipos a variables es una de las ventajas de [typescript](https://www.typescriptlang.org/)

Otro uso de estado relevante en el juego, es el `gameDifficulty`, ya que determina el nivel que jugara el usuario, y se vuelve una constante a la hora de iniciar el juego

Su declaracion es la siguiente:
```typescript
declare type myDiffLevels = 0 | 1 | 2 | 3; 
// 0: facil, 1: normal, 2: dificil, 3: locura
```

Dentro del juego, la funcion más relevante puede llegar a ser `doAnimation`:
```typescript
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
```
Esto debido a que la funcion se encarga de bloquear la entrada del usuario y ejecutar una animacion activando botones segun la secuencia de forma asyncrona y al terminar, vuelve a habilitar la entrada del usuario modificando `gameStatus`