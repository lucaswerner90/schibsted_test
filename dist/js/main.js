(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function loadResponse(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "json";

  type = type.toLowerCase();
  file = file + "." + type;

  switch (type) {
    case 'json':
      return fetch(file).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return error;
      });

    default:
      var x = new XMLHttpRequest();
      x.open("GET", file, true);
      x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
          return x.responseXML;
        }
      };
      x.send(null);
  }
}

module.exports = {
  loadResponse: loadResponse
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
}();

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

var MainClass = function () {
  function MainClass() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select_type';

    _classCallCheck(this, MainClass);

    //Add the event to the select element;
    var element = document.getElementsByName(selector)[0];
    var _self = this;
    element.addEventListener("change", function (e) {
      _self.changeData(e.target.value);
    });
  }

  _createClass(MainClass, [{
    key: 'changeData',
    value: function changeData() {
      var file_type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';

      var _self = this;
      ResponseModule.loadResponse('./data/response', file_type).then(function (data) {
        _self._printData(data, file_type);
      });
    }
  }, {
    key: '_printData',
    value: function _printData(data, file_type) {
      console.log(data);
    }
  }]);

  return MainClass;
}();

new MainClass();

},{"./load_response":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbG9hZF9yZXNwb25zZS5qcyIsInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxTQUFBLEFBQVMsYUFBVCxBQUFzQixNQUFpQjtNQUFaLEFBQVksMkVBQVAsQUFBTyxBQUVyQzs7U0FBSyxLQUFMLEFBQUssQUFBSyxBQUNWO1NBQUssT0FBQSxBQUFLLE1BQVYsQUFBYyxBQUVkOztVQUFBLEFBQVEsQUFDTjtTQUFBLEFBQUssQUFDSDttQkFBTyxBQUFNLE1BQU4sQUFDTixLQUFLLFVBQUEsQUFBUyxVQUFVLEFBQ3ZCO2VBQU8sU0FBUCxBQUFPLEFBQVMsQUFDakI7QUFITSxPQUFBLEVBQUEsQUFJTixNQUFNLFVBQUEsQUFBQyxPQUFRLEFBQ2Q7ZUFBQSxBQUFPLEFBQ1I7QUFORCxBQUFPLEFBUVQ7O0FBQ0U7VUFBTSxJQUFJLElBQVYsQUFBVSxBQUFJLEFBQ2Q7UUFBQSxBQUFFLEtBQUYsQUFBTyxPQUFQLEFBQWMsTUFBZCxBQUFvQixBQUNwQjtRQUFBLEFBQUUscUJBQXFCLFlBQVksQUFDakM7WUFBSSxFQUFBLEFBQUUsY0FBRixBQUFnQixLQUFLLEVBQUEsQUFBRSxVQUEzQixBQUFxQyxLQUFJLEFBQ3ZDO2lCQUFPLEVBQVAsQUFBUyxBQUNWO0FBQ0Y7QUFKRCxBQUtBO1FBQUEsQUFBRSxLQWxCTixBQWtCSSxBQUFPLEFBS1o7Ozs7QUFFRCxPQUFBLEFBQU87Z0JBQVAsQUFBZSxBQUNBO0FBREEsQUFDYjs7Ozs7Ozs7Ozs7Ozs7O0FDOUJGOztJLEFBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFTix3QkFFSjt1QkFBbUM7UUFBdkIsQUFBdUIsK0VBQWQsQUFBYzs7MEJBQ2pDOztBQUNBO1FBQU0sVUFBUSxTQUFBLEFBQVMsa0JBQVQsQUFBMkIsVUFBekMsQUFBYyxBQUFxQyxBQUNuRDtRQUFNLFFBQU4sQUFBWSxBQUNaO1lBQUEsQUFBUSxpQkFBUixBQUF5QixVQUFTLFVBQUEsQUFBUyxHQUFFLEFBQzNDO1lBQUEsQUFBTSxXQUFXLEVBQUEsQUFBRSxPQUFuQixBQUEwQixBQUMzQjtBQUZELEFBS0Q7Ozs7O2lDQUUyQjtVQUFqQixBQUFpQixnRkFBUCxBQUFPLEFBQzFCOztVQUFNLFFBQU4sQUFBWSxBQUNaO3FCQUFBLEFBQWUsYUFBZixBQUE0QixtQkFBNUIsQUFBOEMsV0FBOUMsQUFBeUQsS0FBSyxVQUFBLEFBQUMsTUFBTyxBQUNsRTtjQUFBLEFBQU0sV0FBTixBQUFpQixNQUFqQixBQUFzQixBQUN6QjtBQUZELEFBSUQ7Ozs7K0IsQUFFVSxNLEFBQUssV0FBVSxBQUN4QjtjQUFBLEFBQVEsSUFBUixBQUFZLEFBQ2I7Ozs7Ozs7QUFLSCxJQUFBLEFBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gbG9hZFJlc3BvbnNlKGZpbGUsdHlwZT1cImpzb25cIil7XG5cbiAgdHlwZT10eXBlLnRvTG93ZXJDYXNlKCk7XG4gIGZpbGU9ZmlsZStcIi5cIit0eXBlO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2pzb24nOlxuICAgICAgcmV0dXJuIGZldGNoKGZpbGUpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IHggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHgub3BlbihcIkdFVFwiLCBmaWxlLCB0cnVlKTtcbiAgICAgIHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeC5yZWFkeVN0YXRlID09IDQgJiYgeC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICByZXR1cm4geC5yZXNwb25zZVhNTDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHguc2VuZChudWxsKTtcbiAgfVxuXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cz17XG4gIGxvYWRSZXNwb25zZTpsb2FkUmVzcG9uc2Vcbn1cbiIsIlxuaW1wb3J0ICogYXMgUmVzcG9uc2VNb2R1bGUgZnJvbSAnLi9sb2FkX3Jlc3BvbnNlJztcblxuY2xhc3MgTWFpbkNsYXNze1xuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yPSdzZWxlY3RfdHlwZScpe1xuICAgIC8vQWRkIHRoZSBldmVudCB0byB0aGUgc2VsZWN0IGVsZW1lbnQ7XG4gICAgY29uc3QgZWxlbWVudD1kb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShzZWxlY3RvcilbMF07XG4gICAgY29uc3QgX3NlbGY9dGhpcztcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIixmdW5jdGlvbihlKXtcbiAgICAgIF9zZWxmLmNoYW5nZURhdGEoZS50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuXG5cbiAgfVxuXG4gIGNoYW5nZURhdGEoZmlsZV90eXBlPSdqc29uJyl7XG4gICAgY29uc3QgX3NlbGY9dGhpcztcbiAgICBSZXNwb25zZU1vZHVsZS5sb2FkUmVzcG9uc2UoJy4vZGF0YS9yZXNwb25zZScsZmlsZV90eXBlKS50aGVuKChkYXRhKT0+e1xuICAgICAgICBfc2VsZi5fcHJpbnREYXRhKGRhdGEsZmlsZV90eXBlKTtcbiAgICB9KVxuXG4gIH1cblxuICBfcHJpbnREYXRhKGRhdGEsZmlsZV90eXBlKXtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfVxuXG59XG5cblxubmV3IE1haW5DbGFzcygpO1xuIl19
