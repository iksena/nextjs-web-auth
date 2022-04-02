import { useState, useCallback } from 'react';
import {
  Form, Input, Button, Row, Typography, Col, Card, List,
} from 'antd';

import {
  evaluateBoard, findWinner, initiateBoard, playDiceOnBoard,
} from '../lib/dices';

function GameInput({ onFirstPlay, histories }) {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFirstPlay}
      autoComplete="off"
    >
      <Form.Item
        label="Players"
        name="players"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Dices"
        name="dices"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {histories.length === 0 && (
      <Form.Item
        wrapperCol={{ offset: 15 }}
      >
        <Button type="primary" htmlType="submit" loading={false}>
          Start Playing
        </Button>
      </Form.Item>
      )}
    </Form>
  );
}

function BoardItem({
  history,
}) {
  const { index, board, evaluatedBoard } = history;
  return (
    <List.Item>
      <Card size="small" title={`Play #${index}`} style={{ width: 300 }}>
        {board.map((player, number) => <p key={number}>{`Player #${number + 1} (${player.score}): ${player.dices}`}</p>)}
      </Card>
      <Card size="small" title={`Evaluation #${index}`} style={{ width: 300 }}>
        {evaluatedBoard.map((player, number) => <p key={number}>{`Player #${number + 1} (${player.score}): ${player.dices}`}</p>)}
      </Card>
    </List.Item>
  );
}

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
