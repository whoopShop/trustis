// dynamicSort sorts tables by property passed in
dynamicSort = function(property) {
  // norm() is required because of stupid, non-international sorting in js.
  // Normalizes the icelandic characters to put them in their place
  function norm(str){
     return str
             .toLowerCase()
             .replace(/Á|á/,'azzz').replace(/É|é/,'ezzz').replace(/Í|í/,'izzz')
             .replace(/Ð|ð/,'dzzz').replace(/Ó|ó/,'ozzz').replace(/Ú|ú/,'uzzz')
             .replace(/Ý|ý/,'yzzz').replace(/Þ|þ/,'zz').replace(/Æ|æ/,'zzz').replace(/Ö|ö/,'zzzz');
  }
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (norm(a[property]) < norm(b[property])) ? -1 : (norm(a[property]) > norm(b[property])) ? 1 : 0;
      return result * sortOrder;
  }
};