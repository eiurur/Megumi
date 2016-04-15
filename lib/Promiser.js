'use strict';

const Promise = require('bluebird');

module.exports = class Promiser {
  static promiseWhile(condition, action) {
    const resolver = Promise.defer();
    const loop_ = () => {
      if (!condition()) {
        return resolver.resolve();
      }
      return Promise.cast(action()).then(loop_).catch(resolver.reject);
    };

    process.nextTick(loop_);
    return resolver.promise;
  }

  static delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
};
