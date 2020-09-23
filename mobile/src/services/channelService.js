import fetcha from '../libs/fetch';

export const fetchChannels = () => {
  return fetcha('/group', {}, 'channels');
};

export const searchChannel = (s) => {
  return fetcha(`/group/search?s=${s}`, {}, 'groups');
};

export const joinToChannel = (id) => {
  return fetcha(
    `/group/join/${id}`,
    {
      method: 'PUT',
    },
    'group',
  );
};

export const newPublicChannel = (name, subject, desc) => {
  return fetcha(
    '/group/new/public',
    {
      method: 'POST',
      body: JSON.stringify({ name, subject, desc }),
    },
    'group',
  );
};

export const newPrivateChannel = (id, nick) => {
  return fetcha('/group/new/private', {
    method: 'POST',
    body: JSON.stringify({ user: id, toNick: nick }),
  });
};

export const getChannelDetails = (id) => {
  return fetcha(`/group/${id}`, {}, 'details');
};
