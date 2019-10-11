const koaSwaggerUI = require('koa2-swagger-ui');
const Router = require('koa-router');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

/**
 * load swagger file to swagger ui plugin
 *
 * @param {Object} payload - input arguments
 * @param {string} payload.file - local swagger file path
 * @param {boolean} payload.prod - should this swagger ui appear in production env
 */
const swaggerUIRoutes = (payload = {}) => {
  const router = new Router();

  const pl = _.defaultsDeep(payload, {
    routePrefix: '/swagger',
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json',
    },
  });

  if (pl.file) {
    const filePath = path.join(process.cwd(), pl.file);
    Object.defineProperty(pl.swaggerOptions, 'spec', {
      get: () => {
        return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      },
      enumerable: true,
    });
  }
  router.get(pl.routePrefix, koaSwaggerUI(pl));

  return router.routes();
};

module.exports = swaggerUIRoutes;
