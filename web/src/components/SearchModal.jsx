import React, { memo } from 'react';
import { Row, Modal } from 'antd';
import ConfirmItem from './ConfirmItem';

function SearchModal({ showModal, setModal, groups, users }) {
  return (
    <Modal
      title="User and groups"
      visible={showModal}
      onOk={() => setModal(false)}
      onCancel={() => setModal(false)}
    >
      <h1>Gruplar</h1>
      <div>
        {groups ? (
          groups.map((g) => (
            <Row key={g._id}>
              <ConfirmItem id={g._id} name={g.name} group setModal={setModal} />
            </Row>
          ))
        ) : (
          <p>Channel not found</p>
        )}
      </div>
      <h1>Kullanıcılar</h1>
      <div>
        {users ? (
          users.map((u) => (
            <Row key={u._id}>
              <ConfirmItem
                id={u._id}
                name={u.nick}
                group={false}
                setModal={setModal}
              />
            </Row>
          ))
        ) : (
          <p>User not found</p>
        )}
      </div>
    </Modal>
  );
}

export default memo(SearchModal);
