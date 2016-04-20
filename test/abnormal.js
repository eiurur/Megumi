'use strict';

const _                            = require('lodash');
const assert                       = require('power-assert');
const Megumi                       = require('../');
const TwitterUtil                  = require('../lib/TwitterUtil');
const NON_EXIST_USER_ERROR_MESSAGE = 'Non-exist user';

describe('Megumi Abnormal', () => {
  before( done => {
    const twitterKeys = process.env.TRAVIS ? process.env : require('../twitter.json');
    this.megumi = new Megumi(twitterKeys);
    this.isAllTweetHasImage = tweets => tweets.every(TwitterUtil.hasMedia);
    done();
  });

  it('should return Error when pass non-exist user', (done) => {
    const opts = {
      screen_name: 'Ujimushi_Unko',
      sort: 'favorite',
      range: 'today',
      num: 12,
    };

    this.megumi.retrieve(opts)
    .then( tweets => {
      assert(false);
      done();
    })
    .catch( err => {
      assert(err.message === NON_EXIST_USER_ERROR_MESSAGE);
      done();
    });
  });
});
