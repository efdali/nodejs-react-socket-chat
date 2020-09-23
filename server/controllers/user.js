const User = require('../models/User');
const Group = require('../models/Group');
const asyncErrorWrapper = require('express-async-handler');
const {
  validateInput,
  comparePassword,
} = require('../helpers/input/inputHelpers');
const CustomError = require('../helpers/error/CustomError');

//api/user/register
const register = asyncErrorWrapper(async (req, res) => {
  const { nick, email, password } = req.body;

  const user = await User.create({
    nick,
    email,
    password,
  });

  await Group.findOneAndUpdate(
    { name: 'Broadcast', private: false },
    { $addToSet: { users: user._id } },
    { upsert: true },
  );

  res.status(200).json({ success: true });
});

//api/user/login
const login = asyncErrorWrapper(async (req, res, next) => {
  const { nick, password } = req.body;

  if (!validateInput(nick, password)) {
    return next(new CustomError(400, 'Boş alan bırakmayın.'));
  }

  const user = await User.findOne({ nick, active: true }).select(
    '+password',
  );
  if (!user) {
    return next(
      new CustomError(400, 'Böyle bir kullanıcı mevcut değil'),
    );
  }

  if (!comparePassword(password, user.password)) {
    return next(new CustomError(400, 'Bilgilerinizi kontrol edin'));
  }

  const token = user.createTokenFromUser();

  res.status(200).json({ success: true, token });
});

//api/user/search
const searchWithNick = asyncErrorWrapper(async (req, res) => {
  const { s } = req.query;
  const users = await User.find({
    nick: new RegExp(s, 'i'),
    _id: { $ne: req.user.id },
  });

  res.status(200).json({ success: true, users });
});

const updateInfo = asyncErrorWrapper(async (req, res) => {
  const { nick, about, email } = req.body;
  const { id } = req.user;

  const user = await User.findOne({ _id: id });

  if (nick) {
    user.nick = nick;
  }

  if (about) {
    user.about = about;
  }
  if (email) {
    user.email = email;
  }

  const newUser = await user.save();
  const token = newUser.createTokenFromUser();

  res.status(200).json({ success: true, token });
});

const updatePassword = asyncErrorWrapper(async (req, res) => {
  const { password } = req.body;
  const { id } = req.user;

  const user = await User.findOne({ _id: id });

  user.password = password;

  await user.save();

  res.status(200).json({ success: true });
});

const deactiveAccount = asyncErrorWrapper(async (req, res) => {
  const userId = req.user.id;

  await User.findOneAndUpdate({ _id: userId }, { active: false });

  res.status(200).json({ success: true });
});

module.exports = {
  login,
  register,
  searchWithNick,
  updateInfo,
  updatePassword,
  deactiveAccount,
};
