// const { authJWT } = require("../../../../server/Middleware");
const Config = require('../../../../server/Config/Config')
const Answer = require(`../Controller/Answer.controller.${Config.DB}`)
const Modules = require('../index')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  var router = require('express').Router()

  // Create a new Tutorial
  // router.post("/", Role.create);
  router.post('/', Answer.create)

  // Retrieve a single Tutorial with id
  router.get('/:id', Answer.findOne)

  // Retrieve all Tutorials
  router.get('/', Answer.findAll)

  // Update a Tutorial with id
  // router.put("/:id", Answer.update);
  router.put('/:id', Answer.update)

  // Delete a Tutorial with id
  // router.delete("/:id", Answer.delete);
  router.delete('/:id', Answer.delete)

  // Create a new Tutorial
  // router.delete("/", Answer.deleteAll);
  router.delete('/', Answer.deleteAll)

  // Retrieve all published Tutorials
  // router.get('/published', Answer.findAllPublished);

  app.use(
    '/api/' + Modules.apiRoute,
    // [authJWT.verifyToken],
    router
  )
  return app
}
