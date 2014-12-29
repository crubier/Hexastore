var chai = require('chai');
chai.use(require('chai-fuzzy'));
var assert = chai.assert;

var Hexastore = require('./index.js');

var db;

describe('Initialize', function() {
  it('create new hexastore', function() {
    assert.doesNotThrow(function() {
      db = new Hexastore();
    });
  });
  it('new hexastore is empty', function() {
    assert.equal(0, db.size());
  });
});


describe('Create', function() {
  beforeEach(function() {
    db.clear();
  });
  describe('put', function() {
    it('put', function() {
      assert.doesNotThrow(function() {
        db.put(['hello world', 'is', 'sentence']);
      });
      assert.equal(1, db.size());
    });
    it('putAll', function() {
      assert.doesNotThrow(function() {
        db.putAll([
          ['hey', 'hey', 'ho'],
          ['hey', 'hay', 'ho'],
          ['hey', 'hey', 'ha'],
          ['hey', 'hey', 'hon']
        ]);
      });
      assert.equal(4, db.size());
    });
  });
  describe('add', function() {
    it('addSPO', function() {
      assert.doesNotThrow(function() {
        db.addSPO({
          'a': {
            'b': {
              'c': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getSPO(), {
        'a': {
          'b': {
            'c': true
          }
        }
      });
    });
    it('addSOP', function() {
      assert.doesNotThrow(function() {
        db.addSOP({
          'aa': {
            'bb': {
              'cc': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getSOP(), {
        'aa': {
          'bb': {
            'cc': true
          }
        }
      });
    });
    it('addOSP', function() {
      assert.doesNotThrow(function() {
        db.addOSP({
          'aaa': {
            'bbb': {
              'ccc': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getOSP(), {
        'aaa': {
          'bbb': {
            'ccc': true
          }
        }
      });
    });
    it('addOPS', function() {
      assert.doesNotThrow(function() {
        db.addOPS({
          'aaaa': {
            'bbbb': {
              'cccc': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getOPS(), {
        'aaaa': {
          'bbbb': {
            'cccc': true
          }
        }
      });
    });
    it('addPSO', function() {
      assert.doesNotThrow(function() {
        db.addPSO({
          'aaaaa': {
            'bbbbb': {
              'ccccc': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getPSO(), {
        'aaaaa': {
          'bbbbb': {
            'ccccc': true
          }
        }
      });
    });
    it('addPOS', function() {
      assert.doesNotThrow(function() {
        db.addPOS({
          'aaaaaa': {
            'bbbbbb': {
              'cccccc': true
            }
          }
        });
      });
      assert.equal(1, db.size());
      assert.deepEqual(db.getPOS(), {
        'aaaaaa': {
          'bbbbbb': {
            'cccccc': true
          }
        }
      });
    });
  });
  describe('addJSObject', function() {
    it('addJSObjectAsPath', function() {
      assert.doesNotThrow(function() {
        db.addJSObjectAsPath({
          know: "joe",
          lol: {
            wow: "hab"
          },
          a: 1
        }, "bob");
      });
      assert.equal(4, db.size());
      assert.containOneLike(db.all(), ['bob', 'know', 'joe', true]);
      assert.containOneLike(db.all(), ['bob', 'a', '1', true]);
      assert.containOneLike(db.all(), ['bob/lol', 'wow', 'hab', true]);
      assert.containOneLike(db.all(), ['bob', 'lol', 'bob/lol', true]);
      assert.doesNotThrow(function() {
        db.addJSObjectAsPath({
          a: {
            b: 1
          }
        }, "bob", ">");
      });
      assert.containOneLike(db.all(), ['bob', 'a', 'bob>a', true]);
      assert.containOneLike(db.all(), ['bob>a', 'b', '1', true]);
    });
    it('addJSObjectAsJSON', function() {
      var added;
      assert.doesNotThrow(function() {
        added = db.addJSObjectAsJSON({
          know: "joe",
          lol: {
            wow: "hab"
          },
          a: 1
        });
      });
      assert.equal(4, db.size());
      assert.containOneLike(db.all(), [added, 'know', 'joe', true]);
      assert.containOneLike(db.all(), [added, 'a', '1', true]);
      assert.containOneLike(db.all(), [added, 'lol', '{"wow":"hab"}', true]);
      assert.containOneLike(db.all(), ['{"wow":"hab"}', 'wow', 'hab', true]);
    });
    it('addJSObjectAsUUID', function() {
      var added;
      assert.doesNotThrow(function() {
        added = db.addJSObjectAsUUID({
          know: "joe",
          lol: {
            wow: "hab"
          },
          a: 1
        });
      });
      assert.equal(4, db.size());
      assert.containOneLike(db.all(), [added, 'know', 'joe', true]);
      assert.containOneLike(db.all(), [added, 'a', '1', true]);
    });
  });
  describe('copy', function() {
    beforeEach(function() {
      db.clear();
      db.putAll([
        ['hey', 'hey', 'ho'],
        ['hey', 'hay', 'ha'],
        ['hi', 'hey', 'ha'],
        ['hi', 'hey', 'hon']
      ]);
    });
    it('copySubject', function() {
      assert.doesNotThrow(function() {
        db.copySubject("hey", "bobie");
      });
      assert.containOneLike(db.all(), ["bobie", 'hey', 'ho', true]);
      assert.containOneLike(db.all(), ["bobie", 'hay', 'ha', true]);
    });
    it('copyPredicate', function() {
      assert.doesNotThrow(function() {
        db.copyPredicate("hey", "bo");
      });
      assert.containOneLike(db.all(), ["hey", 'bo', 'ho', true]);
      assert.containOneLike(db.all(), ["hi", 'bo', 'ha', true]);
      assert.containOneLike(db.all(), ["hi", 'bo', 'hon', true]);
    });
    it('copyObject', function() {
      assert.doesNotThrow(function() {
        db.copyObject("ha", "lid");
      });
      assert.containOneLike(db.all(), ["hey", 'hay', 'lid', true]);
      assert.containOneLike(db.all(), ["hi", 'hey', 'lid', true]);
    });
  });
});

describe('Read', function() {
  describe('query', function() {
    before(function() {
      db.clear();
      db.addSPO({
        'a': {
          'b': {
            'c': true
          }
        }
      });
    });
    it('query___', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.query___(['a', 'b', 'c']));
    });
    it('queryS__', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryS__(['a', 'b', 'c']));
    });
    it('query_P_', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.query_P_(['a', 'b', 'c']));
    });
    it('query__O', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.query__O(['a', 'b', 'c']));
    });
    it('querySP_', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.querySP_(['a', 'b', 'c']));
    });
    it('queryS_O', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryS_O(['a', 'b', 'c']));
    });
    it('query_PO', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.query_PO(['a', 'b', 'c']));
    });
    it('querySPO', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.querySPO(['a', 'b', 'c']));
    });
    it('queryDispatch', function() {
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch(['a', 'b', 'c']));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch([
        ['a'], 'b', 'c'
      ]));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch(['a', ['b'], 'c']));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch([
        ['a'],
        ['b'], 'c'
      ]));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch(['a', 'b', ['c']]));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch([
        ['a'], 'b', ['c']
      ]));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch(['a', ['b'],
        ['c']
      ]));
      assert.deepEqual([
        ['a', 'b', 'c', true]
      ], db.queryDispatch([
        ['a'],
        ['b'],
        ['c']
      ]));
    });
  });



  describe('search', function() {
    before(function(done) {
      db.importNt("smalltestdataset", done);
    });
    it('multiple search with filter', function() {
      assert.equal(72,
        db
        .search([
          ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>", ["predicate"],
            ["object"]
          ],
          [
            ["similar"],
            ["predicate"],
            ["object"]
          ]
        ])
        .filter(function(match) {
          return match.object2 !== match.object;
        }).length);
    });
    it('precise search ', function() {
      assert.equal('<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/StandardizationInstitution1>',
        db.search([
          ["<http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/instances/ProductType1>", "<http://purl.org/dc/elements/1.1/publisher>", ["publisher"]]
        ])[0].publisher);

    });
  });
});


describe('Update', function() {

});

describe('Import / Export', function() {
  before(function() {
    db.clear();
    db.addSPO({
      'aaa': {
        'bbb': {
          'ccc': true
        }
      }
    });
  });
  it('json', function() {
    assert.doesNotThrow(function() {
      db.exportJSON('hexastoretest1');
      db.clear();
      db.importJSON('hexastoretest1');
    });
    assert.equal(1, db.size());
    assert.deepEqual(db.getSPO(), {
      'aaa': {
        'bbb': {
          'ccc': true
        }
      }
    });
  });
  it('zip', function() {
    assert.doesNotThrow(function() {
      db.exportZip('hexastoretest1');
      db.clear();
      db.importZip('hexastoretest1');
    });
    assert.equal(1, db.size());
    assert.deepEqual(db.getSPO(), {
      'aaa': {
        'bbb': {
          'ccc': true
        }
      }
    });
  });
  it('nt', function() {
    assert.doesNotThrow(function() {
      db.exportNt('hexastoretest1');
      db.clear();
      db.importNt('hexastoretest1', function() {
        assert.equal(1, db.size());
        assert.deepEqual(db.getSPO(), {
          'aaa': {
            'bbb': {
              'ccc': true
            }
          }
        });
      });
    });

  });
});


describe('Delete', function() {
  describe('clear', function() {
    it('clear store', function() {
      assert.doesNotThrow(function() {
        db.clear();
      });
    });
    it('cleared hexastore is empty', function() {

      assert.equal(0, db.size());

    });
  });
});


Geometry2D = {
  ___: null,
  __O: null,
  _P_: null,
  _PO: null,
  S__: null,
  S_O: null,
  SP_: null,
  SPO: function(element) {
    var s = element[0];
    var p = element[1];
    var o = element[2];
    var res = [];
    switch (p) {
      case "inside":
        if (inside(geomParse(s), geomParse(o))) {
          res = append(res, [s, p, o, true]);
        }
        break;
    }
    return res;
  }
};

Identity = {
  ___: function(f) {
    return null;
  },
  __O: function(f) {
    return [
      [f[2], "equals", f[2], true]
    ];
  },
  _P_: function(f) {
    return null;
  },
  _PO: function(f) {
    return (f[1] === "equals") ? [
      [f[2], "equals", f[2], true]
    ] : null;
  },
  S__: function(f) {
    return [
      [f[0], "equals", f[0], true]
    ];
  },
  S_O: function(f) {
    return (f[0] === f[2]) ? [f[0], "equals", f[2], true] : [];
  },
  SP_: function(f) {
    return (f[1] === "equals") ? [
      [f[0], "equals", f[0], true]
    ] : null;
  },
  SPO: function(f) {
    return (f[1] === "equals") ? ((f[0] === f[2]) ? [f[0], f[1], f[2], true] : []) : null;
  }
};
