const Moment = require('moment');
const momentRange = require('moment-range');
const _ = require('lodash');

const moment = momentRange.extendMoment(Moment);

const array = ['09', '10', '11', '12', '13', '14', '15'];
const getMomentRange = () => {
  const now = Moment();
  // 从第二天(明天开始)
  const momentNow = now
    .clone()
    .add(1, 'day')
    .utcOffset(8)
    .format('YYYYMMDD');
  // 到第七天结束
  const momentNext = now
    .clone()
    .add(6, 'day')
    .utcOffset(8)
    .format('YYYYMMDD');
  const momentArray = Array.from(moment.range(momentNow, momentNext).by('day'));
  return _.flattenDeep(
    momentArray.map((momentItem) => {
      const format = `${momentItem.format('YYYYMMDD')}`;
      return _.map(array, (hour) => ({ _id: `${format}${hour}`, count: 6 }));
    }),
  );
};
module.exports = getMomentRange;
