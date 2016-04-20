'use strict';

const TwitterRESTAPI = require('./TwitterRESTAPI');
const TWEET_COUNT    = 200;

module.exports = class TwitterClient extends TwitterRESTAPI {
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
};
