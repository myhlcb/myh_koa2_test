const schedule = require('node-schedule');
const Moment = require('moment');
const momentRange = require('moment-range');
const Promise = require('bluebird');
const _ = require('lodash');

const moment = momentRange.extendMoment(Moment);
const appointment = require('../model/appointment');

const array = ['09', '10', '11', '12', '13', '14', '15'];
const getRange = () => {
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
      return _.map(array, (hour) => `${format}${hour}`);
    }),
  );
};
const createAppoints = () => {
  const fluttenRange = getRange();
  return Promise.map(fluttenRange, (format) =>
    appointment.findOneAndUpdate(
      { appoint_time_format: format },
      { appoint_time_format: format },
      {
        upsert: true,
      },
    ),
  );
};
schedule.scheduleJob('0 * * *', () => {
  createAppoints();
});
module.exports = {
  createAppoints,
  getRange,
};
