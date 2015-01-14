var fs = require('fs');
var AZip = require('adm-zip');
var uuid = require('node-uuid');

function Hexastore() {
  this.spo = {};
  this.sop = {};
  this.pso = {};
  this.pos = {};
  this.osp = {};
  this.ops = {};
}

// Export a database to import with import
Hexastore.prototype.exportJSON = function(dbname) {
  fs.writeFileSync(dbname + ".json", JSON.stringify(this.spo));
};

// Export a database to import with importZip
Hexastore.prototype.exportZip = function(dbname) {
  // creating archives
  var zip = new AZip();
  // add file directly
  zip.addFile("data.json", new Buffer(JSON.stringify(this.spo)), "hexastore database");
  // or write everything to disk
  zip.writeZip(dbname + ".zip");
};

// Export a database to a NT file
Hexastore.prototype.exportNt = function(ntname) {
  var res = this.all();
  var str = "";
  for (var i = 0; i < res.length; i++) {
    str = str + res[i][0] + ' ' + res[i][1] + ' ' + res[i][2] + ' ' + JSON.stringify(res[i][3]) + '\n';
  }
  fs.writeFileSync(ntname + ".nt", str);
};

// Import a database previously exported with export
Hexastore.prototype.importJSON = function(dbname) {
  try {
    this.addSPO(JSON.parse(fs.readFileSync(dbname + ".json")));
  } catch (err) {}
};

// Import a database previously exported with exportZip
Hexastore.prototype.importZip = function(dbname) {
  var zip = new AZip(dbname + ".zip");
  // outputs the content of somefolder/myfile.txt
  this.addSPO(JSON.parse(zip.readAsText("data.json")));
};

// Import a database in a NT file
Hexastore.prototype.importNt = function(ntname, callback) {
  function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
      remaining += data;
      var index = remaining.indexOf('\n');
      while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);

        func(line);

        index = remaining.indexOf('\n');
      }
    });

    input.on('end', function() {
      if (remaining.length > 0) {
        func(remaining);
      }
      if (callback !== undefined && callback !== null) {
        callback();
      }
    });
  }

  var that = this;

  function func(line) {
    var elements = line.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
    try {
      elements[3] = JSON.parse(elements[3]);
    } catch (err) {}
    that.put(elements);
  }

  var input = fs.createReadStream(ntname + '.nt');
  readLines(input, func);
};

// get the size of the hexastore
Hexastore.prototype.size = function() {
  var count = 0;
  for (var s in this.spo) {
    if (this.spo.hasOwnProperty(s)) {
      for (var p in this.spo[s]) {
        if (this.spo[s].hasOwnProperty(p)) {
          for (var o in this.spo[s][p]) {
            if (this.spo[s][p].hasOwnProperty(o)) {
              if (this.spo[s][p][o] !== undefined) {
                count++;
              }
            }
          }
        }
      }
    }
  }
  return count;
};

// Add a single triple to the store
Hexastore.prototype.put = function(element) {
  var s = element[0];
  var p = element[1];
  var o = element[2];
  var v = element[3] ? element[3] : true;

  if (this.spo[s] === undefined) {
    this.spo[s] = {};
  }
  if (this.spo[s][p] === undefined) {
    this.spo[s][p] = {};
  }
  this.spo[s][p][o] = v;

  if (this.sop[s] === undefined) {
    this.sop[s] = {};
  }
  if (this.sop[s][o] === undefined) {
    this.sop[s][o] = {};
  }
  this.sop[s][o][p] = v;

  if (this.pso[p] === undefined) {
    this.pso[p] = {};
  }
  if (this.pso[p][s] === undefined) {
    this.pso[p][s] = {};
  }
  this.pso[p][s][o] = v;

  if (this.pos[p] === undefined) {
    this.pos[p] = {};
  }
  if (this.pos[p][o] === undefined) {
    this.pos[p][o] = {};
  }
  this.pos[p][o][s] = v;

  if (this.osp[o] === undefined) {
    this.osp[o] = {};
  }
  if (this.osp[o][s] === undefined) {
    this.osp[o][s] = {};
  }
  this.osp[o][s][p] = v;

  if (this.ops[o] === undefined) {
    this.ops[o] = {};
  }
  if (this.ops[o][p] === undefined) {
    this.ops[o][p] = {};
  }
  this.ops[o][p][s] = v;
};

