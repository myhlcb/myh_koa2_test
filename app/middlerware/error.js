const doDebug = require('debug')('middlerware:error');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { msg: err };
    doDebug(err);
    ctx.app.emit('error', err, this);
  }
};
