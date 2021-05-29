const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const State = require(`../Controller/State.controller.${Config.DB}`);
const Modules = require("../index");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  // ******************************************************************************************************************************
  // ************************************************** State ROUTES ***************************************************************
  // ******************************************************************************************************************************

  var stateRouter = require("express").Router();

  // Create a new User
  // stateRouter.post("/", User.create);
  stateRouter.post("/", State.create);

  // Retrieve a single State with id
  stateRouter.get("/:id", State.findOne);

  // Retrieve all States
  stateRouter.get("/", State.findAll);

  // Update a State with id
  // stateRouter.put("/:id", State.update);
  stateRouter.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], State.update);

  // Delete a State with id
  // stateRouter.delete("/:id", State.delete);
  stateRouter.delete(
    "/:id",
    [authJWT.verifyToken, authJWT.isAdmin],
    State.delete
  );

  // Create a new State
  // stateRouter.delete("/", State.deleteAll);
  stateRouter.delete(
    "/",
    [authJWT.verifyToken, authJWT.isAdmin],
    State.deleteAll
  );

  // Retrieve all published States
  // stateRouter.get('/published', State.findAllPublished);

  app.use(
    "/api/user/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    stateRouter
  );

  console.log(Modules.apiRoute);
  // var stateRouter = require("express").Router();

  // ******************************************************************************************************************************
  // ************************************************** USER ROUTES ***************************************************************
  // ******************************************************************************************************************************

  // userRouter.get("/getProfile", [authJWT.verifyToken], User.getProfile);

  // // Create a new User
  // // adminRouter.post("/", User.create);
  // userRouter.post("/", [authJWT.verifyToken], User.user_create);

  // // Retrieve a single User with id
  // userRouter.get("/:id", [authJWT.verifyToken], User.user_findOne);

  // // Retrieve all Users
  // userRouter.get("/", [authJWT.verifyToken], User.user_findAll);

  // // Update a User with id
  // // userRouter.put("/:id", User.user_update);
  // userRouter.put("/:id", [authJWT.verifyToken], User.user_update);

  // // Delete a User with id
  // // userRouter.delete("/:id", User.user_delete);
  // userRouter.delete("/:id", [authJWT.verifyToken], User.user_delete);

  // // Create a new User
  // // userRouter.delete("/", User.user_deleteAll);
  // userRouter.delete("/", [authJWT.verifyToken], User.user_deleteAll);

  // app.use("/api/user/" + Modules.apiRoute, userRouter);

  return app;
};
