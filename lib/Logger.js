'use strict';

const util = require('util');

module.exports = class Logger {
  static dump(object) {
    console.log(util.inspect(object, false, null));
  }
};
