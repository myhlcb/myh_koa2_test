const mongoose = require('mongoose');

const db = require('../connector');

const { Schema } = mongoose;
const ServiceSchema = new Schema(
  {
    order_name: { type: String, index: true }, // 预约人姓名
    order_id: { type: String, unique: true, index: true }, // 预约订单编号
    order_phone: Number, // 预约人联系方式
    order_time: String, // 预约具体时间段
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
module.exports = db.model('Service', ServiceSchema, 'services');
