import {
  Row, Typography, Col, List, Card, Button,
} from 'antd';
import Link from 'next/link';

function HistoryList({
  histories,
}) {
  return (
    <div>
      <Row justify="center">
        <Col>
          <Typography.Title>Play Dice Histories</Typography.Title>
        </Col>
      </Row>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={histories}
        renderItem={(history) => (
          <Link href={`/histories/${history._id}`} passHref>
            <List.Item>
              <Card size="small" title={`Play #${history._id}`} style={{ width: 300 }}>
                <p>{new Date(history.modifiedAt).toDateString()}</p>
              </Card>
            </List.Item>
          </Link>
        )}
      />
      <Row justify="center">
        <Col>
          <Link href="/play" passHref><Button>Play New Game</Button></Link>
        </Col>
      </Row>
    </div>
  );
}

export default HistoryList;
