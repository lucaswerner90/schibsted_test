function loadResponse(file,type="json"){

  type=type.toLowerCase();
  file=file+"."+type;

  switch (type) {
    case 'json':
      return fetch(file)
      .then(function(response) {
        return response.json();
      })
      .catch((error)=>{
        return error;
      });

    default:
      const x = new XMLHttpRequest();
      x.open("GET", file, true);
      x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200){
          return x.responseXML;
        }
      };
      x.send(null);
  }



}

module.exports={
  loadResponse:loadResponse
}
