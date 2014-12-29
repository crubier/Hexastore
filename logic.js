db.find(
  ['and', []
    []

  ]
);







and(
  fact(the("person"), "first name", "Vincent"),
  fact(the("person"), "last name", "Lecrubier"),
  fact(the("person"), "participation", the("participation")),
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




function the(name, condition) {

}



function and() {
  return {
    operator: "and",
    operand: Array.prototype.slice.call(arguments)
  };
}

function or() {
  return {
    operator: "or",
    operand: Array.prototype.slice.call(arguments)
  };
}

function not(a) {
  return {
    operator: "not",
    operand: a
  };
}

function implies(a, b) {
  return or(not(a), b);
}

function equivalent(a, b) {
  return and(implies(a, b), implies(b, a));
}









Geometry2D = {
  XXX: function(f) {
    return null;
  },
  XXO: function(f) {
    return null;
  },
  XPX: function(f) {
    return null;
  },
  XPO: function(f) {
    return null;
  },
  SXX: function(f) {
    return null;
  },
  SXO: function(f) {
    return null;
  },
  SPX: function(f) {
    return null;
  },
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
  XXX: function(f) {
    return null;
  },
  XXO: function(f) {
    return [
      [f[2], "equals", f[2], true]
    ];
  },
  XPX: function(f) {
    return null;
  },
  XPO: function(f) {
    return (f[1] === "equals") ? [
      [f[2], "equals", f[2], true]
    ] : null;
  },
  SXX: function(f) {
    return [
      [f[0], "equals", f[0], true]
    ];
  },
  SXO: function(f) {
    return (f[0] === f[2]) ? [f[0], "equals", f[2], true] : [];
  },
  SPX: function(f) {
    return (f[1] === "equals") ? [
      [f[0], "equals", f[0], true]
    ] : null;
  },
  SPO: function(f) {
    return (f[1] === "equals") ? ((f[0] === f[2]) ? [f[0], f[1], f[2], true] : []) : null;
  }
};
