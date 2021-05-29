module.exports = {
  name: "City",
  baseName: "city",
  basePath: "City",
  model: "Model/City.model",
  controller: "Controller/City.controller",
  routes: "Routes/City.routes",
  baseRoute: "city",
  apiRoute: "city",
  dbName: "city",
  dbCollection: "Cities",
  dbColumns: {
    // city: {
    //   type: "string",
    //   notnull: true,
    // },
    name: {
      type: "string",
      notnull: true,
    },
    code: {
      type: "string",
      notnull: true,
    },
    api_id: {
      type: "string",
      notnull: true,
    },
    state_id: {
      type: "fk",
      ref: "state",
      notnull: true,
    },
    state_api_id: {
      type: "string",
      notnull: true,
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
