
import * as ResponseModule from './load_response';

class MainClass{

  constructor(selector='select_type'){
    //Add the event to the select element;
    const element=document.getElementsByName(selector)[0];
    const _self=this;
    element.addEventListener("change",function(e){
      _self.changeData(e.target.value);
    });


  }

  changeData(file_type='json'){
    const _self=this;
    ResponseModule.loadResponse('./data/response',file_type).then((data)=>{
        _self._printData(data,file_type);
    })

  }

  _printData(data,file_type){
    console.log(data);
  }

}


new MainClass();
