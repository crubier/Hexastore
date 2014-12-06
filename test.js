var Hexastore = require('../hexastore');
var assert = require('assert');

var db= new Hexastore();

db.importNt("testdataset",
function() {

  assert.equal(1077,

    db.search([
  ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>",["predicate"],["object"]],
  [["similar"],["predicate"],["object"]]
  ]).filter(function(match){return match.object2 !== match.object}).length);


  assert.equal(
    db.search([
    ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>","<http://purl.org/dc/elements/1.1/publisher>",["publisher"]]
    ])[0].publisher,'<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/StandardizationInstitution1>'  );

});
