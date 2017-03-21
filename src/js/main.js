// Here we import the module to load the response, I decided to create a separate file to mantain the code clean
import * as ResponseModule from './load_response';

// As you can see, I'm using the new ES6 features, which I consider a good improvement for JS.
// This code is compiled after to ES5 through the gulp file.

// Here is the main class of the application
class AdvertiserListClass{

  // The constructor sets predefined values for the vars.
  // 'selector' references at the select element. I decided to add the functionality in this class instead of create their own class only for readibility end.
  // 'filename' is the name of the file that we'll access later.
  constructor(selector='select_type',filename='./data/response'){

    // Here we set the element of the DOM to the element variable.
    this.selector=document.getElementsByName(selector)[0];

    // Set the filename
    this.filename=filename;

    // We execute the method that loads data in first place, so data is displayed at the beginning of the app.
    this.changeData();

    // We add the events for the select element.
    this._setSelectEvents(this.selector);

  }

  // Change data calls the loadFile method of the ResponseModule.
  // It's set the default file_type to json, but it'll change accordingly to the select element
  changeData(file_type='json'){

    // I think that is a good practice create a var referencing the this object in a class, so you avoid 'this' references problems later.
    const _self=this;

    // Wait for the loadFile function to finish (I use a promise for this purpose) but you can use a callback function that can be executed inside it.
    ResponseModule.loadFile(_self.filename,file_type).then((data)=>{

      // If everything goes right we call the printData method that updates the code.
      _self._printData(data);
    })
    .catch((err)=>{
      console.error(err);
    });

  }

  // We set all the events of the select in a separate method.
  // You can pass any DOM element through the parameters, in this case we only call it once for the select element.
  _setSelectEvents(element){
    const _self=this;

    // Change calls the changeData method with the value selected.
    element.addEventListener("change",function(e){
      _self.changeData(e.target.value);
    })

    // This two events manage the tooltip display.
    element.addEventListener("mouseenter",function(e){
      const tooltip_elem=document.getElementsByClassName("tooltiptext")[0];
      tooltip_elem.style.visibility='visible';
    });
    element.addEventListener("mouseleave",function(e){
      const tooltip_elem=document.getElementsByClassName("tooltiptext")[0];
      tooltip_elem.style.visibility='hidden';
    });
  }


  // printData basically receives the data from ResponseModule.loadFile and updates the
  // corresponding DOM elements that displays the information as a code.
  _printData(data){

    const highlight_request=document.getElementById('request');
    const highlight_response_type=document.getElementById('response_type');
    const highlight_response_content=document.getElementById('response_content');
    highlight_request.innerText="GET "+data.request.responseURL;
    highlight_response_type.innerText="HTTP "+data.request.status+" "+data.request.statusText+" \n"+data.request.getAllResponseHeaders();
    highlight_response_content.innerText=data.response;

    hljs.highlightBlock(highlight_request);
    hljs.highlightBlock(highlight_response_type);
    hljs.highlightBlock(highlight_response_content);

  }

}


new AdvertiserListClass();
