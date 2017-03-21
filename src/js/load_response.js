function loadFile(file,type="json"){

  // I decide to transform the parameters to use them to construct the filename.
  // So if you have the XML value in type, you will get 'xml' which can be concatenated to the filename.
  type=type.toLowerCase();

  // Creation of the end filename.
  file=file+"."+type;

  // This function returns a Promise, which I think it's a good improvement and provides a clearer code.
  return new Promise((resolve,reject)=>{

    // This is the typical XMLHttpRequest used in JS to load files.
    const request = new XMLHttpRequest();

    // GET can be set as a method param for a better maintenability, but for this case, I decide to put it directly as a string.
    // The file param is the filename that we create before.
    request.open('GET', file, true);

    // Once the file is loaded we execute the following
    request.onload = function() {

      // If everything goes well we return both the request and the response.
      // I decide to return back as a 2 properties instead of one for a better readibility of the code in the main class.
      if (request.status >= 200 && request.status < 400) {
        resolve({
          request:request,
          response:request.response
        });

      // If something goes wrong we return the error.
      // It can be managed in the main class.
      } else {
        reject(request.error);
      }
    };

    // Finally we send the request.
    request.send();
  })

}

// I use the module.exports syntax, but you can use the export notation instead.
module.exports={
  loadFile:loadFile
}
