var Engine = require('./core/queryEngine.js');
var Api = require('./core/queryApi.js');

// Modules
var Group = require('./modules/group.js');
var Hexastore = require('./modules/hexastore.js');
var Identity = require('./modules/identity.js');
var Dates = require('./modules/dates.js');
var Transitivity = require('./modules/transitivity.js');

function Factis() {
  this.hexastore = new Hexastore();
  this.module = new Group([
    this.hexastore,
    new Identity(),
    new Dates(),
    new Transitivity()
  ]);
  this.db = new Engine(this.module);
  this.query = this.db.query;
}

module.exports.base = Factis;

module.exports.fact = Api.fact;
module.exports.the = Api.the;
module.exports.and = Api.and;
module.exports.or = Api.or;
module.exports.not = Api.not;
module.exports.implies = Api.implies;
module.exports.equivalent = Api.equivalent;
