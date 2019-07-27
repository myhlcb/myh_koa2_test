import test from 'ava';

const moment = require('moment');

const request = require('supertest');
const cleanDb = require('./appointment');
const app = require('../app');

test.beforeEach(async () => {
  await cleanDb();
});

test('get appointments', async (t) => {
  const {
    body: { success, data },
  } = await request(app.listen()).get('/appointments');
  t.true(success);
  t.is(data.length, 42);
});
test('post appointment', async (t) => {
  const time = moment()
    .utcOffset(8)
    .add(1, 'day')
    .startOf('day')
    .add(10, 'hour');
  const {
    body: { success, data },
  } = await request(app.listen())
    .post('/appointment')
    .send({
      orderTime: time,
      orderName: '特朗普',
      orderPhone: 13800000000,
    });
  const { order_name: orderName, order_phone: orderPhone } = data;
  t.true(success);
  t.is(orderName, '特朗普');
  t.is(orderPhone, 13800000000);
});
