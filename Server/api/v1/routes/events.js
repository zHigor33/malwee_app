const express = require('express')
const app = express()
const eventsController = require('../controllers/events.controller');
const router = express.Router()

router.post('/register_event', eventsController.registerEvent);
router.get('/list_event', eventsController.listEvents);
router.get('/list_waypoint', eventsController.listWaypoints);

router.get('/event_waypoint/:id',eventsController.listWaypointsPerEvents);

module.exports = router
