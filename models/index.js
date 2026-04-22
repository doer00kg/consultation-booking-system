const sequelize = require('../config/sequelize');
const Client = require('./Client');
const Appointment = require('./Appointment');

Client.hasMany(Appointment, { foreignKey: 'clientId' });
Appointment.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = {
  sequelize,
  Client,
  Appointment
};

const User = require('./User');

module.exports = {
  sequelize,
  Client,
  Appointment,
  User
};