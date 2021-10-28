const express = require('express')
const app = express()
const eventsController = require('../controllers/events.controller');
const router = express.Router()

router.post('/register_event', eventsController.registerEvent);
router.get('/list_event', eventsController.listEvents);

module.exports = router
