module.exports = {
  name: 'Answer',
  baseName: 'answer',
  basePath: 'Answer',
  model: 'Model/Answer.model',
  controller: 'Controller/Answer.controller',
  routes: 'Routes/Answer.routes',
  baseRoute: 'answer',
  apiRoute: 'answer',
  dbName: 'answer',
  dbCollection: 'answers',
  dbColumns: {
    captcha_img: {
      type: 'string',
    },
    responseDataCheerio: {
      type: 'json',
    },
  },
  menuRoutes: {
    common: [
      { title: 'Add Answer', route: '/create' },
      { title: 'View Answers', route: '/' },
    ],
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
  moduleRoutes: {
    common: {
      index: { url: '/', use: 'abc.js', type: 'GET' },
      create: { url: '/create', use: 'abc.js', type: 'GET' },
      show: { url: '/show/{}', use: 'abc.js', type: 'GET' },
      edit: { url: '/edit/{}', use: 'abc.js', type: 'POST' },
      update: { url: '/update/{}', use: 'abc.js', type: 'POST' },
      delete: { url: '/delete/{}', use: 'abc.js', type: 'POST' },
    },
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
}
