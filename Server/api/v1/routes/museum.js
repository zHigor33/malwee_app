const express = require('express')
const app = express();
const museumController = require('../controllers/museum.controller');
const router = express.Router()

router.post('/register_museum', museumController.registerMuseum);
router.get('/list_museum', museumController.listMuseum);

module.exports = router
