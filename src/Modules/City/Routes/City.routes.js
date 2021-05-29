const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const City = require(`../Controller/City.controller.${Config.DB}`);
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
  // ************************************************** Admin ROUTES ***************************************************************
  // ******************************************************************************************************************************

  var cityRouter = require("express").Router();

  // Create a new User
  // cityRouter.post("/", User.create);
  cityRouter.post("/", City.create);

  // Retrieve a single City with id
  cityRouter.get("/:id", City.findOne);

  // Retrieve all Citys
  cityRouter.get("/", City.findAll);

  // Update a City with id
  // cityRouter.put("/:id", City.update);
  cityRouter.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], City.update);

  // Delete a City with id
  // cityRouter.delete("/:id", City.delete);
  cityRouter.delete(
    "/:id",
    [authJWT.verifyToken, authJWT.isAdmin],
    City.delete
  );

  // Create a new City
  // cityRouter.delete("/", City.deleteAll);
  cityRouter.delete(
    "/",
    [authJWT.verifyToken, authJWT.isAdmin],
    City.deleteAll
  );

  // Retrieve all published Citys
  // cityRouter.get('/published', City.findAllPublished);

  app.use(
    "/api/user/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    cityRouter
  );
  // var userRouter = require("express").Router();

  // // ******************************************************************************************************************************
  // // ************************************************** USER ROUTES ***************************************************************
  // // ******************************************************************************************************************************

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
