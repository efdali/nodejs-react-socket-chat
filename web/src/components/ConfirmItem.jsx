import React, { useContext, memo } from 'react';
import { globalContext } from '../store';
import { joinToChannel } from '../services/channelService';
import { newPrivateMessage } from '../services/channelService';
import { Popconfirm, message } from 'antd';

function ConfirmItem({ id, name, group, setModal }) {
  const {
    dispatch,
    state: { socket, activeChannel, user },
  } = useContext(globalContext);

  const title = group
    ? 'Are you sure want to join this channel?'
    : 'Are you sure you want to send message directly?';

  function confirm() {
    if (group) {
      joinToChannel(id)
        .then((channel) => {
          dispatch({ type: 'NEW_CHANNEL', channel });
          socket.current.emit('join channel', channel._id);
          message.success('Joined to channel', 2);
          if (setModal) {
            setModal(false);
          }
        })
        .catch((err) => message.error(err));
    } else {
      if (id === user.id) {
        return false;
      }
      newPrivateMessage(id, name).then((res) => {
        if (res.new) {
          dispatch({ type: 'NEW_CHANNEL', channel: res.channel });
          socket.current.emit('new private channel', id, res.channel);
          socket.current.emit('join channel', res.channel._id);
        }

        socket.current.emit(
          'change channel',
          activeChannel.id,
          res.channel._id
        );
        dispatch({
          type: 'CHANGE_CHANNEL',
          channel: { id: res.channel._id, name: res.channel.name },
        });
        if (setModal) {
          setModal(false);
        }
      });
    }
  }
  return (
    <React.Fragment>
      {group || id !== user.id ? (
        <Popconfirm
          title={title}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <a href="/" role="button">
            {name}
          </a>
        </Popconfirm>
      ) : (
        <a href="/" role="button" onClick={(e) => e.preventDefault()}>
          {name}
        </a>
      )}
    </React.Fragment>
  );
}

export default memo(ConfirmItem);
