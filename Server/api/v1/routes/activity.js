const express = require('express')
const app = express();
const waypointController = require('../controllers/activity.controller');
const router = express.Router()

router.post('/register_activity', waypointController.registerActivity);
router.get('/list_activity', waypointController.listActivity);

module.exports = router
