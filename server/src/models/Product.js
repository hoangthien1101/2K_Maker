const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fullDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('images');
      if (!rawValue) return [];
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return [];
      }
    },
    set(val) {
      if (Array.isArray(val)) {
        this.setDataValue('images', JSON.stringify(val));
      } else if (typeof val === 'string') {
        this.setDataValue('images', val);
      } else {
        this.setDataValue('images', JSON.stringify([]));
      }
    },
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'PLA / PETG / Resin cao cấp',
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  customNote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Product;

