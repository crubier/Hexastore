var chai = require('chai');
chai.use(require('chai-fuzzy'));
var assert = chai.assert;
var fs = require('fs');




var Hexastore = require('./index.js');




var a =
  and(
    fact(the("person"), "first name", "Vincent"),
    fact(the("person"), "last name", "Lecrubier"),
    fact(the("person"), "participation", the("participation")),
    fact(the("participation"), "not place", "Tours"),
    fact(the("participation"), "date", the("date")),
    fact(the("date"), "year", the("year")),
    or(
      fact(the("year"), "equals", "2013"),
      fact(the("year"), "equals", "2016"),
      and(
        fact(the("year"), 'in', the("year range")),
        fact(the("year range"), 'min', "1995"),
        fact(the("year range"), 'max', "2000")
      )
    )
  );

  console.log(JSON.stringify(a));
