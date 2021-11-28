const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

const cors = require('cors')
app.use(cors());

const user = require('./api/v1/routes/user')
app.use('/api/v1/user', user)

const waypoint = require('./api/v1/routes/waypoint')
app.use('/api/v1/waypoint', waypoint)

const event = require('./api/v1/routes/events')
app.use('/api/v1/events', event)

const museum = require('./api/v1/routes/museum')
app.use('/api/v1/museum', museum)

const activity = require('./api/v1/routes/activity')
app.use('/api/v1/activity', activity)

const port = process.env.PORT || 3001
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
