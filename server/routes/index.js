const express = require('express');
const router = express.Router();

const user = require('./user');
const group = require('./group');
const message = require('./message');

router.use('/user', user);
router.use('/group', group);
router.use('/message', message);

module.exports = router;
