import React, { useContext, useState, useEffect, memo } from 'react';
import { globalContext } from '../store';
import { getChannelInfo } from '../services/channelService';
import ConfirmItem from './ConfirmItem';
import { Modal, Row, message } from 'antd';

function ChannelInfoModal({ visible, setVisible }) {
  const {
    state: { activeChannel },
  } = useContext(globalContext);

  const [details, setDetails] = useState({});

  useEffect(() => {
    getChannelInfo(activeChannel.id)
      .then((details) => {
        setDetails(details);
      })
      .catch((err) => message.error(err));
  }, [activeChannel.id]);

  return (
    <Modal
      title="Grup Details"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <h1>{activeChannel.name}</h1>
      <hr />
      {details.users ? (
        details.users.map((u) => (
          <Row key={u._id}>
            <ConfirmItem
              id={u._id}
              name={u.nick}
              group={false}
              setModal={setVisible}
            />
          </Row>
        ))
      ) : (
        <p>User not found</p>
      )}
    </Modal>
  );
}

export default memo(ChannelInfoModal);
