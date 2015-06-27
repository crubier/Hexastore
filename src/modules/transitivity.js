
function Transitivity() {

}




// TODO @@finish implementation
// null return value means "infinite"

Transitivity.prototype.queryXXX = function(f,m) {
  return null;
};

Transitivity.prototype.queryXXO = function(f,m) {
  return null;
};

Transitivity.prototype.queryXPX = function(f,m) {
  return [];
};

Transitivity.prototype.queryXPO = function(f,m) {
  return [];
};

Transitivity.prototype.querySXX = function(f,m) {
  return [];
};

Transitivity.prototype.querySXO = function(f,m) {
  return [];
};

Transitivity.prototype.querySPX = function(f,m) {
  return [];
};

Transitivity.prototype.querySPO = function(f,m) {
  if(f[1].lastIndexOf("transitively ",0)===0) {
    if(transitiveSearch(10,f[0],f[1].substring(13),f[2],m,[f[0]])) {
      return [f[0],f[1],f[2]];
    } else {
      return [];
    }
  } else {
    return [];
  }
};



// steps left : recursion limit, integer going down each recursion
// subject : subject to start from
// predicate : the transitive predicate
// object : the target to reach,
// Module : the store modules to search in
// Done : the subjects that have already been searched.
function transitiveSearch(stepsLeft,subject,predicate,object,m,done){

  if(stepsLeft <= 0) {
    return false;
  }

  var nextOnes = m.querySPX([subject,predicate,{}],m).map(function(x){return x[2];});

  if(nextOnes.indexOf(object) >= 0){
    return true;
  } else {
    var i;
    for(i=0;i<nextOnes.length;i++){
      if(done.indexOf(nextOnes[i]) < 0) {
        if(transitiveSearch(stepsLeft-1,nextOnes[i],predicate,object,m,done)===true) {
          return true;
        }
        done.push(nextOnes[i]);
      }
    }
    return false;
  }

}


module.exports = Transitivity;
