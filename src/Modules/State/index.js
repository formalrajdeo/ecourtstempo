module.exports = {
  name: "State",
  baseName: "state",
  basePath: "State",
  model: "Model/State.model",
  controller: "Controller/State.controller",
  routes: "Routes/State.routes",
  baseRoute: "state",
  apiRoute: "state",
  dbName: "state",
  dbCollection: "States",
  dbColumns: {
    name: {
      type: "string",
      notnull: true,
    },
    code: {
      type: "string",
    },
    api_id: {
      type: "string",
    },
    // mobile: {
    //   type: "decimal",
    // },
    // roles: {
    //   type: "fk",
    //   ref: "role",
    // },
  },
  menuRoutes: {
    common: [
      {
        title: "Add State",
        route: "USER_ROLE/create",
        uses: "Views/USER_ROLE/State",
      },
      {
        title: "View States",
        route: "USER_ROLE/view",
        uses: "Views/USER_ROLE/States",
      },
    ],
    state: [
      {
        title: "Add State",
        routeName: "AddState",
        route: "state/create",
        uses: "Views/State/State",
      },
      {
        title: "View States",
        routeName: "ViewStates",
        route: "state/view",
        uses: "Views/State/States",
      },
    ],
    agent: [],
    vendor: [],
    admin: [],
  },
  moduleRoutes: {
    common: {
      index: { url: "/", use: "abc.js", type: "GET" },
      show: { url: "/:id", use: "abc.js", type: "GET" },
      create: { url: "/", use: "abc.js", type: "POST" },
      update: { url: "/update/{}", use: "abc.js", type: "PUT" },
      delete: { url: "/delete/{}", use: "abc.js", type: "DELETE" },
    },
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
};
