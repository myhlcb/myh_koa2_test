const _ = require('lodash');

const env = process.env.NODE_ENV || 'dev';
const envFile = require(`./${env}`);
const base = require('./base');

module.exports = _.defaultsDeep(envFile, base);
