
var assert = require('assert');

var Hexastore = require('./index.js');
var db= new Hexastore();

describe('Import',function(){
  describe('nt',function(){
    it('import nt data',function(done){
      assert.doesNotThrow(function(){
        db.importNt("smalltestdataset",done);
      });
    });
  });
});

describe('Search',function(){
  describe('search',function(){
    it('multiple search with filter',function(){
      assert.equal(72,
        db
          .search([
            ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>",["predicate"],["object"]],
            [["similar"],["predicate"],["object"]]
            ])
          .filter(function(match){return match.object2 !== match.object;}).length);
    });
    it('precise search ',function(){
      assert.equal('<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/StandardizationInstitution1>',
      db.search([
        ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>","<http://purl.org/dc/elements/1.1/publisher>",["publisher"]]
        ])[0].publisher  );

    });
  });
});


describe('Clear',function(){
  describe('clear',function(){
    it('clear store',function(){
      assert.doesNotThrow(function(){
        db.clear();
      });
    });
    it('store empty after clear',function(){
      assert.equal(0,db
        .search([[['s'],['p'],['o']]]).length);
    });
  });
});











Geometry2D =
{
  ___:null,
  __O:null,
  _P_:null,
  _PO:null,
  S__:null,
  S_O:null,
  SP_:null,
  SPO:function(element){
    var s = element[0];
    var p = element[1];
    var o = element[2];
    var res = [];
    switch(p){
      case "inside":
        if( inside(geomParse(s),geomParse(o)) ) {
          res = append(res,[s,p,o,true]);
        }
        break;
    }
    return res;
  }
};
