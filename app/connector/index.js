const mongoose = require('mongoose');
const {
  mongodb: { host, port, database },
} = require('../../config/');

const db = mongoose.createConnection(`mongodb://${host}:${port}/${database}`);
console.log(`mongodb://${host}:${port}/${database}`, 11111);
db.on('connected', () => {
  console.log('connect success');
});
db.on('disconnected', () => {
  console.log('disconnected');
});
db.on('open', () => {
  console.log('open success');
});
db.on('error', (err) => {
  console.log(`error happen:${err}`);
});
module.exports = db;
