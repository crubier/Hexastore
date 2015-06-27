

function Identity() {

}

// null return value means "infinite"

Identity.prototype.queryXXX = function(f) {
  return null;
};

Identity.prototype.queryXXO = function(f) {
  return null;
};

Identity.prototype.queryXPX = function(f) {
  if(f[1]==="equals" || f[1]==="not equals" ) {
    return null;
  } else {
    return [];
  }
};

Identity.prototype.queryXPO = function(f) {
  if(f[1]==="equals") {
    return [[f[2], "equals", f[2], true]];
  } else if(f[1]==="not equals") {
    return null;
  } else {
    return [];
  }
};

Identity.prototype.querySXX = function(f) {
  return null;
};

Identity.prototype.querySXO = function(f) {
  if(f[0]===f[2]){
    return [[f[0],"equals",f[2]]];
  }
  else {
    return [[f[0],"not equals",f[2]]];
  }
};

Identity.prototype.querySPX = function(f) {
  if(f[1]==="equals") {
    return [[f[0], "equals", f[0], true]];
  } if(f[1]==="not equals") {
    return null;
  } else {
    return [];
  }
};

Identity.prototype.querySPO = function(f) {
  if(f[1]==="equals") {
    if(f[0]===f[2]){
      return [[f[0],f[1],f[2]]];
    } else {
      return [];
    }
  } else if(f[1]==="not equals") {
    if(f[0]!==f[2]){
      return [[f[0],f[1],f[2]]];
    } else {
      return [];
    }
  } else {
    return [];
  }
};


module.exports = Identity;
