const express = require('express');
const router = express.Router();

const {
  getAccessToPrivateRoute,
} = require('../middlewares/authorization/auth');

const {
  login,
  register,
  searchWithNick,
  updateInfo,
  updatePassword,
  deactiveAccount,
} = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);
router.get('/search', getAccessToPrivateRoute, searchWithNick);
router.post('/update', getAccessToPrivateRoute, updateInfo);
router.post(
  '/updatePassword',
  getAccessToPrivateRoute,
  updatePassword,
);
router.post('/deactive', getAccessToPrivateRoute, deactiveAccount);

module.exports = router;
