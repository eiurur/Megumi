'use strict';

const _ = require('lodash');

module.exports = class TwitterUtil {
  /**
   * [isDeletedUser description]
   * @param  {[type]}  tweets [description]
   * @return {Boolean}        [description]
   */
  static isDeletedUser(tweets) {
    return _.isNull(tweets[tweets.length - 1]) || _.isUndefined(tweets[tweets.length - 1]);
  }

  /**
   * tweetにmediaが含まれているかのBoolean値を返す関数
   * @param  {Object}  tweet [description]
   * @return {Boolean}       [description]
   */
  static hasMedia(tweet) {
    return _.has(tweet, 'extended_entities') && !_.isEmpty(tweet.extended_entities.media);
  }

  /**
   * [filterImageTweet description]
   * @return {[type]} [description]
   */
  static filterImageTweet(tweetList) {
    return tweetList.filter( tweet => this.hasMedia(tweet) );
  }

  /**
   * [decreaseTweetIdStr description]
   * @param  {[type]} tweet_id_str [description]
   * @return {[type]} result  [description]
   */
  static decreaseTweetIdStr(tweet_id_str) {
    let result = tweet_id_str.toString();
    let i = tweet_id_str.length - 1;
    while (i > -1) {
      if (tweet_id_str[i] !== '0') return result.substring(0, i) + (parseInt(tweet_id_str[i], 10) - 1).toString() + result.substring(i + 1);
      result = result.substring(0, i) + '9' + result.substring(i + 1);
      i -= 1;
    }
    return result;
  }
};
