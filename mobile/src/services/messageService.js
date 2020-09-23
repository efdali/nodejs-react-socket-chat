import fetcha from '../libs/fetch';

export const fetchMessages = (channelId) => {
  return fetcha(`/message/${channelId}?limit=15`, {}, 'messages');
};

export const sendMessage = (to, message) => {
  return fetcha(
    '/message/new',
    {
      method: 'POST',
      body: JSON.stringify({
        to,
        message,
      }),
    },
    'success',
  );
};
