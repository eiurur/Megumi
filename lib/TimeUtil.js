'use strict';

const moment = require('moment');

module.exports = class TimeUtil {
  /**
   * [getFutureTimeYYYYMMDD description]
   * @param  {[type]} time   [description]
   * @param  {[type]} amount [description]
   * @param  {[type]} term   [description]
   * @return {[type]}        [description]
   */
  static getFutureTimeYYYYMMDD(time, amount, term) {
    const _time = time || moment();
    const _amount = amount || 0;
    switch (term) {
      case 'days':
        return  moment(_time).add(_amount, 'days').format('YYYY-MM-DD');
      case 'weeks':
        return  moment(_time).add(_amount, 'weeks').format('YYYY-MM-DD');
      case 'months':
        return  moment(_time).add(_amount, 'months').format('YYYY-MM-DD');
      default:
        return moment(_time).format('YYYY-MM-DD');
    }
  }

  /**
   *
   * @param  {[type]} time1 [description]
   * @param  {[type]} time2 [description]
   * @return {[type]}       [description]
   */
  static compare(time1, time2) {
    // console.log('=>>>>>>>>>>>>>>>>> compare');
    // console.log(time1, time2);
    // console.log(moment(time1).format('x'));
    // console.log(moment(time2).format('x'));
    // console.log(`${time1} - ${time2} = `, moment(time1).format('x') - moment(time2).format('x'));
    return (moment(time1).format('x') - moment(time2).format('x'));
  }
};
