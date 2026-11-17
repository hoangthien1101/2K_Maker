const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PublishSnapshot = sequelize.define('PublishSnapshot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  publishedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Admin',
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  snapshotData: {
    type: DataTypes.TEXT,
    allowNull: false, // JSON stringified complete website state
    get() {
      const val = this.getDataValue('snapshotData');
      if (!val) return null;
      try {
        return JSON.parse(val);
      } catch (e) {
        return null;
      }
    },
    set(val) {
      if (typeof val === 'object') {
        this.setDataValue('snapshotData', JSON.stringify(val));
      } else {
        this.setDataValue('snapshotData', val);
      }
    },
  },
  isCurrent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = PublishSnapshot;

