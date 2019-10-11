const mongoose = require('mongoose');
const _ = require('lodash');
const db = require('../connector');

const { Schema } = mongoose;
const AppointMentSchema = new Schema(
  {
    appoint_time_format: {
      type: String, // 时间段YYYYMMDDHH
      validate: {
        validator: (v) => /^[\d]{11}/.test(v),
        message: '{VALUE} is not a valid time!',
      },
    },
    has_ordered: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
);
module.exports = db.model('AppointMent', AppointMentSchema, 'appointments');
