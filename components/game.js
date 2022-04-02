import { useState, useCallback } from 'react';
import {
  Form, Input, Button, Row, Typography, Col, Card, List,
} from 'antd';

import { evaluateBoard, initiateBoard, playDiceOnBoard } from '../lib/dices';

function GameInput({ onFirstPlay }) {
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
      <Form.Item
        wrapperCol={{ offset: 15 }}
      >
        <Button type="primary" htmlType="submit" loading={false}>
          Start Playing
        </Button>
      </Form.Item>
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
        {board.map((player, number) => <p key={number}>{`Player #${number} (${player.score}): ${player.dices}`}</p>)}
      </Card>
      <Card size="small" title={`Evaluation #${index}`} style={{ width: 300 }}>
        {evaluatedBoard.map((player, number) => <p key={number}>{`Player #${number} (${player.score}): ${player.dices}`}</p>)}
      </Card>
    </List.Item>
  );
}

function Game() {
  const [board, setBoard] = useState();
  const [histories, setHistories] = useState([]);

  const onFirstPlay = useCallback((values) => {
    const { players, dices } = values;
    const newBoard = initiateBoard(Number(players), Number(dices));
    const evaluatedBoard = evaluateBoard(newBoard);
    setBoard(evaluatedBoard);
    setHistories((prevHistories) => [...prevHistories, {
      index: 1,
      board: newBoard,
      evaluatedBoard,
    }]);
  }, [setBoard, setHistories]);

  const onPlay = () => {
    const newBoard = playDiceOnBoard(board);
    const evaluatedBoard = evaluateBoard(newBoard);
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
      <GameInput onFirstPlay={onFirstPlay} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={histories}
        renderItem={(history) => (
          <BoardItem history={history} />
        )}
      />
      <Button type="default" loading={false} onClick={onPlay}>Play</Button>
    </div>
  );
}

export default Game;
