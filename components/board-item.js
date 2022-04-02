import { Card, List } from 'antd';

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

export default BoardItem;
