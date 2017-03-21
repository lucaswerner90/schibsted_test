(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function loadFile(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "json";

  // I decide to transform the parameters to use them to construct the filename.
  // So if you have the XML value in type, you will get 'xml' which can be concatenated to the filename.
  type = type.toLowerCase();

  // Creation of the end filename.
  file = file + "." + type;

  // This function returns a Promise, which I think it's a good improvement and provides a clearer code.
  return new Promise(function (resolve, reject) {

    // This is the typical XMLHttpRequest used in JS to load files.
    var request = new XMLHttpRequest();

    // GET can be set as a method param for a better maintenability, but for this case, I decide to put it directly as a string.
    // The file param is the filename that we create before.
    request.open('GET', file, true);

    // Once the file is loaded we execute the following
    request.onload = function () {

      // If everything goes well we return both the request and the response.
      // I decide to return back as a 2 properties instead of one for a better readibility of the code in the main class.
      if (request.status >= 200 && request.status < 400) {
        resolve({
          request: request,
          response: request.response
        });

        // If something goes wrong we return the error.
        // It can be managed in the main class.
      } else {
        reject(request.error);
      }
    };

    // Finally we send the request.
    request.send();
  });
}

// I use the module.exports syntax, but you can use the export notation instead.
module.exports = {
  loadFile: loadFile
};

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); // Here we import the module to load the response, I decided to create a separate file to mantain the code clean


var _load_response = require('./load_response');

var ResponseModule = _interopRequireWildcard(_load_response);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// As you can see, I'm using the new ES6 features, which I consider a good improvement for JS.
// This code is compiled after to ES5 through the gulp file.

// Here is the main class of the application
var AdvertiserListClass = function () {

  // The constructor sets predefined values for the vars.
  // 'selector' references at the select element. I decided to add the functionality in this class instead of create their own class only for readibility end.
  // 'filename' is the name of the file that we'll access later.
  function AdvertiserListClass() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select_type';
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './data/response';

    _classCallCheck(this, AdvertiserListClass);

    // Here we set the element of the DOM to the element variable.
    this.selector = document.getElementsByName(selector)[0];

    // Set the filename
    this.filename = filename;

    // We execute the method that loads data in first place, so data is displayed at the beginning of the app.
    this.changeData();

    // We add the events for the select element.
    this._setSelectEvents(this.selector);
  }

  // Change data calls the loadFile method of the ResponseModule.
  // It's set the default file_type to json, but it'll change accordingly to the select element


  _createClass(AdvertiserListClass, [{
    key: 'changeData',
    value: function changeData() {
      var file_type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';

      // I think that is a good practice create a var referencing the this object in a class, so you avoid 'this' references problems later.
      var _self = this;

      // Wait for the loadFile function to finish (I use a promise for this purpose) but you can use a callback function that can be executed inside it.
      ResponseModule.loadFile(_self.filename, file_type).then(function (data) {

        // If everything goes right we call the printData method that updates the code.
        _self._printData(data);
      }).catch(function (err) {
        console.error(err);
      });
    }

    // We set all the events of the select in a separate method.
    // You can pass any DOM element through the parameters, in this case we only call it once for the select element.

  }, {
    key: '_setSelectEvents',
    value: function _setSelectEvents(element) {
      var _self = this;

      // Change calls the changeData method with the value selected.
      element.addEventListener("change", function (e) {
        _self.changeData(e.target.value);
      });

      // This two events manage the tooltip display.
      element.addEventListener("mouseenter", function (e) {
        var tooltip_elem = document.getElementsByClassName("tooltiptext")[0];
        tooltip_elem.style.visibility = 'visible';
      });
      element.addEventListener("mouseleave", function (e) {
        var tooltip_elem = document.getElementsByClassName("tooltiptext")[0];
        tooltip_elem.style.visibility = 'hidden';
      });
    }

    // printData basically receives the data from ResponseModule.loadFile and updates the
    // corresponding DOM elements that displays the information as a code.

  }, {
    key: '_printData',
    value: function _printData(data) {

      var highlight_request = document.getElementById('request');
      var highlight_response_type = document.getElementById('response_type');
      var highlight_response_content = document.getElementById('response_content');
      highlight_request.innerText = "GET " + data.request.responseURL;
      highlight_response_type.innerText = "HTTP " + data.request.status + " " + data.request.statusText + " \n" + data.request.getAllResponseHeaders();
      highlight_response_content.innerText = data.response;

      hljs.highlightBlock(highlight_request);
      hljs.highlightBlock(highlight_response_type);
      hljs.highlightBlock(highlight_response_content);
    }
  }]);

  return AdvertiserListClass;
}();

