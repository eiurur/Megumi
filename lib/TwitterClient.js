'use strict';

const _              = require('lodash');
const Promiser       = require('./Promiser');
const TimeUtil       = require('./TimeUtil');
const TwitterRESTAPI = require('./TwitterRESTAPI');
const TwitterUtil    = require('./TwitterUtil');

const TWEET_COUNT = 200;
const USER_TIMELINE_REQUEST_INTERVAL = 6 * 1000;
// const USER_TIMELINE_REQUEST_INTERVAL = 60 * 1000;

module.exports = class TwitterClient extends TwitterRESTAPI {
  constructor(params) {
    super(params);
    this.max_id = null;
    this.range = null;
    this.tweetList = [];
  }

  getTweetList() {
    return this.tweetList;
  }

  setMaxId(max_id) {
    this.max_id = max_id;
  }

  setRange(range) {
    let _range = _.isNumber(range) ? range : 0;
    switch (range) {
      case 'today':
        _range = 0;
        break;
      case 'yesterday':
        _range = -1;
        break;
      case 'last_week':
        _range = -7;
        break;
      case 'last_month':
        _range = -30;
        break;
      case 'all':
        _range = -365 * 10;
        break;
      default: // is all
        _range = -365 * 10;
        break;
    }
    this.range = _range;
  }

  /**
   * [getUserTimeline description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getUserTimeline(params) {
    return new Promise( (resolve, reject) => {
      const opts = {
        count: TWEET_COUNT,
        include_entities: true,
        include_rts: false,
        max_id: params.max_id,
      };
      if (params.user_id) opts.user_id = params.user_id;
      if (params.screen_name) opts.screen_name = params.screen_name;
      this.get('statuses/user_timeline', opts)
      .then( tweets => resolve(tweets) )
      .catch( err => reject(err) );
    });
  }

  /**
   * [getTwitterProfile description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getTwitterProfile(params) {
    return new Promise( (resolve, reject) => {
      const opts = {};
      if (params.user_id) opts.user_id = params.user_id;
      if (params.screen_name) opts.screen_name = params.screen_name;
      this.get('users/show', opts)
      .then( user => resolve(user) )
      .catch( err => reject(err) );
    });
  }

  /**
   * [aggregate description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  aggregate(params) {
    this.isContinue = true;
    this.tweetList = [];
    this.setRange(params.range);

    return Promiser.promiseWhile((() => {
      return this.isContinue;
    }), () => {
      return new Promise( (resolve, reject) => {
        const opts = Object.assign({
          max_id: this.max_id,
        }, params);

        Promiser.delay(USER_TIMELINE_REQUEST_INTERVAL)
        .then( _ => this.getUserTimeline(opts) )
        .then( tweets => {

          // 全部読み終えた
          if ((tweets.length < 2)) {
            this.isContinue = false;
            return resolve();
          }

          // API制限をくらったら or ユーザが消えた
          if (_.isUndefined(tweets) || TwitterUtil.isDeletedUser(tweets)) {
            this.isContinue = false;
            return reject();
          }

          this.setMaxId(TwitterUtil.decreaseTweetIdStr(tweets[tweets.length - 1].id_str));

          // 画像ツイートだけ抽出
          const tweetsIncludeImage = TwitterUtil.filterImageTweet(tweets);
          // console.log('========> ');
          // console.log(tweetsIncludeImage);

          if (_.isEmpty(tweetsIncludeImage)) {
            this.isContinue = false;
            return resolve();
          }

          // プロパティの拡張
          tweetsIncludeImage.forEach( tweet => {
            tweet.sum_count = tweet.retweet_count + tweet.favorite_count;
            tweet.extended_entities.media_orig = tweet.extended_entities.media.map( media => `${media.media_url_https}:orig` );
          });

          // 指定した時刻以前のツイートが含まれているなら要素を結合して抜ける。
          if (this.includeTweetOutOfRange(tweetsIncludeImage)) {
            const tweetsWithinRange = tweetsIncludeImage.filter( tweet => !this.isPastTweetRatherThanTargetRange(tweet) );
            this.tweetList = this.tweetList.concat(tweetsWithinRange);
            this.isContinue = false;
            return resolve();
          }

          this.tweetList = this.tweetList.concat(tweetsIncludeImage);
          return resolve();
        })
        .catch( err => reject(err) );
      });
    });
  }

  /**
   * [fetchMaxId description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  fetchMaxId(params) {
    return new Promise( (resolve, reject) => {
      this.getTwitterProfile(params)
      .then( user => {
        this.setMaxId(user.status.id_str);
        return resolve(user.status.id_str);
      }) // 罠っぽい？
      .catch( err => reject(err) );
    });
  }

  /**
   * [isPastTweetRatherThanTargetRange description]
   * @param  {[type]}  tweet [description]
   * @return {Boolean}       [description]
   */
  isPastTweetRatherThanTargetRange(tweet) {
    return (TimeUtil.compare(TimeUtil.getFutureTimeYYYYMMDD(new Date(tweet.created_at)), TimeUtil.getFutureTimeYYYYMMDD(null, this.range, 'days')) < 0);
  }

  /**
   * [includeTweetOutOfRange description]
   * @param  {[type]} tweets [description]
   * @return {[type]}        [description]
   */
  includeTweetOutOfRange(tweets) {
    return tweets.some( tweet => this.isPastTweetRatherThanTargetRange(tweet) );
  }
};
