const moment = require('moment');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const debug = require('debug');
const joi = require('joi');
const getMomentRange = require('../scripts/getMomentRange');
const model = require('../model');

const doDebug = debug('appointments');
const orderService = async (ctx, next) => {
  const { orderTime, appointmentId } = ctx;
  // update appointment
  await model.appointment.findOneAndUpdate(
    { _id: appointmentId, has_ordered: false },
    { has_ordered: true },
  );
  const { orderName, orderPhone } = ctx.request.body;
  const service = await model.service.create({
    order_name: orderName,
    order_id: uuidv4(),
    order_phone: orderPhone,
    order_time: orderTime,
  });
  ctx.body = {
    success: true,
    data: service,
  };
};
const getAppointments = async (ctx, next) => {
  const nextDay = moment()
    .utcOffset(8)
    .add(1, 'day')
    .format('YYYYMMDDHH');
  const next7day = moment()
    .utcOffset(8)
    .add(6, 'day')
    .format('YYYYMMDDHH');
  doDebug(next7day, nextDay, 22);
  const a = await model.appointment.find({
    appoint_time_format: { $gte: nextDay, $lte: next7day },
  });
  const dbAppointments = await model.appointment.aggregate([
    {
      $match: {
        appoint_time_format: { $gte: nextDay, $lte: next7day },
        // has_ordered: true,
      },
    },
    {
      $group: {
        _id: '$appoint_time_format',
        count: { $sum: -1 },
      },
    },
  ]);
  const range = getMomentRange();
  const rangeArray = _.map(range, (item) => {
    const findAppointment = _.find(dbAppointments, (appointment) => {
      return appointment._id === item._id;
    });
    if (findAppointment) {
      item.count += findAppointment.count;
    }
    return item;
  });
  ctx.body = {
    success: true,
    data: rangeArray,
  };
};
const v = {
  orderService: {
    body: {
      orderName: joi.string().required(),
      orderPhone: joi.number().required(),
      orderTime: joi.string().required(),
    },
  },
};
module.exports = {
  orderService,
  getAppointments,
  v,
};
