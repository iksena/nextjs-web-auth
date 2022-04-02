import { useState } from 'react';
import {
  Form, Input, Button, Row, Typography, Col,
} from 'antd';
import Link from 'next/link';

function LoginForm() {
  const [isLogin, showLogin] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row justify="center">
        <Col>
          <Typography.Title>{isLogin ? 'Login' : 'Register'}</Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        {!isLogin && (
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email' },
          ]}
        >
          <Input />
        </Form.Item>
        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 15 }}
        >
          <Button type="primary" htmlType="submit" loading={false}>
            Submit
          </Button>
        </Form.Item>

      </Form>
      <Row justify="center">
        <Col>
          <Typography.Text onClick={() => showLogin((prevIsLogin) => !prevIsLogin)}>
            <Link href="/#login">{isLogin ? 'Register here' : 'Already registered? Login here'}</Link>
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
}

export default LoginForm;
