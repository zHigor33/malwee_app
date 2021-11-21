const express = require('express')
const app = express();
const waypointController = require('../controllers/waypoint.controller');
const router = express.Router()

// router.post('/register_waypoint', waypointController.registerWaypoint);
router.get('/list_waypoint', waypointController.listWaypoints);

module.exports = router
