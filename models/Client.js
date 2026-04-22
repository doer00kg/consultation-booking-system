const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'clients',
  timestamps: false
});

module.exports = Client;