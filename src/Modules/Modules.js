const { moduleList } = require("./moduleList");

let Modules = [];

// console.log(moduleList);
Object.keys(moduleList).map((m) => {
  let mod = require("./" + moduleList[m] + "/index.js");
  Modules.push({ [m]: mod });
});

module.exports.Modules = Modules;
