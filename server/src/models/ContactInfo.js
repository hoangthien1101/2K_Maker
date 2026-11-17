const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactInfo = sequelize.define('ContactInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "LET'S CREATE SOMETHING UNIQUE!",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Bạn có ý tưởng riêng? Hãy để 2K Maker giúp bạn biến ý tưởng thành sản phẩm 3D thực tế.',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0988 234 567',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'contact@2kmaker.vn',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội',
  },
  facebookUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://facebook.com/2kmaker.3dprint',
  },
  tiktokUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://tiktok.com/@2kmaker.official',
  },
  zaloUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://zalo.me/0988234567',
  },
  ctaConsultationText: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'LIÊN HỆ TƯ VẤN',
  },
  ctaOrderText: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ĐẶT HÀNG NGAY',
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = ContactInfo;

