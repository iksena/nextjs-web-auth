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
    };
  });
  Object.entries(movedBoard).forEach(([key, oneDices]) => {
    newBoard[key]?.dices.push(...Array(oneDices).fill(1));
  });

  return newBoard;
};

export const playDiceOnBoard = (board) => board.map((player) => {
  const newDices = player.dices.map(() => shakeDice());

  return {
    score: player.score,
    dices: newDices,
  };
});
