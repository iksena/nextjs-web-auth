import { Button, Form, Input } from 'antd';

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

export default GameInput;
