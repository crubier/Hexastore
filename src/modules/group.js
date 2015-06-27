

// create a new group
// modules : Array of modules
function Group(modules) {
  if(Object.prototype.toString.call(modules) === '[object Array]') {
    this.modules = modules;
  } else {
    this.modules = [];
  }
  console.log(this.modules.length + " modules loaded");
}

Group.prototype.addModule = function(m){
  this.modules.push(m);
};

// return value
// [] : this module has no instance verifying this information
// [a,b,...] : this module has some instance veryfing this information
// null : this module has an infinite number of instance verifying this information



Group.prototype.queryXXX = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].queryXXX(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.queryXXO = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].queryXXO(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.queryXPX = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].queryXPX(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.queryXPO = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    console.log(this.modules[i].constructor);
    var temp = this.modules[i].queryXPO(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.querySXX = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].querySXX(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.querySXO = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].querySXO(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.querySPX = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].querySPX(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

Group.prototype.querySPO = function(query,m){
  var res = [];
  var i =0;
  for (i=0;i<this.modules.length;i++){
    var temp = this.modules[i].querySPO(query,m);
    if(temp===null) return null;
    var j=0;
    for(j=0;j<temp.length;j++) {
      res.push(temp[j]);
    }
  }
  return res;
};

// When you export a module, just make sure it has "query" functions working.
module.exports = Group;
