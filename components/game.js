import { useState, useCallback } from 'react';
import {
  Button, Row, Typography, Col, List,
} from 'antd';

import {
  evaluateBoard, findWinner, initiateBoard, playDiceOnBoard,
} from '../lib/dices';
import BoardItem from './board-item';
import GameInput from './game-input';

const Winner = ({ board }) => {
  const winner = findWinner(board);

  return `Player #${winner.player} wins with score: ${winner.score}`;
};

function Game() {
  const [board, setBoard] = useState();
  const [histories, setHistories] = useState([]);
  const [isDone, setDone] = useState(false);

  const onFirstPlay = useCallback((values) => {
    const { players, dices } = values;
    const newBoard = initiateBoard(Number(players), Number(dices));
    const [evaluatedBoard, done] = evaluateBoard(newBoard);
    setDone(done);
    setBoard(evaluatedBoard);
    setHistories((prevHistories) => [...prevHistories, {
      index: 1,
      board: newBoard,
      evaluatedBoard,
    }]);
  }, [setBoard, setHistories]);

  const onPlay = () => {
    const newBoard = playDiceOnBoard(board);
    const [evaluatedBoard, done] = evaluateBoard(newBoard);
    setDone(done);
    setBoard(evaluatedBoard);
    setHistories((prevHistories) => [...prevHistories, {
      index: prevHistories.length + 1,
      board: newBoard,
      evaluatedBoard,
    }]);
  };

  return (
    <div>
      <Row justify="center">
        <Col>
          <Typography.Title>Play Dice</Typography.Title>
        </Col>
      </Row>
      <GameInput onFirstPlay={onFirstPlay} histories={histories} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={histories}
        renderItem={(history) => (
          <BoardItem history={history} />
        )}
      />
      <Row justify="center">
        <Col>
          {(histories.length > 0 && !isDone) && <Button type="primary" onClick={onPlay}>Play</Button>}
        </Col>
      </Row>
      {isDone && <Winner board={board} />}
    </div>
  );
}

export default Game;
