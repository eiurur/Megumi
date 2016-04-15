Megumi
======

[![Build Status](https://travis-ci.org/eiurur/Megumi.svg?branch=master)](https://travis-ci.org/eiurur/Megumi)
[![bitHound Overall Score](https://www.bithound.io/github/eiurur/Megumi/badges/score.svg)](https://www.bithound.io/github/eiurur/Megumi)
[![bitHound Dependencies](https://www.bithound.io/github/eiurur/Megumi/badges/dependencies.svg)](https://www.bithound.io/github/eiurur/Megumi/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/eiurur/Megumi/badges/devDependencies.svg)](https://www.bithound.io/github/eiurur/Megumi/master/dependencies/npm)


![Mwgumi](http://49.media.tumblr.com/a66096a9f30db85c28292931e4860c4e/tumblr_nfagc7sUIv1tlyjpto1_500.gif)

> <a href="http://hheiyu.tumblr.com/post/103040653078" target="_blank">I have a thing for ohohojousama</a>

# Usage

```JavaScript

const Megumi = require('megumi');
const twitter_keys = require('./twitter.json');

console.log(twitter_keys);
/** =>
{
  "consumer_key":         "...",
  "consumer_secret":      "...",
  "access_token":         "...",
  "access_token_secret":  "..."
}
 */

const megumi = new Megumi(twitter_keys);

const opts = {
  screen_name: 'shiratamacaron',
  sort: 'sum',
  range: 'last_month',
  num: 12,
};

megumi.retrieve(opts).then( tweet_list_of_only_the_image => {

  console.log(tweet_list_of_only_the_image.length);
  //=> 12

  console.log(tweet_list_of_only_the_image[0]);
  /** =>
  { created_at: 'Wed Mar 16 11:54:21 +0000 2016',
    id: 710071702722490400,
    id_str: '710071702722490368',
    text: '初描きにこちゃん　そのうち塗りたい…！ https://t.co/9A7yIAqe1Y',
    entities:
     { hashtags: [],
       symbols: [],
       user_mentions: [],
       urls: [],
       media: [ [Object] ] },
    extended_entities: { media: [ [Object] ] },
    :
    :
   */

  console.log(tweet_list_of_only_the_image[1]);
  /** =>
  { created_at: 'Sun Mar 20 15:56:56 +0000 2016',
  id: 711582301956603900,
  id_str: '711582301956603904',
  text: '久々のアナログ にっこり…！(^o^) https://t.co/v6m10vFDYR',
  entities:
   { hashtags: [],
     symbols: [],
     user_mentions: [],
     urls: [],
     media: [ [Object] ] },
  extended_entities: { media: [ [Object] ] },
  :
  :
  */

});


```

# Parameter

### sort

- `favorite`
- `retweet`
- `sum`(favorite + retweet)

default is `sum`

### range

- `all`
- `0`
-- or `today`
- `-1`
-- or `yesterday`
- `-7`
-- or `last_week`
- `-30`
-- or `last_month`
- and more(`0` - `-3650`)

default is `all`

### num

- `0` - `3200`

default is `12`