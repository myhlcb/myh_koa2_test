const model = require('../app/model');

module.exports = async () => {
  await model.appointment.remove();
  await model.service.remove();
};
