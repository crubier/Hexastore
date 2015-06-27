function Dates() {

}

dateIsValid = function (date) {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return date.getTime() === date.getTime();
};

// null return value means "infinite"

Dates.prototype.queryXXX = function(f) {
  return null;
};

Dates.prototype.queryXXO = function(f) {
  return null;
};

Dates.prototype.queryXPX = function(f) {
  switch (f[1]) {
    case "year":
    case "month":
    case "day":
    case "hour":
    case "minute":
    case "second":
    case "millisecond":
      return null;
    default:
      return [];
  }
};

Dates.prototype.queryXPO = function(f) {
  switch (f[1]) {
    case "year":
    case "month":
    case "day":
    case "hour":
    case "minute":
    case "second":
    case "millisecond":
      return null;
    default:
      return [];
  }
};

Dates.prototype.querySXX = function(f) {
  var res = [];
  var temp = Date.parse(f[0]);
  if(dateIsValid(temp)) {
      if(temp.getYear()===temp.getYear())res.push([f[0],"year",temp.getYear().toString()]);
      if(temp.getMonth()===temp.getMonth())res.push([f[0],"month",temp.getMonth().toString()]);
      if(temp.getDate()===temp.getDate())res.push([f[0],"day",temp.getDate().toString()]);
      if(temp.getHours()===temp.getHours())res.push([f[0],"hour",temp.getHours().toString()]);
      if(temp.getMinutes()===temp.getMinutes())res.push([f[0],"minute",temp.getMinutes().toString()]);
      if(temp.getSeconds()===temp.getSeconds())res.push([f[0],"second",temp.getSeconds().toString()]);
      if(temp.getMilliseconds()===temp.getMilliseconds())res.push([f[0],"millisecond",temp.getMilliseconds().toString()]);
  }
  return res;
};

Dates.prototype.querySXO = function(f) {
  var res = [];
  var temp = Date.parse(f[0]);
  if(dateIsValid(temp)) {
    if(temp.getYear()===parseInt(f[2])) res.push([f[0],"year",f[2]]);
    if(temp.getMonth()===parseInt(f[2])) res.push([f[0],"month",f[2]]);
    if(temp.getDate()===parseInt(f[2])) res.push([f[0],"day",f[2]]);
    if(temp.getHours()===parseInt(f[2])) res.push([f[0],"hour",f[2]]);
    if(temp.getMinutes()===parseInt(f[2])) res.push([f[0],"minute",f[2]]);
    if(temp.getSeconds()===parseInt(f[2])) res.push([f[0],"second",f[2]]);
    if(temp.getMilliseconds()===parseInt(f[2])) res.push([f[0],"millisecond",f[2]]);
  }
  return res;
};

Dates.prototype.querySPX = function(f) {
  var temp;
  switch (f[1]) {
    case "year":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getYear().toString()]];
      } else {
        return [];
      }
      break;
    case "month":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getMonth().toString()]];
      } else {
        return [];
      }
      break;
    case "day":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getDate().toString()]];
      } else {
        return [];
      }
      break;
    case "hour":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getHours().toString()]];
      } else {
        return [];
      }
      break;
    case "minute":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getMinutes().toString()]];
      } else {
        return [];
      }
      break;
    case "second":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getSeconds().toString()]];
      } else {
        return [];
      }
      break;
    case "millisecond":
      temp = Date.parse(f[0]);
      if(dateIsValid(temp)){
        return [[f[0],f[1],temp.getMilliseconds().toString()]];
      } else {
        return [];
      }
      break;
    default:
      return [];
  }
};


Dates.prototype.querySPO = function(f) {
  switch (f[1]) {
    case "year":
      if(parseInt(f[2])===Date.parse(f[0]).getYear()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "month":
      if(parseInt(f[2])===Date.parse(f[0]).getMonth()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "day":
      if(parseInt(f[2])===Date.parse(f[0]).getDate()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "hour":
      if(parseInt(f[2])===Date.parse(f[0]).getHours()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "minute":
      if(parseInt(f[2])===Date.parse(f[0]).getMinutes()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "second":
      if(parseInt(f[2])===Date.parse(f[0]).getSeconds()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    case "millisecond":
      if(parseInt(f[2])===Date.parse(f[0]).getMilliseconds()){
        return [[f[0],f[1],f[2]]];
      }else {
        return [];
      }
      break;
    default:
      return [];
  }
};


module.exports = Dates;
