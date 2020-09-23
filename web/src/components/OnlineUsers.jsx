import React, { useContext, useMemo } from 'react';
import { globalContext } from '../store';
import { Tooltip } from 'antd';

function OnlineUsers() {
  const {
    state: { onlineUsers },
  } = useContext(globalContext);

  const names = useMemo(
    () =>
      onlineUsers
        .slice(0, 2)
        .reduce((name, nick) => nick + ',' + name, '')
        .replace(/,$/, ''),
    [onlineUsers]
  );
  return <Tooltip title={onlineUsers.join(',')}>({names})</Tooltip>;
}

export default OnlineUsers;
