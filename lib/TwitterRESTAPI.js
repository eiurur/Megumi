'use strict';

const Twit = require('twit');

module.exports = class TwitterRESTAPI {
  constructor(params) {
    this.T = new Twit(params);
  }

  get(path, params) {
    return new Promise( (resolve, reject) => {
      this.T.get(path, params, (err, data, response) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
};
