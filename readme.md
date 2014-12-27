Hexastore [![Travis](https://img.shields.io/travis/crubier/Hexastore.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/dm/Hexastore.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/v/Hexastore.svg?style=flat-square)]()
[![node](https://img.shields.io/node/v/Hexastore.svg?style=flat-square)]()
[![Gemnasium](https://img.shields.io/gemnasium/crubier/Hexastore.svg?style=flat-square)]()
=========

A fast, pure javascript triple store implementation, also useful as a graph database. Works in any browser, with browserify or webpack. Early development, API is subject to changes.

Hexastore is based on [this research paper](http://karras.rutgers.edu/hexastore.pdf). It is a way to structure RDF data such that queries are really fast. However, as implemented here, it has a 6 fold increase in memory usage as compared to a naive implementation of a triple store.

## Installation

It is pure JS, so nothing fancy, just:

    npm install hexastore

## Usage

### Create a database

Just require Hexastore, and then you can start creating stores everywhere !

    var Hexastore = require('Hexastore');
    var mydb = new Hexastore();

### Add triples

To add a single triple

    mydb.put(["hexastore","is","awesome"]);

To add a collection of triples

    mydb.putAll([
        ["hexastore","is","nice"],
        ["hexastore","speed","fast"],
        ["javascript","is","nice"]
      ]);

To add triples represented as nested JS objects

    mydb.addSPO({
        hexastore:{is:{awesome:true,nice:true},speed:{fast:true}},
        javascript:{is:{nice:true}}
      });

Or

    mydb.addSOP({
        hexastore:{awesome:{is:true},nice:{is:true},fast:{speed:true}},
        javascript:{nice:{is:true}}
      };)

You get it ? So basically you can use any of the 6 orderings of the hexastore :

    mydb.addSPO(...);
    mydb.addSOP(...);
    mydb.addOSP(...);
    mydb.addOPS(...);
    mydb.addPSO(...);
    mydb.addPOS(...);

### Import and export

Databases are imported and exported as Subjects containing Predicates containing Objects containing Values (SPO ordering). Import and export can work on normal JSON files, or on Zipped "data.json" files.

    db.import("Mydatabase");    // Import "Mydatabase.json"
    db.importZip("Mydatabase"); // Import "Mydatabase.zip"
    db.importNt("Mydatabase");  // Import "Mydatabase.nt"

    db.export("Mydatabase");    // Export "Mydatabase.json"
    db.exportZip("Mydatabase"); // Export "Mydatabase.zip"
    db.exportNt("Mydatabase");  // Export "Mydatabase.nt"

### Search

Searching is **very** simple. Just query a set of triples, adding `[]` around variable names


    var result = db.search([
        [["what"],"is","nice"]
      ]);
    // result == [{what:hexastore},{what:javascript}]

A bit more complex

    var result = db.search([
        [["what"],"is","nice"]
        [["what"],"speed",["howfast"]]
      ]);
    // result == [{what:"hexastore",howfast:"fast"}]

Queries are really fast, so don't hesitate to do complex queries.

## Tests

    gulp test

## Contributing
