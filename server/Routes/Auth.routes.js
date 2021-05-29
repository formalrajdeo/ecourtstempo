const { verifySignUp } = require("../Middleware");
const Config = require("../Config/Config");
const controller =
  Config.DB === "mongo"
    ? require("../Controllers/Auth.mongo.controller")
    : require("../Controllers/Auth.mysql.controller");

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'x-access-token, Authorization, Origin, Content-Type, Accept',
  //   );
  //   next();
  // });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicates, verifySignUp.checkRolesExist],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
