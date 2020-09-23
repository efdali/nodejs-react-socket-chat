const Message = require('../models/Message');
const Group = require('../models/Group');
const mongoose = require('mongoose');
const asyncErrorWrapper = require('express-async-handler');
const index = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { limit = 20 } = req.query;
  const messages = await Message.find({ to: id })
    .populate('from')
    .sort('-sendAt')
    .limit(+limit);

  res
    .status(200)
    .json({ success: true, messages: messages.reverse() });
});

const newMessage = asyncErrorWrapper(async (req, res, next) => {
  const { to, message } = req.body;
  const from = req.user.id;
  await Message.create({ from, to, message });

  res.status(200).json({ success: true });
});

module.exports = { index, newMessage };
