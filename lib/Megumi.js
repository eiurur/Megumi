'use strict';

const _                     = require('lodash');
const PopularTweetRetriever = require('./PopularTweetRetriever');

module.exports = class Megumi {
  constructor(params) {
    this.popularTweetRetriever = new PopularTweetRetriever(params);
  }

  retrieve(params) {
    return new Promise( (resolve, reject) => {
      this.popularTweetRetriever.fetchMaxId(params)
      .then( v => this.popularTweetRetriever.aggregate(params) )
      .then( v => this.popularTweetRetriever.getTweetList() )
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
