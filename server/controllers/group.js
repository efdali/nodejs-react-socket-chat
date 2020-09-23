const Group = require('../models/Group');
const asyncErrorWrapper = require('express-async-handler');

const index = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;

  const groups = await Group.find(
    { users: { $in: id } },
    { name: 1 },
  );

  res.status(200).json({ success: true, channels: groups });
});
const groupInfo = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const details = await Group.findById(id).populate({
    path: 'users',
    match: { _id: { $ne: req.user.id } },
  });

  res.status(200).json({ success: true, details });
});
const newChannel = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { name, subject, desc } = req.body;

  const group = await Group.create({
    name,
    users: [id],
    subject,
    description: desc,
  });

  res.status(200).json({ success: true, group });
});

const newPrivateChannel = asyncErrorWrapper(
  async (req, res, next) => {
    const { id, nick } = req.user;
    const { user, toNick } = req.body;

    const find = await Group.findOne({
      private: true,
      $or: [
        { name: `${nick} - ${toNick}` },
        { name: `${toNick} - ${nick}` },
      ],
    });
    if (find) {
      return res
        .status(200)
        .json({ success: true, new: false, group: find });
    }
    const group = await Group.create({
      name: `${nick} - ${toNick}`,
      private: true,
      users: [id, user],
    });

    res.status(200).json({ success: true, new: true, group });
  },
);
const joinToChannel = asyncErrorWrapper(async (req, res, next) => {
  const { channelId } = req.params;
  const { id } = req.user;

  const group = await Group.findOneAndUpdate(
    { _id: channelId, private: false },
    { $addToSet: { users: id } },
  );

  res.status(200).json({ success: true, group });
});

const searchWithName = asyncErrorWrapper(async (req, res, next) => {
  const { s } = req.query;
  const groups = await Group.find({
    name: new RegExp(s, 'i'),
    users: { $ne: req.user.id },
    private: false,
  });

  res.status(200).json({ success: true, groups });
});

module.exports = {
  index,
  groupInfo,
  newChannel,
  newPrivateChannel,
  joinToChannel,
  searchWithName,
};
