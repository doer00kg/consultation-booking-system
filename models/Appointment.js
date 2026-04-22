const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING
  },
  clientId: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

module.exports = Appointment;