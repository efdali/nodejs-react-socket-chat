import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { globalContext } from '../store';
import { Layout, Row, Col, Card, Form, Input, Button, message } from 'antd';
import { login } from '../services/userService';
const { Content } = Layout;

function Login() {
  const context = useContext(globalContext);
  const history = useHistory();
  useEffect(() => {
    if (context.state.isAuthenticated) {
      history.push('/');
    }
  }, [history, context.state.isAuthenticated]);

  function loginHandler(e) {
    const { nick, password } = e;
    message.loading({ content: 'Giriş Yapılıyor.', key: 'message' });
    login(nick, password)
      .then((token) => {
        localStorage.setItem('token', token);
        context.dispatch({ type: 'LOGIN', user: token });
        message.success({
          content: 'Giriş Başarılı.Yönlendiriliyorsunuz...',
          key: 'message',
          duration: 1,
        });
      })
      .catch((err) => message.error({ content: err, key: 'message' }));
  }
  return (
    <Content style={{ marginTop: '8%' }}>
      <Row type="flex" justify="center" align="middle">
        <Col sm={20} md={20} lg={8} xl={8}>
          <Card style={{ padding: '50px 0' }}>
            <Form labelCol={{ span: 4, offset: 0 }} onFinish={loginHandler}>
              <Form.Item
                label="nick"
                name="nick"
                rules={[{ required: true, message: 'Please input your nick!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <a href="/register" style={{ marginLeft: '20px' }}>
                  Register?
                </a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default Login;
