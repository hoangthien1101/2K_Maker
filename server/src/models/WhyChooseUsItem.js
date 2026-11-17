const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WhyChooseUsItem = sequelize.define('WhyChooseUsItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '01',
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'UNIQUE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ĐỘC ĐÁO',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Sản phẩm được tạo ra từ ý tưởng riêng, mang dấu ấn cá nhân và không bị giới hạn bởi những mẫu có sẵn.',
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Fingerprint',
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

module.exports = WhyChooseUsItem;

