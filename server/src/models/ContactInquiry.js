const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactInquiry = sequelize.define('ContactInquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inquiryType: {
    type: DataTypes.STRING,
    defaultValue: 'consultation', // 'consultation' or 'order'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new', // 'new', 'contacted', 'completed'
  },
  adminNote: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = ContactInquiry;

