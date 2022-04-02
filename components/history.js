import {
  Row, Typography, Col, List,
} from 'antd';

import BoardItem from './board-item';

function History({
  winner,
  histories,
  date,
}) {
  return (
    <div>
      <Row justify="center">
        <Col>
          <Typography.Title>Play Dice History</Typography.Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Typography.Text>{new Date(date).toDateString()}</Typography.Text>
        </Col>
      </Row>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={histories}
        renderItem={(history) => (
          <BoardItem history={history} />
        )}
      />
      {`Player #${winner.player} wins with score: ${winner.score}`}
    </div>
  );
}

export default History;
