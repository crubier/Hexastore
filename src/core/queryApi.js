
/////////////////////////////////////////////////////////////////////////////
// Implementation fo the JS DSL for queries, very simple !

//
// Logic statements
//
// x means "operator"
// a means "argument"
//
// s means "subject"
// p means "predicate"
// o means "object"
// v means "value"

// This a is a fact, it is in the store
function fact(s, p, o, v) {
  return {
    x: "fact",
    a: [s, p, o, v === undefined ? true : v]
  };
}

// This is a variable subject, predicate or object,
function the(a) {
  return {
    x: "var",
    a: [a]
  };
}

// Matches patterns where all

function and() {
  return {
      x: "and",
      a: Array.prototype.slice.call(arguments)
  };
}

function or() {
  return {
      x: "or",
      a: Array.prototype.slice.call(arguments)
  };
}

function not(a) {
  return {
    x: "not",
    a: [a]
  };
}

function implies(a, b) {
  return or(not(a), b);
}

function equivalent(a, b) {
  return and(implies(a, b), implies(b, a));
}

module.exports.fact = fact;
module.exports.the = the;
module.exports.and = and;
module.exports.or = or;
module.exports.not = not;
module.exports.implies = implies;
module.exports.equivalent = equivalent;
