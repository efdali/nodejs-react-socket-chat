const express = require('express');
const router = express.Router();
const {
  getAccessToPrivateRoute,
} = require('../middlewares/authorization/auth');

const {
  index,
  groupInfo,
  newChannel,
  newPrivateChannel,
  joinToChannel,
  searchWithName,
} = require('../controllers/group');

router.get('/', getAccessToPrivateRoute, index);
router.post('/new/public', getAccessToPrivateRoute, newChannel);
router.post(
  '/new/private',
  getAccessToPrivateRoute,
  newPrivateChannel,
);
router.put(
  '/join/:channelId',
  getAccessToPrivateRoute,
  joinToChannel,
);
router.get('/search', getAccessToPrivateRoute, searchWithName);
router.get('/:id', getAccessToPrivateRoute, groupInfo);

module.exports = router;
