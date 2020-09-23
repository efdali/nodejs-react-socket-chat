import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { globalContext } from '../store';
import { Layout, Row, Col, Card, Form, Input, Button, message } from 'antd';
import { register } from '../services/userService';
const { Content } = Layout;

function Register() {
  const context = useContext(globalContext);
  const history = useHistory();
  if (context.state.isAuthenticated) {
    history.push('/');
  }

  function registerHandler(e) {
    const { nick, password, email } = e;
    message.loading({ content: 'Hesap oluşturuluyor.', key: 'message' });
    register(nick, email, password)
      .then(() => {
        message
          .success({
            content: 'Kayıt Başarılı.Giriş Sayfasına Yönlendiriliyorsunuz...',
            key: 'message',
            duration: 1,
          })
          .then(() => {
            history.push('/login');
          });
      })
      .catch((err) => message.error({ content: err, key: 'message' }));
  }

  return (
    <Content style={{ marginTop: '8%' }}>
      <Row type="flex" justify="center" align="middle">
        <Col sm={20} md={20} lg={8} xl={8}>
          <Card style={{ padding: '50px 0' }}>
            <Form labelCol={{ span: 4, offset: 0 }} onFinish={registerHandler}>
              <Form.Item
                label="nick"
                name="nick"
                rules={[{ required: true, message: 'Please input your nick!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Email is not valid',
                  },
                ]}
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
                  Register
                </Button>
                <a href="/login" style={{ marginLeft: '20px' }}>
                  Login?
                </a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}
//   return (
//     <div className="register">
//       <h1>Kayıt Ol</h1>
//       <form>
//         <input type="text" placeholder="nick" />
//         <input type="email" placeholder="email" />
//         <input type="password" placeholder="password" />
//         <input type="password" placeholder="password again" />
//         <button>Kayıt Ol</button>
//       </form>
//       <p>
//         Hesabın mı var? <a href="/login">Giriş Yap.</a>
//       </p>
//     </div>
//   );
// }

export default Register;
