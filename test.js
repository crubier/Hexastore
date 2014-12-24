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


  assert.equal('<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/StandardizationInstitution1>',
    db.search([
    ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>","<http://purl.org/dc/elements/1.1/publisher>",["publisher"]]
    ])[0].publisher  );

});

//
//
// [['person'],'born',['city']],
// [['city'],'border',['border']],
// [['border'],'inside','square(0,0,10,10)']
//
//
//
//
// {
//   P:"inside",
//   ___:function(){return["(0,0)","inside","polygon((1,1),(1,-1),(-1,-1),(-1,1))",true]},
//   __O:function(object){return[object.center,"inside",object,true]},
//   _P_:function(predicate){if(predicate=="indisde")return["",predicate,"",true]else},
//   _PO:function(predicate,object){return["",predicate,"",true]},
// }
//
// predicate "inside" = //boolean
// predicate "inside" =function(object){return };
