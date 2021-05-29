const mongoose = require('mongoose')
const { Modules } = require('../../src/Modules')
const Config = require('../Config/Config')
let db = {}

if (Config.DB === 'mongo') {
  try {
    mongoose.connect(Config.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    const connection = mongoose.connection
    Modules.map((m) => {
      db[m.baseName] = require('../../src/Modules/' +
        m.basePath +
        '/' +
        m.model +
        '.mongo')
    })

    connection.once('open', function () {
      console.log(
        `MongoDB database connection established successfully: ${connection.host}`
          .cyan.underline
      )
    })
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
  }
}

module.exports = db