new AdvertiserListClass();

},{"./load_response":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbG9hZF9yZXNwb25zZS5qcyIsInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxTQUFBLEFBQVMsU0FBVCxBQUFrQixNQUFpQjtNQUFaLEFBQVksMkVBQVAsQUFBTyxBQUVqQzs7QUFDQTtBQUNBO1NBQUssS0FBTCxBQUFLLEFBQUssQUFFVjs7QUFDQTtTQUFLLE9BQUEsQUFBSyxNQUFWLEFBQWMsQUFFZDs7QUFDQTthQUFPLEFBQUksUUFBUSxVQUFBLEFBQUMsU0FBRCxBQUFTLFFBQVMsQUFFbkM7O0FBQ0E7UUFBTSxVQUFVLElBQWhCLEFBQWdCLEFBQUksQUFFcEI7O0FBQ0E7QUFDQTtZQUFBLEFBQVEsS0FBUixBQUFhLE9BQWIsQUFBb0IsTUFBcEIsQUFBMEIsQUFFMUI7O0FBQ0E7WUFBQSxBQUFRLFNBQVMsWUFBVyxBQUUxQjs7QUFDQTtBQUNBO1VBQUksUUFBQSxBQUFRLFVBQVIsQUFBa0IsT0FBTyxRQUFBLEFBQVEsU0FBckMsQUFBOEMsS0FBSyxBQUNqRDs7bUJBQVEsQUFDRSxBQUNSO29CQUFTLFFBRlgsQUFBUSxBQUVXLEFBR3JCO0FBTFUsQUFDTjs7QUFLSjtBQUNDO0FBUkQsYUFRTyxBQUNMO2VBQU8sUUFBUCxBQUFlLEFBQ2hCO0FBQ0Y7QUFmRCxBQWlCQTs7QUFDQTtZQUFBLEFBQVEsQUFDVDtBQTdCRCxBQUFPLEFBK0JSLEdBL0JROzs7QUFpQ1Q7QUFDQSxPQUFBLEFBQU87WUFBUCxBQUFlLEFBQ0o7QUFESSxBQUNiOzs7Ozs7Ozs7Ozs7O0tDN0NGOzs7QUFDQTs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaO0FBQ0E7O0FBRUE7SSxBQUNNLGtDQUVKOztBQUNBO0FBQ0E7QUFDQTtpQ0FBOEQ7UUFBbEQsQUFBa0QsK0VBQXpDLEFBQXlDO1FBQTNCLEFBQTJCLCtFQUFsQixBQUFrQjs7MEJBRTVEOztBQUNBO1NBQUEsQUFBSyxXQUFTLFNBQUEsQUFBUyxrQkFBVCxBQUEyQixVQUF6QyxBQUFjLEFBQXFDLEFBRW5EOztBQUNBO1NBQUEsQUFBSyxXQUFMLEFBQWMsQUFFZDs7QUFDQTtTQUFBLEFBQUssQUFFTDs7QUFDQTtTQUFBLEFBQUssaUJBQWlCLEtBQXRCLEFBQTJCLEFBRTVCO0FBRUQ7O0FBQ0E7Ozs7OztpQ0FDNEI7VUFBakIsQUFBaUIsZ0ZBQVAsQUFBTyxBQUUxQjs7QUFDQTtVQUFNLFFBQU4sQUFBWSxBQUVaOztBQUNBO3FCQUFBLEFBQWUsU0FBUyxNQUF4QixBQUE4QixVQUE5QixBQUF1QyxXQUF2QyxBQUFrRCxLQUFLLFVBQUEsQUFBQyxNQUFPLEFBRTdEOztBQUNBO2NBQUEsQUFBTSxXQUFOLEFBQWlCLEFBQ2xCO0FBSkQsU0FBQSxBQUtDLE1BQU0sVUFBQSxBQUFDLEtBQU0sQUFDWjtnQkFBQSxBQUFRLE1BQVIsQUFBYyxBQUNmO0FBUEQsQUFTRDtBQUVEOztBQUNBOzs7OztxQyxBQUNpQixTQUFRLEFBQ3ZCO1VBQU0sUUFBTixBQUFZLEFBRVo7O0FBQ0E7Y0FBQSxBQUFRLGlCQUFSLEFBQXlCLFVBQVMsVUFBQSxBQUFTLEdBQUUsQUFDM0M7Y0FBQSxBQUFNLFdBQVcsRUFBQSxBQUFFLE9BQW5CLEFBQTBCLEFBQzNCO0FBRkQsQUFJQTs7QUFDQTtjQUFBLEFBQVEsaUJBQVIsQUFBeUIsY0FBYSxVQUFBLEFBQVMsR0FBRSxBQUMvQztZQUFNLGVBQWEsU0FBQSxBQUFTLHVCQUFULEFBQWdDLGVBQW5ELEFBQW1CLEFBQStDLEFBQ2xFO3FCQUFBLEFBQWEsTUFBYixBQUFtQixhQUFuQixBQUE4QixBQUMvQjtBQUhELEFBSUE7Y0FBQSxBQUFRLGlCQUFSLEFBQXlCLGNBQWEsVUFBQSxBQUFTLEdBQUUsQUFDL0M7WUFBTSxlQUFhLFNBQUEsQUFBUyx1QkFBVCxBQUFnQyxlQUFuRCxBQUFtQixBQUErQyxBQUNsRTtxQkFBQSxBQUFhLE1BQWIsQUFBbUIsYUFBbkIsQUFBOEIsQUFDL0I7QUFIRCxBQUlEO0FBR0Q7O0FBQ0E7Ozs7OytCLEFBQ1csTUFBSyxBQUVkOztVQUFNLG9CQUFrQixTQUFBLEFBQVMsZUFBakMsQUFBd0IsQUFBd0IsQUFDaEQ7VUFBTSwwQkFBd0IsU0FBQSxBQUFTLGVBQXZDLEFBQThCLEFBQXdCLEFBQ3REO1VBQU0sNkJBQTJCLFNBQUEsQUFBUyxlQUExQyxBQUFpQyxBQUF3QixBQUN6RDt3QkFBQSxBQUFrQixZQUFVLFNBQU8sS0FBQSxBQUFLLFFBQXhDLEFBQWdELEFBQ2hEOzhCQUFBLEFBQXdCLFlBQVUsVUFBUSxLQUFBLEFBQUssUUFBYixBQUFxQixTQUFyQixBQUE0QixNQUFJLEtBQUEsQUFBSyxRQUFyQyxBQUE2QyxhQUE3QyxBQUF3RCxRQUFNLEtBQUEsQUFBSyxRQUFyRyxBQUFnRyxBQUFhLEFBQzdHO2lDQUFBLEFBQTJCLFlBQVUsS0FBckMsQUFBMEMsQUFFMUM7O1dBQUEsQUFBSyxlQUFMLEFBQW9CLEFBQ3BCO1dBQUEsQUFBSyxlQUFMLEFBQW9CLEFBQ3BCO1dBQUEsQUFBSyxlQUFMLEFBQW9CLEFBRXJCOzs7Ozs7O0FBS0gsSUFBQSxBQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGxvYWRGaWxlKGZpbGUsdHlwZT1cImpzb25cIil7XG5cbiAgLy8gSSBkZWNpZGUgdG8gdHJhbnNmb3JtIHRoZSBwYXJhbWV0ZXJzIHRvIHVzZSB0aGVtIHRvIGNvbnN0cnVjdCB0aGUgZmlsZW5hbWUuXG4gIC8vIFNvIGlmIHlvdSBoYXZlIHRoZSBYTUwgdmFsdWUgaW4gdHlwZSwgeW91IHdpbGwgZ2V0ICd4bWwnIHdoaWNoIGNhbiBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIGZpbGVuYW1lLlxuICB0eXBlPXR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAvLyBDcmVhdGlvbiBvZiB0aGUgZW5kIGZpbGVuYW1lLlxuICBmaWxlPWZpbGUrXCIuXCIrdHlwZTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB3aGljaCBJIHRoaW5rIGl0J3MgYSBnb29kIGltcHJvdmVtZW50IGFuZCBwcm92aWRlcyBhIGNsZWFyZXIgY29kZS5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcblxuICAgIC8vIFRoaXMgaXMgdGhlIHR5cGljYWwgWE1MSHR0cFJlcXVlc3QgdXNlZCBpbiBKUyB0byBsb2FkIGZpbGVzLlxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEdFVCBjYW4gYmUgc2V0IGFzIGEgbWV0aG9kIHBhcmFtIGZvciBhIGJldHRlciBtYWludGVuYWJpbGl0eSwgYnV0IGZvciB0aGlzIGNhc2UsIEkgZGVjaWRlIHRvIHB1dCBpdCBkaXJlY3RseSBhcyBhIHN0cmluZy5cbiAgICAvLyBUaGUgZmlsZSBwYXJhbSBpcyB0aGUgZmlsZW5hbWUgdGhhdCB3ZSBjcmVhdGUgYmVmb3JlLlxuICAgIHJlcXVlc3Qub3BlbignR0VUJywgZmlsZSwgdHJ1ZSk7XG5cbiAgICAvLyBPbmNlIHRoZSBmaWxlIGlzIGxvYWRlZCB3ZSBleGVjdXRlIHRoZSBmb2xsb3dpbmdcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBJZiBldmVyeXRoaW5nIGdvZXMgd2VsbCB3ZSByZXR1cm4gYm90aCB0aGUgcmVxdWVzdCBhbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgLy8gSSBkZWNpZGUgdG8gcmV0dXJuIGJhY2sgYXMgYSAyIHByb3BlcnRpZXMgaW5zdGVhZCBvZiBvbmUgZm9yIGEgYmV0dGVyIHJlYWRpYmlsaXR5IG9mIHRoZSBjb2RlIGluIHRoZSBtYWluIGNsYXNzLlxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICByZXF1ZXN0OnJlcXVlc3QsXG4gICAgICAgICAgcmVzcG9uc2U6cmVxdWVzdC5yZXNwb25zZVxuICAgICAgICB9KTtcblxuICAgICAgLy8gSWYgc29tZXRoaW5nIGdvZXMgd3Jvbmcgd2UgcmV0dXJuIHRoZSBlcnJvci5cbiAgICAgIC8vIEl0IGNhbiBiZSBtYW5hZ2VkIGluIHRoZSBtYWluIGNsYXNzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBGaW5hbGx5IHdlIHNlbmQgdGhlIHJlcXVlc3QuXG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gIH0pXG5cbn1cblxuLy8gSSB1c2UgdGhlIG1vZHVsZS5leHBvcnRzIHN5bnRheCwgYnV0IHlvdSBjYW4gdXNlIHRoZSBleHBvcnQgbm90YXRpb24gaW5zdGVhZC5cbm1vZHVsZS5leHBvcnRzPXtcbiAgbG9hZEZpbGU6bG9hZEZpbGVcbn1cbiIsIi8vIEhlcmUgd2UgaW1wb3J0IHRoZSBtb2R1bGUgdG8gbG9hZCB0aGUgcmVzcG9uc2UsIEkgZGVjaWRlZCB0byBjcmVhdGUgYSBzZXBhcmF0ZSBmaWxlIHRvIG1hbnRhaW4gdGhlIGNvZGUgY2xlYW5cbmltcG9ydCAqIGFzIFJlc3BvbnNlTW9kdWxlIGZyb20gJy4vbG9hZF9yZXNwb25zZSc7XG5cbi8vIEFzIHlvdSBjYW4gc2VlLCBJJ20gdXNpbmcgdGhlIG5ldyBFUzYgZmVhdHVyZXMsIHdoaWNoIEkgY29uc2lkZXIgYSBnb29kIGltcHJvdmVtZW50IGZvciBKUy5cbi8vIFRoaXMgY29kZSBpcyBjb21waWxlZCBhZnRlciB0byBFUzUgdGhyb3VnaCB0aGUgZ3VscCBmaWxlLlxuXG4vLyBIZXJlIGlzIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBhcHBsaWNhdGlvblxuY2xhc3MgQWR2ZXJ0aXNlckxpc3RDbGFzc3tcblxuICAvLyBUaGUgY29uc3RydWN0b3Igc2V0cyBwcmVkZWZpbmVkIHZhbHVlcyBmb3IgdGhlIHZhcnMuXG4gIC8vICdzZWxlY3RvcicgcmVmZXJlbmNlcyBhdCB0aGUgc2VsZWN0IGVsZW1lbnQuIEkgZGVjaWRlZCB0byBhZGQgdGhlIGZ1bmN0aW9uYWxpdHkgaW4gdGhpcyBjbGFzcyBpbnN0ZWFkIG9mIGNyZWF0ZSB0aGVpciBvd24gY2xhc3Mgb25seSBmb3IgcmVhZGliaWxpdHkgZW5kLlxuICAvLyAnZmlsZW5hbWUnIGlzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIHRoYXQgd2UnbGwgYWNjZXNzIGxhdGVyLlxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcj0nc2VsZWN0X3R5cGUnLGZpbGVuYW1lPScuL2RhdGEvcmVzcG9uc2UnKXtcblxuICAgIC8vIEhlcmUgd2Ugc2V0IHRoZSBlbGVtZW50IG9mIHRoZSBET00gdG8gdGhlIGVsZW1lbnQgdmFyaWFibGUuXG4gICAgdGhpcy5zZWxlY3Rvcj1kb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShzZWxlY3RvcilbMF07XG5cbiAgICAvLyBTZXQgdGhlIGZpbGVuYW1lXG4gICAgdGhpcy5maWxlbmFtZT1maWxlbmFtZTtcblxuICAgIC8vIFdlIGV4ZWN1dGUgdGhlIG1ldGhvZCB0aGF0IGxvYWRzIGRhdGEgaW4gZmlyc3QgcGxhY2UsIHNvIGRhdGEgaXMgZGlzcGxheWVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFwcC5cbiAgICB0aGlzLmNoYW5nZURhdGEoKTtcblxuICAgIC8vIFdlIGFkZCB0aGUgZXZlbnRzIGZvciB0aGUgc2VsZWN0IGVsZW1lbnQuXG4gICAgdGhpcy5fc2V0U2VsZWN0RXZlbnRzKHRoaXMuc2VsZWN0b3IpO1xuXG4gIH1cblxuICAvLyBDaGFuZ2UgZGF0YSBjYWxscyB0aGUgbG9hZEZpbGUgbWV0aG9kIG9mIHRoZSBSZXNwb25zZU1vZHVsZS5cbiAgLy8gSXQncyBzZXQgdGhlIGRlZmF1bHQgZmlsZV90eXBlIHRvIGpzb24sIGJ1dCBpdCdsbCBjaGFuZ2UgYWNjb3JkaW5nbHkgdG8gdGhlIHNlbGVjdCBlbGVtZW50XG4gIGNoYW5nZURhdGEoZmlsZV90eXBlPSdqc29uJyl7XG5cbiAgICAvLyBJIHRoaW5rIHRoYXQgaXMgYSBnb29kIHByYWN0aWNlIGNyZWF0ZSBhIHZhciByZWZlcmVuY2luZyB0aGUgdGhpcyBvYmplY3QgaW4gYSBjbGFzcywgc28geW91IGF2b2lkICd0aGlzJyByZWZlcmVuY2VzIHByb2JsZW1zIGxhdGVyLlxuICAgIGNvbnN0IF9zZWxmPXRoaXM7XG5cbiAgICAvLyBXYWl0IGZvciB0aGUgbG9hZEZpbGUgZnVuY3Rpb24gdG8gZmluaXNoIChJIHVzZSBhIHByb21pc2UgZm9yIHRoaXMgcHVycG9zZSkgYnV0IHlvdSBjYW4gdXNlIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBjYW4gYmUgZXhlY3V0ZWQgaW5zaWRlIGl0LlxuICAgIFJlc3BvbnNlTW9kdWxlLmxvYWRGaWxlKF9zZWxmLmZpbGVuYW1lLGZpbGVfdHlwZSkudGhlbigoZGF0YSk9PntcblxuICAgICAgLy8gSWYgZXZlcnl0aGluZyBnb2VzIHJpZ2h0IHdlIGNhbGwgdGhlIHByaW50RGF0YSBtZXRob2QgdGhhdCB1cGRhdGVzIHRoZSBjb2RlLlxuICAgICAgX3NlbGYuX3ByaW50RGF0YShkYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKT0+e1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvLyBXZSBzZXQgYWxsIHRoZSBldmVudHMgb2YgdGhlIHNlbGVjdCBpbiBhIHNlcGFyYXRlIG1ldGhvZC5cbiAgLy8gWW91IGNhbiBwYXNzIGFueSBET00gZWxlbWVudCB0aHJvdWdoIHRoZSBwYXJhbWV0ZXJzLCBpbiB0aGlzIGNhc2Ugd2Ugb25seSBjYWxsIGl0IG9uY2UgZm9yIHRoZSBzZWxlY3QgZWxlbWVudC5cbiAgX3NldFNlbGVjdEV2ZW50cyhlbGVtZW50KXtcbiAgICBjb25zdCBfc2VsZj10aGlzO1xuXG4gICAgLy8gQ2hhbmdlIGNhbGxzIHRoZSBjaGFuZ2VEYXRhIG1ldGhvZCB3aXRoIHRoZSB2YWx1ZSBzZWxlY3RlZC5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIixmdW5jdGlvbihlKXtcbiAgICAgIF9zZWxmLmNoYW5nZURhdGEoZS50YXJnZXQudmFsdWUpO1xuICAgIH0pXG5cbiAgICAvLyBUaGlzIHR3byBldmVudHMgbWFuYWdlIHRoZSB0b29sdGlwIGRpc3BsYXkuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLGZ1bmN0aW9uKGUpe1xuICAgICAgY29uc3QgdG9vbHRpcF9lbGVtPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b29sdGlwdGV4dFwiKVswXTtcbiAgICAgIHRvb2x0aXBfZWxlbS5zdHlsZS52aXNpYmlsaXR5PSd2aXNpYmxlJztcbiAgICB9KTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oZSl7XG4gICAgICBjb25zdCB0b29sdGlwX2VsZW09ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvb2x0aXB0ZXh0XCIpWzBdO1xuICAgICAgdG9vbHRpcF9lbGVtLnN0eWxlLnZpc2liaWxpdHk9J2hpZGRlbic7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIHByaW50RGF0YSBiYXNpY2FsbHkgcmVjZWl2ZXMgdGhlIGRhdGEgZnJvbSBSZXNwb25zZU1vZHVsZS5sb2FkRmlsZSBhbmQgdXBkYXRlcyB0aGVcbiAgLy8gY29ycmVzcG9uZGluZyBET00gZWxlbWVudHMgdGhhdCBkaXNwbGF5cyB0aGUgaW5mb3JtYXRpb24gYXMgYSBjb2RlLlxuICBfcHJpbnREYXRhKGRhdGEpe1xuXG4gICAgY29uc3QgaGlnaGxpZ2h0X3JlcXVlc3Q9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcXVlc3QnKTtcbiAgICBjb25zdCBoaWdobGlnaHRfcmVzcG9uc2VfdHlwZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzcG9uc2VfdHlwZScpO1xuICAgIGNvbnN0IGhpZ2hsaWdodF9yZXNwb25zZV9jb250ZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNwb25zZV9jb250ZW50Jyk7XG4gICAgaGlnaGxpZ2h0X3JlcXVlc3QuaW5uZXJUZXh0PVwiR0VUIFwiK2RhdGEucmVxdWVzdC5yZXNwb25zZVVSTDtcbiAgICBoaWdobGlnaHRfcmVzcG9uc2VfdHlwZS5pbm5lclRleHQ9XCJIVFRQIFwiK2RhdGEucmVxdWVzdC5zdGF0dXMrXCIgXCIrZGF0YS5yZXF1ZXN0LnN0YXR1c1RleHQrXCIgXFxuXCIrZGF0YS5yZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgIGhpZ2hsaWdodF9yZXNwb25zZV9jb250ZW50LmlubmVyVGV4dD1kYXRhLnJlc3BvbnNlO1xuXG4gICAgaGxqcy5oaWdobGlnaHRCbG9jayhoaWdobGlnaHRfcmVxdWVzdCk7XG4gICAgaGxqcy5oaWdobGlnaHRCbG9jayhoaWdobGlnaHRfcmVzcG9uc2VfdHlwZSk7XG4gICAgaGxqcy5oaWdobGlnaHRCbG9jayhoaWdobGlnaHRfcmVzcG9uc2VfY29udGVudCk7XG5cbiAgfVxuXG59XG5cblxubmV3IEFkdmVydGlzZXJMaXN0Q2xhc3MoKTtcbiJdfQ==
