export const shakeDice = () => Math.ceil(Math.random() * 6);

export const initiateBoard = (players, dices) => {
  const board = Array(players).fill({}).map(() => ({
    score: 0,
    dices: Array(dices).fill(0).map(() => shakeDice()),
  }));

  return board;
};

export const evaluateBoard = (board) => {
  const movedBoard = {};
  const newBoard = board.map((player, index) => {
    let { score } = player;

    const newDices = player.dices.reduce((dices, dice) => {
      if (dice === 6) {
        score += 1;
        return dices;
      }

      if (dice === 1) {
        const nextPlayer = index + 1 >= board.length ? 0 : index + 1;
        movedBoard[nextPlayer] = (movedBoard[nextPlayer] || 0) + 1;
        return dices;
      }

      return [...dices, dice];
    }, []);

    return {
      score,
      dices: newDices,
      isOut: newDices.length === 0,
    };
  });
  Object.entries(movedBoard).forEach(([key, oneDices]) => {
    const player = newBoard[key];
    if (!player?.isOut) {
      player?.dices.push(...Array(oneDices).fill(1));
    }
  });
  const isDone = newBoard.filter((player) => !player.isOut).length === 1;

  return [newBoard, isDone];
};

export const playDiceOnBoard = (board) => board.map((player) => {
  const newDices = player.dices.map(() => shakeDice());

  return {
    score: player.score,
    dices: newDices,
  };
});

export const findWinner = (board) => {
  let winner = { score: 0, player: -1 };
  board.forEach((player, index) => {
    if (player.score > winner.score) {
      winner = {
        score: player.score,
        player: index + 1,
      };
    }
  });

  return winner;
};
