const mongoose = require('mongoose');
const config = require('config')
const {
  mongodb: { host, port, database },
} = config
const url = process.env['MONGO_URL'] || `mongodb://${host}:${port}/${database}`
const db = mongoose.createConnection(url);
console.log(`get mongodb uri: mongodb://${host}:${port}/${database}`);
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
