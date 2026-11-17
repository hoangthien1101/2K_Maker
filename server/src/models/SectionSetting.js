const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SectionSetting = sequelize.define('SectionSetting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sectionKey: {
    type: DataTypes.STRING,
    allowNull: false, // 'hero', 'about', 'products', 'why_choose_us', 'contact'
  },
  sectionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = SectionSetting;

