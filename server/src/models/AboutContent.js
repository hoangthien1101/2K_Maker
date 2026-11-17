const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AboutContent = sequelize.define('AboutContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ABOUT 2K MAKER',
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '2K MAKER – BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D',
  },
  introParagraph1: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Mỗi ý tưởng đều xứng đáng có một phiên bản của riêng mình.',
  },
  introParagraph2: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '2K Maker là cửa hàng chuyên nhận in 3D theo yêu cầu, từ móc khóa, phụ kiện cá nhân đến mô hình nhân vật và mascot độc đáo.',
  },
  introParagraph3: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Với mong muốn đưa công nghệ in 3D đến gần hơn với mọi người, 2K Maker giúp khách hàng biến những ý tưởng sáng tạo thành sản phẩm thực tế với mức chi phí hợp lý.',
  },
  storyTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Câu chuyện thương hiệu',
  },
  storyContent: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Xuất phát từ niềm đam mê sáng tạo và mong muốn tạo nên những sản phẩm khác biệt, 2K Maker ra đời với mục tiêu biến những ý tưởng độc đáo thành những món đồ hữu hình, mang dấu ấn riêng của mỗi khách hàng.',
  },
  illustrationImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = AboutContent;

