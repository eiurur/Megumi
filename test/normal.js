'use strict';

const _            = require('lodash');
const assert       = require('power-assert');
const Megumi       = require('../');

describe('Megumi Normal', () => {

  before( done => {
    const twitterKeys = process.env.TRAVIS ? process.env : require('../twitter.json');
    this.megumi = new Megumi(twitterKeys);
    done();
  });

  it('should return tweets when pass today', (done) => {
    const opts = {
      screen_name: 'shiratamacaron',
      sort: 'favorite',
      range: 'today',
      num: 12,
    };

    this.megumi.retrieve(opts).then( tweets => {
      assert(_.isArray(tweets));
      assert(tweets.length <= 12);
      done();
    });
  });

  it('should return tweets when pass yesterday', (done) => {
    const opts = {
      screen_name: 'shiratamacaron',
      sort: 'sum',
      range: 'yesterday',
      num: 12,
    };

    this.megumi.retrieve(opts).then( tweets => {
      assert(_.isArray(tweets));
      assert(tweets.length <= 12);
      done();
    });
  });

  it('should return tweets when pass last_week', (done) => {
    const opts = {
      screen_name: 'shiratamacaron',
      sort: 'retweet',
      range: 'last_week',
      num: 12,
    };

    this.megumi.retrieve(opts).then( tweets => {
      assert(_.isArray(tweets));
      assert(tweets.length <= 12);
      done();
    });
  });

  it('should return tweets when pass last_month', (done) => {
    const opts = {
      screen_name: 'shiratamacaron',
      sort: 'sum',
      range: 'last_month',
      num: 12,
    };

    this.megumi.retrieve(opts).then( tweets => {
      assert(_.isArray(tweets));
      assert(tweets.length <= 12);
      done();
    });
  });

  it('should return tweets when dont pass range paramater', (done) => {
    const opts = {
      screen_name: 'shiratamacaron',
      sort: 'sum',
      num: 12,
    };

    this.megumi.retrieve(opts).then( tweets => {
      assert(_.isArray(tweets));
      assert(tweets.length <= 12);
      console.log(tweets[0]);
      console.log(tweets[1]);
      done();
    });
  });
});
