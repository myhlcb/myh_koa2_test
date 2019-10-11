const Koa = require('koa');

const app = new Koa();
const json = require('koa-json');
const debug = require('debug');
const bodyparser = require('koa-bodyparser');
const { error, swaggerUIRoutes } = require('./app/middlerware');

const koaRouters = require('./app/routes');

const doDebug = debug('app');

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(error);
app.use(swaggerUIRoutes({ file: './swagger.yaml' }));
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  doDebug(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(koaRouters());
// error-handling
app.on('error', (err, ctx) => {
  doDebug('server error', err, ctx);
});
if (!module.parent) {
  app.listen(3000, () => {
    doDebug('koa2 start');
  });
}

module.exports = app;
