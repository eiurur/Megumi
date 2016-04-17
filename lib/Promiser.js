'use strict';

const Promise = require('bluebird');

module.exports = class Promiser {
  static promiseWhile(condition, action) {
    return new Promise( (resolve, reject) => {
      const loop_ = () => {
        if (!condition()) {
          return resolve();
        }
        return Promise.cast(action()).then(loop_).catch(reject);
      };

      process.nextTick(loop_);
    });
  }

  static delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
};
