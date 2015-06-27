/////////////////////////////////////////////////////////////////////////////
// Proper query engine

// Clone a query
// query = {x:"fact",a:[{x:"var",a:["bob"]},"joe","lol"]}
// result = {"bob":"ok"}
// return = {x:"fact",a:["ok","joe","lol"]}
createInstantiatedQuery = function(query, result) {
  if (query.x === "var") {
    // It is a var, if possible we need to instantiate it.
    if (result.hasOwnProperty(query.a[0])) {
      // We have its value in the result, we instantiate it.
      return result[query.a[0]];
    } else  {
      // We dont have its value, we just clone it.
      return {
        x: "var",
        a: [query.a[0]]
      };
    }
  } else if (query.x !== undefined) {
    // It is an expression, we clone it.
    var newA = [];
    for (var i = 0; i < query.a.length; i++) {
      newA.push(createInstantiatedQuery(query.a[i],result));
    }
    return {
      x: query.x,
      a: newA
    };
  } else {
    // It is a string, leaf of the AST, we clone it.
    return query;
  }
};







function factorial(n) {
  if (n <= 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}



function nthPermutation(atoms, index) {
  var size = atoms.length;
    var src = atoms.slice(), dest = [], item;
    for (var i = 0; i < size; i++) {
        item = index % src.length;
        index = Math.floor(index / src.length);
        dest.push(src[item]);
        src.splice(item, 1);
    }
    return dest;
}

// ar=["a","b","c","d"];
// for (var i = 0; i < factorial(ar.length); i++) {
//   console.log(nthPermutation(ar,i));
// }






// Merge two result objects
// resultA = {"ok":"good"}
// resultB = {"lol":"wow"}
// result = {"ok":"good","lol":"wow"}
mergeResults = function(resultA, resultB) {
  var result = {};
  for (var keyA in resultA) {
    if (resultA.hasOwnProperty(keyA)) {
      result[keyA] = resultA[keyA];
    }
  }
  for (var keyB in resultB) {
    if (resultB.hasOwnProperty(keyB)) {
      result[keyB] = resultB[keyB];
    }
  }
  return result;
};



// Cached push. Push an array B to an array A, modifying A.
// cachedPush.apply(A, B);
var cachedPush = Array.prototype.push;



// This function takes a single result, a query, and return a list of result complying with the result and the query
// module = the module to use
// result = {}
// query = and(fact(the("x"),"<","7"),fact(the("x"),">","4"),fact(the("x"),"is","integer"))
// return = [{x:5},{x:6}]
solveQuery = function(query, result, m) {
  var instantiatedQuery = createInstantiatedQuery(query, result);
  var i,j; // loop index
  var returnValue; // return value
  // for each result in base:
  switch (instantiatedQuery.x) {
    case "fact":
      return solveFact(instantiatedQuery.a, result, m);
    case "and":
      // TODO permutate order if failure ( recursive query return null)
      returnValue = [result];
      for (i = 0; i < instantiatedQuery.a.length; i++) {
        var newReturnValue = [];
        for (j = 0; j<returnValue.length; j++) {
          // Merge the two tables
          cachedPush.apply(newReturnValue, solveQuery(instantiatedQuery.a[i], returnValue[j], m));
        }
        returnValue=newReturnValue;
      }
      return returnValue;
    case "or":
      returnValue = [];
      for (i = 0; i < instantiatedQuery.a.length; i++) {
        cachedPush.apply(returnValue, solveQuery(instantiatedQuery.a[i], result, m));
      }
      return returnValue;
    case "not":
      var res = solveQuery(instantiatedQuery.a[0], result, m);
      if (res===null || res.length > 0) {
        return [];
      } else {
        return [result];
      }
  }
};




// Returns a set of triples matching a single query element
// store = a data store complying to the interface
// fact = [{"var":"bob"},"ok","lol"]
// triples = [["lol","ok","lol"],["joe","ok","lol"]]
// return = [{"bob":"lol"},{"bob":"joe"}]
solveFact = function(fact, result, m) {
  var triples;
  var returnValue = [];
  if (fact[0].x === "var") {
    if (fact[1].x === "var") {
      if (fact[2].x === "var") {
        triples = m.queryXXX(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[0].a[0]] = triple[0];
            returnElement[fact[1].a[0]] = triple[1];
            returnElement[fact[2].a[0]] = triple[2];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      } else {
        triples = m.queryXXO(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[0].a[0]] = triple[0];
            returnElement[fact[1].a[0]] = triple[1];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      }
    } else {
      if (fact[2].x === "var") {
        triples = m.queryXPX(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[0].a[0]] = triple[0];
            returnElement[fact[2].a[0]] = triple[2];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      } else {
        triples = m.queryXPO(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[0].a[0]] = triple[0];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      }
    }
  } else {
    if (fact[1].x === "var") {
      if (fact[2].x === "var") {
        triples = m.querySXX(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[1].a[0]] = triple[1];
            returnElement[fact[2].a[0]] = triple[2];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      } else {
        triples = m.querySXO(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[1].a[0]] = triple[1];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      }
    } else {
      if (fact[2].x === "var") {
        triples = m.querySPX(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnElement[fact[2].a[0]] = triple[2];
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      } else {
        triples = m.querySPO(fact,m);
        if (triples === null) {
          return null;
        } else {
          triples.forEach(function(triple) {
            var returnElement = {};
            returnValue.push(mergeResults(result, returnElement));
          });
        }
      }
    }
  }
  return returnValue;
};



/////////////////////////////////////////////////////////////////////////////
// Exported object

function Engine(m)  {
  this.module = m;
}


Engine.prototype.query = function(query) {
  return solveQuery(query, {}, this.module);
};

module.exports = Engine;
