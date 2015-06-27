

function Reciprocity() {

}

// null return value means "infinite"

Reciprocity.prototype.queryXXX = function(f,m) {
  return null;
};

Reciprocity.prototype.queryXXO = function(f,m) {
  return null;
};

Reciprocity.prototype.queryXPX = function(f,m) {
  if(f[1].lastIndexOf("reverse ",0)===0) {
    var nf = [f[2],f[1].substring(8),f[0]];
    var r = m.queryXPX(nf,m);
    if (r===null) {
      return null;
    } else {
      return r.map(function(x){return [x[2],"reverse "+x[1],x[0],x[3]];});
    }
  }
  else {
    return [];
  }
};

Reciprocity.prototype.queryXPO = function(f,m) {
  if(f[1].lastIndexOf("reverse ",0)===0) {
    var nf = [f[2],f[1].substring(8),f[0]];
    var r = m.querySPX(nf,m);
    if (r===null) {
      return null;
    } else {
      return r.map(function(x){return [x[2],"reverse "+x[1],x[0],x[3]];});
    }
  }
  else {
    return [];
  }
};

Reciprocity.prototype.querySXX = function(f,m) {
  return null;
};

Reciprocity.prototype.querySXO = function(f,m) {
  return null;
};

Reciprocity.prototype.querySPX = function(f,m) {
  if(f[1].lastIndexOf("reverse ",0)===0) {
    var nf = [f[2],f[1].substring(8),f[0]];
    var r= m.queryXPO(nf,m);
    if (r===null) {
      return null;
    } else {
      return r.map(function(x){return [x[2],"reverse "+x[1],x[0],x[3]];});
    }
  }
  else {
    return [];
  }
};

Reciprocity.prototype.querySPO = function(f,m) {
  if(f[1].lastIndexOf("reverse ",0)===0) {
    var nf = [f[2],f[1].substring(8),f[0]];
    var r = m.querySPO(nf,m);
    if (r===null) {
      return null;
    } else {
      return r.map(function(x){return [x[2],"reverse "+x[1],x[0],x[3]];});
    }
  }
  else {
    return [];
  }
};

module.exports = Reciprocity;
