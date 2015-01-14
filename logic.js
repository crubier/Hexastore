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

function val(obj) {
  if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
}

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

function fact(s, p, o, v) {
  return {
    s: s,
    p: p,
    o: o,
    v: v === undefined ? true : v
  };
}





// Algorithme de normalisation
// (1) Réecrire les equivalences
//     ( φ ↔ ψ ) => ( ( φ → ψ ) ∧ ( ψ → φ ) )
// (2) Réecrire les implications
//     ( φ → ψ ) => ( ¬φ ∨ ψ)
// (3) Réecrire en utilisant les lois de De Morgan :
//     ¬( φ ∧ ψ ) => ( ¬φ ∨ ¬ψ )
//     ¬( φ ∨ ψ ) => ( ¬φ ∧ ¬ψ )
// (4) Annuler les doubles négations
//     ¬( ¬φ ) => φ
// (5) Réecrire en utilisant les lois de distributivité :
//    ( φ ∨ ( ψ ∧ ζ ) ) => ( ( φ ∨ ψ ) ∧ ( φ ∨ ζ ) )
//    ( ( φ ∧ ψ ) ∨ ζ ) => ( ( φ ∨ ζ ) ∧ ( ψ ∨ ζ ) )




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
  SPO: function(f) {
    var res = [];
    switch (p) {
      case "inside":
        if (inside(geomParse(f.s), geomParse(f.o))) {
          res = append(res, fact(f.s, f.p, f.o, true));
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
    return [fact(f.o, "equals", f.o, true)];
  },
  XPX: function(f) {
    return null;
  },
  XPO: function(f) {
    return (f.p === "equals") ? [fact(f.o, "equals", f.o, true)] : null;
  },
  SXX: function(f) {
    return [fact(f.s, "equals", f.s, true)];
  },
  SXO: function(f) {
    return (f.s === f.o) ? [fact(f.s, "equals", f.o, true)] : [];
  },
  SPX: function(f) {
    return (f.p === "equals") ? [fact(f.s, "equals", f.s, true)] : null;
  },
  SPO: function(f) {
    return (f.p === "equals") ? ((f.s === f.o) ? [fact(f.s, f.p, f.o, true)] : []) : null;
  }
};




// A theory is an object containing the 8 XXX functions : XXX, XXO, XPX, XPO,  SXX, SXO, SPX, SPO
// The XXX functions :
//   is null if the theory can't solve the query generally, need more information
//   returns null if the theory can solve the query generally, but not this query in particular with its specific parameters
//   returns [] if the theory can solve this query in particular and found no results
//   returns [fact(...),fact(...)] if the theory can solve this query in particular and found results



MonthInYear = {
  XXX: {
    count: function() {
      return Infinity;
    },
    get: function() {}
  },
  XXO: {
    count: function() {
      return 12;
    },
    get: function() {}
  },
  XPX: {
    count: function() {
      return Infinity;
    },
    get: function() {}
  },
  XPO: {
    count: function() {
      return 12;
    },
    get: function() {}
  },
  SXX: {
    count: function() {
      return Infinity;
    },
    get: function() {}
  },
  SXO: {
    count: function() {
      return 1;
    },
    get: function() {}
  },
  SPX: {
    count: function() {
      return Infinity;
    },
    get: function() {}
  },
  SPO: {
    count: function() {
      return 1;
    },
    get: function() {}
  }
};
