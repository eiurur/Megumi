'use strict';

const _             = require('lodash');
const TwitterClient = require('./TwitterClient');

module.exports = class Megumi {
  constructor(params) {
    this.twitterClient = new TwitterClient(params);
  }

  retrieve(params) {
    return new Promise( (resolve, reject) => {
      this.twitterClient.fetchMaxId(params)
      .then( v => this.twitterClient.aggregate(params) )
      .then( v => this.twitterClient.getTweetList() )
      .then( tweets => this._pickup(tweets, params.sort, params.num) )
      .then( tweets => resolve(tweets))
      .catch( err => reject(err) );
    });
  }

  _pickup(tweets, sort, num) {
    return _.chain(tweets)
      .sortBy(`${sort}_count`)
      .reverse()
      .take(num)
      .value();
  }
};
