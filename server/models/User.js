const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  nick: {
    type: String,
    unique: [true, 'Nick kullanımda'],
    required: [true, 'Nick alanı zorunludur'],
    minLength: [3, 'En az 3 karakter olmalı'],
  },
  about: String,
  email: {
    type: String,
    required: [true, 'Email alanı zorunludur'],
    unique: [true, 'Email alanı zorunludur'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Geçersiz email adresi',
    ],
  },
  password: {
    type: String,
    minLength: [6, 'En az 6 karakter olmalı'],
    required: [true, 'Password alanı zorunludur'],
    select: false,
  },
  picture: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.createTokenFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    nick: this.nick,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
