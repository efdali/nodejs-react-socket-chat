import React, { useContext, useState, memo } from 'react';
import { searchChannel } from '../services/channelService';
import { searchUser } from '../services/userService';
import { globalContext } from '../store';
import SearchModal from '../components/SearchModal';
import { Layout, Form, Input, List, Avatar, message } from 'antd';

const { Sider } = Layout;
function Channels() {
  const {
    dispatch,
    state: { channels, activeChannel },
  } = useContext(globalContext);

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setModal] = useState(false);

  function searchHandler(e) {
    setModal(true);
    searchChannel(e.search)
      .then((res) => setGroups(res))
      .catch((err) => message.error(err));

    searchUser(e.search)
      .then((res) => setUsers(res))
      .catch((err) => message.error(err));
  }
  function changeChannel(e, item) {
    e.preventDefault();
    if (activeChannel.id === item._id) {
      return;
    }
    dispatch({
      type: 'CHANGE_ACTIVE_CHANNEL',
      channel: { id: item._id, name: item.name },
    });
  }

  return (
    <Sider
      width="300"
      style={{
        backgroundColor: '#fff',
        padding: 10,
        overflowY: 'scroll',
      }}
    >
      <Form onFinish={searchHandler}>
        <Form.Item name="search">
          <Input.Search
            placeholder="user or group"
            name="query"
            minLength="3"
          />
        </Form.Item>
      </Form>

      <SearchModal
        showModal={showModal}
        setModal={setModal}
        groups={groups}
        users={users}
      />
      <List
        itemLayout="horizontal"
        dataSource={channels}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <a
                  role="button"
                  href="/"
                  onClick={(e) => changeChannel(e, item)}
                >
                  {item.name}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </Sider>
  );
}

export default memo(Channels);
