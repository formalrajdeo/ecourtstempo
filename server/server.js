const express = require('express')
var multer = require('multer')
const cors = require('cors')
var https = require('https')
const { Modules } = require('../src/Modules')
const db = require('./Models')
const listEndpoints = require('express-list-endpoints')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const Config = require('./Config/Config')

dotenv.config()

const app = express()

var upload = multer({ dest: 'Storage/' })

var corsOptions = {
  // origin: "http://localhost:8081",
  origin: '*',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - multipart/form-data
app.use(upload.array())

if (Config.DB === 'mongo') {
  //FORCE RESYNC AUTO
  const Role = db.role

  Role.findOneAndUpdate(
    {
      name: 'user',
    },
    {
      name: 'user',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
  Role.findOneAndUpdate(
    {
      name: 'vendor',
    },
    {
      name: 'vendor',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
  Role.findOneAndUpdate(
    {
      name: 'agent',
    },
    {
      name: 'agent',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
  Role.findOneAndUpdate(
    {
      name: 'moderator',
    },
    {
      name: 'moderator',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
  Role.findOneAndUpdate(
    {
      name: 'admin',
    },
    {
      name: 'admin',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
  Role.findOneAndUpdate(
    {
      name: 'superadmin',
    },
    {
      name: 'superadmin',
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  )
}

app.get('/api/getRoutes', (req, res) => {
  res.json({ routes: listEndpoints(app) })
})

app.get('/api/', (req, res) => {
  res.json({ routes: listEndpoints(app) })
})

require('./Routes/Auth.routes')(app)

//Load Routes
Modules.map((m) => {
  // console.log("../src/Modules/" + m.basePath + "/" + m.routes);
  require('../src/Modules/' + m.basePath + '/' + m.routes)(app)
})

// set port, listen for requests
const PORT = process.env.PORT

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} ${PORT}`.yellow.bold)
)

module.exports = app

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
