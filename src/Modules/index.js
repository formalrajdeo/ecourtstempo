const { moduleList } = require("./moduleList");
let modules = [];
Object.keys(moduleList).map((m) => {
  const path = moduleList[m];
  const mod = require(__dirname + "/" + path);
  modules.push(mod);

  // console.log("m", m);
});
module.exports.Modules = modules;
