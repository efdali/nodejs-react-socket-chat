import React, { useContext, useRef, useEffect, useState, memo } from 'react';
import { globalContext } from '../store';
import { sendMessage } from '../services/messageService';
import { Layout, Form, Row, Col, Button, Input, List, message } from 'antd';
import NewGroupModal from './NewGroupModal';
import ChannelInfoModal from './ChannelInfoModal';
import ConfirmItem from './ConfirmItem';
import OnlineUsers from './OnlineUsers';
const { Content, Header } = Layout;

function Chat() {
  const {
    dispatch,
    state: { activeChannel, messages, user, socket },
  } = useContext(globalContext);

  const messageContainer = useRef();
  const [form] = Form.useForm();
  const msgInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function newMessageHandler(e) {
    const text = e.message;
    if (text.length === 0) return false;

    const newMessage = {
      message: text,
      to: activeChannel.id,
      viewed: false,
      from: user,
    };
    socket.current.emit('new message', newMessage);
    sendMessage(activeChannel.id, text)
      .then(() => {
        dispatch({
          type: 'ADD_MESSAGE',
          message: newMessage,
        });
        form.resetFields();
        msgInputRef.current.focus();
      })
      .catch((err) => message.error(err));
  }

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [messages]);

  return (
    <Content
      style={{
        margin: 0,
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header style={{ backgroundColor: '#ddd', padding: '0 10px' }}>
        <Row>
          <Col span="8">
            <div style={{ height: '18px' }}>
              <h3 style={{ display: 'inline-block' }}>
                {activeChannel ? activeChannel.name : 'Konuşma Başlatın'}
              </h3>
              {activeChannel && (
                <Button
                  type="ghost"
                  shape="circle"
                  style={{
                    marginLeft: '10px',
                    position: 'relative',
                    top: '4px',
                  }}
                  onClick={() => setShowDetails(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </Button>
              )}
            </div>
            <div style={{ fontSize: '11px', textIndent: '20px' }}>
              <OnlineUsers />
            </div>
          </Col>
          <Col span="5" offset="7">
            <span href="/" style={{ marginRight: '20px' }}>
              {user.nick}
              <a href="/logout">(Logout)</a>
            </span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              New Group
            </a>
          </Col>
        </Row>
        {showDetails && (
          <ChannelInfoModal visible={showDetails} setVisible={setShowDetails} />
        )}
        {showModal && (
          <NewGroupModal visible={showModal} setVisible={setShowModal} />
        )}
      </Header>
      <div
        style={{ flex: 1, overflowY: 'scroll' }}
        id="messageList"
        ref={messageContainer}
      >
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item>
              <List.Item.Meta
                title={
                  message.from._id !== user.id ? (
                    <ConfirmItem
                      id={message.from._id}
                      name={message.from.nick}
                      group={false}
                    />
                  ) : (
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      {message.from.nick}
                    </a>
                  )
                }
                description={message.message}
              />
            </List.Item>
          )}
        />
      </div>
      <Form form={form} onFinish={newMessageHandler}>
        <Row>
          <Col span="21">
            <Form.Item name="message" rules={[{ min: 1 }]}>
              <Input placeholder="your message" ref={msgInputRef} />
            </Form.Item>
          </Col>
          <Col span="1">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content>
  );
}

export default memo(Chat);
