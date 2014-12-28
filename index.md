![](HexastoreLogo.svg)

A fast, pure javascript triple store implementation, also useful as a graph database. Works in any browser, with browserify or webpack. Early development, API is subject to changes.

Hexastore is based on [this research paper](http://karras.rutgers.edu/hexastore.pdf). It is a way to structure RDF data such that queries are really fast. However, as implemented here, it has a 6 fold increase in memory usage as compared to a naive implementation of a triple store.

[![Travis](https://img.shields.io/travis/crubier/Hexastore.svg?style=flat-square)](https://travis-ci.org/crubier/Hexastore) [![Coverage Status](https://img.shields.io/coveralls/crubier/Hexastore.svg?style=flat-square)](https://coveralls.io/r/crubier/Hexastore) [![Gemnasium](https://img.shields.io/gemnasium/crubier/Hexastore.svg?style=flat-square)](https://gemnasium.com/crubier/Hexastore)  [![npm](https://img.shields.io/npm/dm/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore) [![npm](https://img.shields.io/npm/v/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore) [![node](https://img.shields.io/node/v/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore) [![GitHub tag](https://img.shields.io/github/release/crubier/Hexastore.svg?style=flat-square)](https://github.com/crubier/Hexastore)

# Installation

It is pure JS, so nothing fancy, just:

~~~~ {.bash}
npm install hexastore
~~~~

# Usage

## Create a database

Just require Hexastore, and then you can start creating stores everywhere !

~~~~ {.javascript}
var Hexastore = require('Hexastore');
var mydb = new Hexastore();
~~~~

## Add triples

### Add a single triple

~~~~ {.javascript}
mydb.put(["hexastore","is","awesome"]);
~~~~

### Add a collection of triples

~~~~ {.javascript}
mydb.putAll([
    ["hexastore","is","nice"],
    ["hexastore","speed","fast"],
    ["javascript","is","nice"]
  ]);
~~~~

### Add triples represented as nested JS objects

~~~~ {.javascript}
mydb.addSPO({
    hexastore:{is:{awesome:true,nice:true},speed:{fast:true}},
    javascript:{is:{nice:true}}
  });
~~~~

Or

~~~~ {.javascript}
mydb.addSOP({
    hexastore:{awesome:{is:true},nice:{is:true},fast:{speed:true}},
    javascript:{nice:{is:true}}
  };)
~~~~

You get it ? So basically you can use any of the 6 orderings of the hexastore :

~~~~ {.javascript}
mydb.addSPO(...);
mydb.addSOP(...);
mydb.addOSP(...);
mydb.addOPS(...);
mydb.addPSO(...);
mydb.addPOS(...);
~~~~

### Add named JS Objects

Finally, you can add arbitrary JS object this way, it acts a bit like Object Relational Mapping:

~~~~ {.javascript}
mydb.addObject("bob",{address:{number:10,street:'Avenue des Champs Elysees',city:'Paris',country:'France'},friend:["toto","titi","tata"]})
~~~~

Which is equivalent to:

~~~~ {.javascript}
mydb.putAll([
    ["bob","address","{address:{number:10,street:'Avenue des Champs Elysees',city:'Paris',country:'France'}"],
    ["{address:{number:10,street:'Avenue des Champs Elysees',city:'Paris',country:'France'}","number","10"],
    ["{address:{number:10,street:'Avenue des Champs Elysees',city:'Paris',country:'France'}","street","Avenue des Champs Elysees"],
    ["{address:{number:10,street:'Avenue des Champs Elysees',city:'Paris',country:'France'}","city","Paris"],
    ["bob","friend","["toto","titi","tata"]"],
    ["["toto","titi","tata"]","0","toto"],
    ["["toto","titi","tata"]","1","titi"],
    ["["toto","titi","tata"]","2","tata"]
  ]);
~~~~

## Import and export

Databases are imported and exported as Subjects containing Predicates containing Objects containing Values (SPO ordering). Import and export can work on normal JSON files, or on Zipped "data.json" files.

~~~~ {.javascript}
db.import("Mydatabase");    // Import "Mydatabase.json"
db.importZip("Mydatabase"); // Import "Mydatabase.zip"
db.importNt("Mydatabase");  // Import "Mydatabase.nt"

db.export("Mydatabase");    // Export "Mydatabase.json"
db.exportZip("Mydatabase"); // Export "Mydatabase.zip"
db.exportNt("Mydatabase");  // Export "Mydatabase.nt"
~~~~

## Search

### Simple search

Searching is **very** simple. Just query a set of triples, adding `[]` around variable names. This acts a bit like SQL `JOIN` statements.

~~~~ {.javascript}
var result = db.search([
    [["what"],"is","nice"]
  ]);
// result == [{what:hexastore},{what:javascript}]
~~~~

A bit more complex

~~~~ {.javascript}
var result = db.search([
    [["what"],"is","nice"]
    [["what"],"speed",["howfast"]]
  ]);
// result == [{what:"hexastore",howfast:"fast"}]
~~~~

Queries are really fast, so don't hesitate to do complex queries.

### Using filters

You can use filters to filter results, a bit like in SQL `WHERE` statements

~~~~ {.javascript}
var result = db.search([
    [["what"],"is","nice"]
  ]).filter(function(match){
    return match.what.length <10;
  })
// result == [what:"hexastore"]
~~~~

# Tests

~~~~ {.bash}
gulp test
~~~~

# Contributing
