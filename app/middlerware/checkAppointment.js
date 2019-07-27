const moment = require('moment');
const model = require('../model');

module.exports = async (ctx, next) => {
  const { orderTime } = ctx.request.body;
  if (!moment(orderTime).isValid()) {
    ctx.status = 400;
    ctx.body = {
      success: 'false',
      msg: '预约的时间格式不正确',
    };
    return;
  }
  const orderUtcOffset8Time = moment(orderTime).utcOffset(8);
  const nextDay = moment()
    .utcOffset(8)
    .add(1, 'day');
  const next7day = moment()
    .utcOffset(8)
    .add(6, 'day');
  const isValidTime = !!(
    orderUtcOffset8Time.hours() >= 9 && orderUtcOffset8Time.hours() <= 15
  );
  const isBetween = orderUtcOffset8Time.isBetween(nextDay, next7day);
  if (!(isBetween && isValidTime)) {
    ctx.status = 400;
    ctx.body = {
      success: 'false',
      error: '只能预约未来七天内，并且时间在09到15点之间',
      code: 400,
    };
    return;
  }
  const orderTimeFormat = orderUtcOffset8Time.format('YYYYMMDDHH');
  const getAllAppoints = await model.appointment.find({
    appoint_time_format: orderTimeFormat,
    has_ordered: true,
  });
  if (getAllAppoints.length >= 6) {
    ctx.status = 400;
    ctx.body = { success: 'false', msg: '该时间段已经预约满了' };
    return;
  }
  const { id: appointmentId } = await model.appointment.findOneAndUpdate(
    {
      appoint_time_format: orderTimeFormat,
      has_ordered: false,
    },
    {
      appoint_time_format: orderTimeFormat,
    },
    {
      upsert: true,
      new: true,
    },
  );
  ctx.orderTime = orderTimeFormat;
  ctx.appointmentId = appointmentId;
  await await next();
};
