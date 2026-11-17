const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HeroContent = sequelize.define('HeroContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slogan: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Dịch vụ thiết kế và in 3D theo yêu cầu chất lượng cao',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '2K Maker mang công nghệ in 3D hiện đại đến gần hơn với mọi người. Chuyên nhận in móc khóa, phụ kiện, mô hình nhân vật và mascot độc bản với mức chi phí hợp lý nhất.',
  },
  ctaText: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'KHÁM PHÁ SẢN PHẨM',
  },
  ctaLink: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#products',
  },
  bannerImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logoImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  badgeText: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'CÔNG NGHỆ IN 3D HIỆN ĐẠI – ĐỘ CHI TIẾT CAO',
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = HeroContent;

