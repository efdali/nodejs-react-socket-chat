import React, { useCallback, useContext, memo } from 'react';
import { globalContext } from '../store';
import { newChannel } from '../services/channelService';
import { Modal, Form, Input, Button, message } from 'antd';

function NewGroupModal({ visible, setVisible }) {
  const { dispatch } = useContext(globalContext);

  const newGroupHandler = useCallback(
    (e) => {
      const name = e.name;
      newChannel(name)
        .then((channel) => {
          dispatch({ type: 'NEW_CHANNEL', channel });
          message.success('Channel Created').then(setVisible(false));
        })
        .catch((err) => message.error(err));
    },
    [dispatch, setVisible]
  );

  return (
    <Modal
      title="New Group Details"
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={newGroupHandler}
    >
      <Form onFinish={newGroupHandler}>
        <Form.Item
          name="name"
          rules={[{ required: true, min: 5 }]}
          label="Group Name"
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(NewGroupModal);
