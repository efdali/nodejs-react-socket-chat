const express = require('express');
const router = express.Router();
const {
  getAccessToPrivateRoute,
} = require('../middlewares/authorization/auth');

const { index, newMessage } = require('../controllers/message');

router.get('/:id', getAccessToPrivateRoute, index);
router.post('/new', getAccessToPrivateRoute, newMessage);

module.exports = router;
