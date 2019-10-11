const Router = require('koa-router');

const router = new Router();
const validate = require('koa2-validation');

const { checkAppointment } = require('./middlerware');
const {
  orderService,
  getAppointments,
  v,
} = require('./controller/appointment');

const koaRouters = () => {
  router.get('/appointments', getAppointments);
  router.post(
    '/appointment',
    validate(v.orderService),
    checkAppointment,
    orderService,
  );

  router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello myh';
  });

  return router.routes();
};

module.exports = koaRouters;
