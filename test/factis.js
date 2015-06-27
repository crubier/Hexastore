var Factis = require('../src/factis.js');

var fact = Factis.fact;
var the = Factis.the;
var and = Factis.and;
var or = Factis.or;
var not = Factis.not;
var implies = Factis.implies;
var equivalent = Factis.equivalent;

var base = new Factis.base();
base.hexastore.add(["I","is","cool"]);
base.hexastore.add(["Mickey","is","cool"]);
base.hexastore.add(["You","not is","cool"]);
base.hexastore.add(["You","is","douche"]);
base.hexastore.add(["douche","color","red"]);
base.hexastore.remove(["You","is","douche"]);
base.hexastore.add(["You","is","douche"]);
base.hexastore.add(["Donald","is","bob"]);
base.hexastore.add(["Donald","belongs to","Disney"]);
base.hexastore.add(["Mickey","belongs to","Disney"]);

base.hexastore.add(["A","friend with","B"]);
base.hexastore.add(["B","friend with","C"]);
base.hexastore.add(["D","friend with","C"]);
base.hexastore.add(["E","friend with","F"]);
base.hexastore.add(["F","friend with","E"]);


console.log(base.query(
  or(
    and(
      fact(the("coucou"),"is","bob"),
      fact(the("coucou"),"belongs to","Disney")
    ),
    and(
      fact(the("person"),"is",the("thing")),
      fact(the("thing"),"equals","cool"),
      not(fact(the("person"),"equals","Mickey"))
    )
  )
));


console.log(base.query(
  fact("A","transitively friend with","C")
));
