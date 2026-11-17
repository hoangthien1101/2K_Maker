const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CoreValue = sequelize.define('CoreValue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // e.g. "CREATIVITY – Sáng tạo"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false, // e.g. "Khuyến khích những ý tưởng mới lạ và không giới hạn sự sáng tạo."
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Sparkles',
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

module.exports = CoreValue;

