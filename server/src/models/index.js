const sequelize = require('../config/database');
const User = require('./User');
const ProductCategory = require('./ProductCategory');
const Product = require('./Product');
const HeroContent = require('./HeroContent');
const AboutContent = require('./AboutContent');
const CoreValue = require('./CoreValue');
const WhyChooseUsItem = require('./WhyChooseUsItem');
const ContactInfo = require('./ContactInfo');
const SectionSetting = require('./SectionSetting');
const ContactInquiry = require('./ContactInquiry');
const PublishSnapshot = require('./PublishSnapshot');

// Associations
ProductCategory.hasMany(Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'SET NULL' });
Product.belongsTo(ProductCategory, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  sequelize,
  User,
  ProductCategory,
  Product,
  HeroContent,
  AboutContent,
  CoreValue,
  WhyChooseUsItem,
  ContactInfo,
  SectionSetting,
  ContactInquiry,
  PublishSnapshot,
};