Hexastore.prototype.putAll = function(elements) {
  for (var i = 0; i < elements.length; i++) {
    this.put(elements[i]);
  }
};

// Clear all database
Hexastore.prototype.clear = function() {
  this.spo = {};
  this.sop = {};
  this.pso = {};
  this.pos = {};
  this.osp = {};
  this.ops = {};
};

// Add triples to the store, with input data nested as subjects containing predicates containing objects containing values
Hexastore.prototype.addSPO = function(element) {
  var subj = element;
  for (var subject in subj) {
    if (subj.hasOwnProperty(subject)) {
      var pred = subj[subject];
      for (var predicate in pred) {
        if (pred.hasOwnProperty(predicate)) {
          var obj = pred[predicate];
          for (var object in obj) {
            if (obj.hasOwnProperty(object)) {
              var val = obj[object];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setSPO = function(element) {
//   this.clear();
//   this.addSPO(element);
// };

Hexastore.prototype.getSPO = function() {
  return this.spo;
};

// Add triples to the store, with input data nested as subjects containing objects containing predicates containing values
Hexastore.prototype.addSOP = function(element) {
  var subj = element;
  for (var subject in subj) {
    if (subj.hasOwnProperty(subject)) {
      var obj = subj[subject];
      for (var object in obj) {
        if (obj.hasOwnProperty(object)) {
          var pred = obj[object];
          for (var predicate in pred) {
            if (pred.hasOwnProperty(predicate)) {
              var val = pred[predicate];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setSOP = function(element) {
//   this.clear();
//   this.addSOP(element);
// };

Hexastore.prototype.getSOP = function() {
  return this.sop;
};

// Add triples to the store, with input data nested as predicate containing subjects containing objects containing values
Hexastore.prototype.addPSO = function(element) {
  var pred = element;
  for (var predicate in pred) {
    if (pred.hasOwnProperty(predicate)) {
      var subj = pred[predicate];
      for (var subject in subj) {
        if (subj.hasOwnProperty(subject)) {
          var obj = subj[subject];
          for (var object in obj) {
            if (obj.hasOwnProperty(object)) {
              var val = obj[object];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setPSO = function(element) {
//   this.clear();
//   this.addPSO(element);
// };

Hexastore.prototype.getPSO = function() {
  return this.pso;
};

// Add triples to the store, with input data nested as predicates containing objects containing subjects containing values
Hexastore.prototype.addPOS = function(element) {
  var pred = element;
  for (var predicate in pred) {
    if (pred.hasOwnProperty(predicate)) {
      var obj = pred[predicate];
      for (var object in obj) {
        if (obj.hasOwnProperty(object)) {
          var subj = obj[object];
          for (var subject in subj) {
            if (subj.hasOwnProperty(subject)) {
              var val = subj[subject];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setPOS = function(element) {
//   this.clear();
//   this.addPOS(element);
// };

Hexastore.prototype.getPOS = function() {
  return this.pos;
};

// Add triples to the store, with input data nested as objects containing subjects containing predicates containing values
Hexastore.prototype.addOSP = function(element) {
  var obj = element;
  for (var object in obj) {
    if (obj.hasOwnProperty(object)) {
      var subj = obj[object];
      for (var subject in subj) {
        if (subj.hasOwnProperty(subject)) {
          var pred = subj[subject];
          for (var predicate in pred) {
            if (pred.hasOwnProperty(predicate)) {
              var val = pred[predicate];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setOSP = function(element) {
//   this.clear();
//   this.addOSP(element);
// };

Hexastore.prototype.getOSP = function() {
  return this.osp;
};

// Add triples to the store, with input data nested as objects containing predicates containing subjects containing values
Hexastore.prototype.addOPS = function(element) {
  var obj = element;
  for (var object in obj) {
    if (obj.hasOwnProperty(object)) {
      var pred = obj[object];
      for (var predicate in pred) {
        if (pred.hasOwnProperty(predicate)) {
          var subj = pred[predicate];
          for (var subject in subj) {
            if (subj.hasOwnProperty(subject)) {
              var val = subj[subject];
              this.put([subject, predicate, object, val]);
            }
          }
        }
      }
    }
  }
};

// Hexastore.prototype.setOPS = function(element) {
//   this.clear();
//   this.addOPS(element);
// };

Hexastore.prototype.getOPS = function() {
  return this.ops;
};










// ORM functions


// Add object as a star of nodes, with name in the center, and name/prop1 around
Hexastore.prototype.addJSObjectAsPath = function(obj, name, separator) {
  var actualseparator;
  if (separator === undefined) {
    actualseparator = "/";
  } else {
    actualseparator = separator;
  }
  if (obj === Object(obj)) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsPath(obj[prop], name + actualseparator + prop,actualseparator), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes with UUID names except for the leaves
Hexastore.prototype.addJSObjectAsUUID = function(obj) {
  if (obj === Object(obj)) {
    var name = uuid.v4();
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsUUID(obj[prop]), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes with JSON names except for the leaves
Hexastore.prototype.addJSObjectAsJSON = function(obj) {
  if (obj === Object(obj)) {
    var name = JSON.stringify(obj);
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsJSON(obj[prop]), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes, using UUID by default
Hexastore.prototype.addJSObject = Hexastore.prototype.addJSObjectAsUUID;

// Add object as a star of nodes with JSON names except for the leaves
Hexastore.prototype.getJSObject = function(name) {
  //TODO
  var res = this.querySXX([name,null,null]);
  var obj = {};
  for(var i=0;i<res.length;i++){
    obj[res[1]]=this.getJSObject(res[2]);
  }
  return obj;
};








// Copy functions

// Make a copy of all facts related to a subject
Hexastore.prototype.copySubject = function(subj, newsubj) {
  var res = this.querySXX([subj, null, null]);
  this.putAll(res.map(function(el) {
    return [newsubj, el[1], el[2], el[3]];
  }));
  return res.length;
};

// Make a copy of all facts related to a predicate
Hexastore.prototype.copyPredicate = function(pred, newpred) {
  var res = this.queryXPX([null, pred, null]);
  this.putAll(res.map(function(el) {
    return [el[0], newpred, el[2], el[3]];
  }));
  return res.length;
};

// Make a copy of all facts related to an object
Hexastore.prototype.copyObject = function(obj, newobj) {
  var res = this.queryXXO([null, null, obj]);
  this.putAll(res.map(function(el) {
    return [el[0], el[1], newobj, el[3]];
  }));
  return res.length;
};


Hexastore.prototype.all = function() {
  var res = [];
  var subj = this.spo;
  if (subj !== undefined) {
    for (var subject in subj) {
      if (subj.hasOwnProperty(subject)) {
        var pred = subj[subject];
        if (pred !== undefined) {
          for (var predicate in pred) {
            if (pred.hasOwnProperty(predicate)) {
              var obj = pred[predicate];
              if (obj !== undefined) {
                for (var object in obj) {
                  if (obj.hasOwnProperty(object)) {
                    var val = obj[object];
                    if (val !== undefined) {
                      res.push([subject, predicate, object, val]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};












// Hexastore specific Query functions


// Query the store for all facts with nothing specific (all facts)
Hexastore.prototype.queryXXX = function(element) {

  var res = [];

  var subj = this.spo;
  if (subj !== undefined) {
    for (var subject in subj) {
      if (subj.hasOwnProperty(subject)) {
        var pred = subj[subject];
        if (pred !== undefined) {
          for (var predicate in pred) {
            if (pred.hasOwnProperty(predicate)) {
              var obj = pred[predicate];
              if (obj !== undefined) {
                for (var object in obj) {
                  if (obj.hasOwnProperty(object)) {
                    var val = obj[object];
                    if (val !== undefined) {
                      res.push([subject, predicate, object, val]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific subject
Hexastore.prototype.querySXX = function(element) {
  var s = element[0];

  var res = [];

  var subj = this.spo;
  if (subj !== undefined) {
    var pred = subj[s];
    if (pred !== undefined) {
      for (var predicate in pred) {
        if (pred.hasOwnProperty(predicate)) {
          var obj = pred[predicate];
          if (obj !== undefined) {
            for (var object in obj) {
              if (obj.hasOwnProperty(object)) {
                var val = obj[object];
                if (val !== undefined) {
                  res.push([s, predicate, object, val]);
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific predicate
Hexastore.prototype.queryXPX = function(element) {
  var p = element[1];

  var res = [];

  var pred = this.pso;
  if (pred !== undefined) {
    var subj = pred[p];
    if (subj !== undefined) {
      for (var subject in subj) {
        if (subj.hasOwnProperty(subject)) {
          var obj = subj[subject];
          if (obj !== undefined) {
            for (var object in obj) {
              if (obj.hasOwnProperty(object)) {
                var val = obj[object];
                if (val !== undefined) {
                  res.push([subject, p, object, val]);
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific object
Hexastore.prototype.queryXXO = function(element) {
  var o = element[2];

  var res = [];

  var obj = this.ops;
  if (obj !== undefined) {
    var pred = obj[o];
    if (pred !== undefined) {
      for (var predicate in pred) {
        if (pred.hasOwnProperty(predicate)) {
          var subj = pred[predicate];
          if (subj !== undefined) {
            for (var subject in subj) {
              if (subj.hasOwnProperty(subject)) {
                var val = subj[subject];
                if (val !== undefined) {
                  res.push([subject, predicate, o, val]);
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific subject and predicate
Hexastore.prototype.querySPX = function(element) {
  var s = element[0];
  var p = element[1];

  var res = [];

  var subj = this.spo;
  if (subj !== undefined) {
    var pred = subj[s];
    if (pred !== undefined) {
      var obj = pred[p];
      if (obj !== undefined) {
        for (var object in obj) {
          if (obj.hasOwnProperty(object)) {
            var val = obj[object];
            if (val !== undefined) {
              res.push([s, p, object, val]);
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific predicate and object
Hexastore.prototype.queryXPO = function(element) {
  var p = element[1];
  var o = element[2];

  var res = [];

  var pred = this.pos;
  if (pred !== undefined) {
    var obj = pred[p];
    if (obj !== undefined) {
      var subj = obj[o];
      if (subj !== undefined) {
        for (var subject in subj) {
          if (subj.hasOwnProperty(subject)) {
            var val = subj[subject];
            if (val !== undefined) {
              res.push([subject, p, o, val]);
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific subject and object
Hexastore.prototype.querySXO = function(element) {
  var s = element[0];
  var o = element[2];

  var res = [];

  var subj = this.sop;
  if (subj !== undefined) {
    var obj = subj[s];
    if (obj !== undefined) {
      var pred = obj[o];
      if (pred !== undefined) {
        for (var predicate in pred) {
          if (pred.hasOwnProperty(predicate)) {
            var val = pred[predicate];
            if (val !== undefined) {
              res.push([s, predicate, o, val]);
            }
          }
        }
      }
    }
  }
  return res;
};

// Query the store for all facts with specific subject predicate and object (get values of this fact)
Hexastore.prototype.querySPO = function(element) {
  var s = element[0];
  var p = element[1];
  var o = element[2];

  var res = [];

  var subj = this.spo;
  if (subj !== undefined) {
    var pred = subj[s];
    if (pred !== undefined) {
      var obj = pred[p];
      if (obj !== undefined) {
        var val = obj[o];
        if (val !== undefined) {
          res.push([s, p, o, val]);
        }
      }
    }
  }
  return res;
};



// Returns a set of triples matching a single query element
Hexastore.prototype.queryDispatch = function(queryElement) {
  if (queryElement[0] instanceof Array) {
    if (queryElement[1] instanceof Array) {
      if (queryElement[2] instanceof Array) {
        return this.queryXXX(queryElement);
      } else {
        return this.queryXXO(queryElement);
      }
    } else {
      if (queryElement[2] instanceof Array) {
        return this.queryXPX(queryElement);
      } else {
        return this.queryXPO(queryElement);
      }
    }
  } else {
    if (queryElement[1] instanceof Array) {
      if (queryElement[2] instanceof Array) {
        return this.querySXX(queryElement);
      } else {
        return this.querySXO(queryElement);
      }
    } else {
      if (queryElement[2] instanceof Array) {
        return this.querySPX(queryElement);
      } else {
        return this.querySPO(queryElement);
      }
    }
  }
};




// // Query planner
// restrictivity = function(queryTriple) {
//   var s = (queryTriple[0] instanceof Array) ? 0 : 1;
//   var p = (queryTriple[1] instanceof Array) ? 0 : 1;
//   var o = (queryTriple[2] instanceof Array) ? 0 : 1;
//   return s + p + o;
// }
//
// restrictivityCompare = function(a, b) {
//   return restrictivity(b) - restrictivity(a);
// }
//
// entropy = function(varOc) {
//   return function(element) {
//     var res = 0;
//     for (var j = 0; j < 3; j++) {
//       if (element[j] instanceof Array)
//         res = res + varOc[element[j][0]];
//     }
//   }
// }
//
// entropyCompare = function(query) {
//   var entropyfunc = entropy(variableOccurences(query));
//   return function(a, b) {
//     var entropyA = entropyfunc(a);
//     var entropyB = entropyfunc(b);
//     var restrictivityA = restrictivity(a);
//     var restrictivityB = restrictivity(b);
//     if (entropyA !== entropyB) {
//       return entropyB - entropyA;
//     } else {
//       return restrictivityB - restrictivityA;
//     }
//   }
// }
//
//
// variableOccurences = function(query) {
//   var res = {};
//   for (var i = 0; i < query.length; i++) {
//     for (var j = 0; j < 3; j++) {
//       if (query[i][j] instanceof Array) {
//         if (res[query[i][j][0]] === undefined) {
//           res[query[i][j][0]] = 1;
//         } else {
//           res[query[i][j][0]] = res[query[i][j][0]] + 1;
//         }
//       }
//     }
//   }
//   return res;
// }

// planQuery = function(query) {
//   var sortedQuery = query;
//   var varOc = variableOccurences(sortedQuery);
//   var sortfunc = entropyCompare(varOc);
//   sortedQuery.sort(sortfunc);
//
//   var firstElement=sortedQuery.shift();
//   var rest;
//   if(sortedQuery.length>0)
//     rest= planQuery(sortedQuery);
//   else
//     rest=sortedQuery;
//   return [firstElement].concat(rest);
//
//   // return sortedQuery;
// }


// Returns an array of objects matching a single query element
// Hexastore.prototype.queryResults = function(queryElement) {
//   var rawResults = this.queryDispatch(queryElement);
//   var res = [];
//   for(var i=0;i<rawResults.length;i++) {
//     res[i]={};
//     for(var j=0;j<4;j++) {
//       if(queryElement[j] instanceof Array) {
//         res[i][queryElement[j][0]]=rawResults[i][j];
//       }
//     }
//   }
//   return res;
// }

// Take a query, and instantiate varibles in it, i.e. replacing variables instances with values from a result
instantiateVariablesInQuery = function(result, theQuery) {
  var query = theQuery.slice().map(function(x) {
    return x.slice();
  });
  for (var i = 0; i < query.length; i++) {
    for (var j = 0; j < 3; j++) {
      if (query[i][j] instanceof Array) {
        if (result[query[i][j][0]] !== undefined) {
          query[i][j] = result[query[i][j][0]];
        }
      }
    }
  }
  return query;
};

// Takes a set of triples and an intermediate result, and returns a set of more complete results using informations in the triples
instantiateVariablesInResult = function(result, query, triples) {
  var res = [];
  for (var i = 0; i < triples.length; i++) {
    res[i] = clone(result);
    for (var j = 0; j < 3; j++) {
      if (query[j] instanceof Array) {
        res[i][query[j][0]] = triples[i][j];
      }
    }
  }
  return res;
};

// Clone an object
clone = function(obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
};

// Take a single result and a query and recursively return multiple results
Hexastore.prototype.doSearch = function(result, theQuery) {
  var query = instantiateVariablesInQuery(result, theQuery);
  var triples = this.queryDispatch(query[0]);
  var results = instantiateVariablesInResult(result, query[0], triples);
  query.shift();
  var res = [];
  if (query.length > 0) {
    for (var i = 0; i < results.length; i++) {
      res = res.concat(this.doSearch(results[i], query));
    }
  } else {
    res = results;
  }
  return res;
};

// Bootstrap a new search with an empty result
Hexastore.prototype.search = function(query) {
  var result = {};
  return this.doSearch(result, query);
};



module.exports = Hexastore;
