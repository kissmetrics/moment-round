(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['moment'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(require('moment'));
    } else {
        // Browser globals
        factory(root.moment);
    }
}(this, function (moment) {

  moment.fn.round = function(precision, key, direction) {
    if(typeof direction === 'undefined') {
      direction = 'round';
    }

    var keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'];
    var maxValues = [24, 60, 60, 1000];

    // Capitalize first letter
    key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

    // make sure key is plural
    if (key.indexOf('s', key.length - 1) === -1) {
      key += 's';
    }
    var value = 0;
    var rounded = false;
    var subRatio = 1;
    var maxValue ;
    for (var i in keys) {
      var k = keys[i];
      if (k === key && typeof this._d['get' + key] === "function") {
        value = this._d['get' + key]();
        maxValue = maxValues[i];
        rounded = true;
      } else if(rounded && typeof this._d['get' + k] === "function") {
        subRatio *= maxValues[i];
        value += this._d['get' + k]() / subRatio;
        this._d['set' + k](0);
      }
    };

    value = Math[direction](value / precision) * precision;
    value = Math.min(value, maxValue);
    this._d['set' + key](value);

    return this;
  }

  moment.fn.ceil = function(precision, key) {
    return this.round(precision, key, 'ceil');
  }

  moment.fn.floor = function(precision, key) {
    return this.round(precision, key, 'floor');
  }
}));
