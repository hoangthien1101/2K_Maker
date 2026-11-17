const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'mssql') {
  sequelize = new Sequelize(
    process.env.DB_NAME || '2k_maker_db',
    process.env.DB_USER || 'sa',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433', 10),
      dialect: 'mssql',
      dialectOptions: {
        options: {
          encrypt: process.env.DB_ENCRYPT === 'true',
          trustServerCertificate: true,
          enableArithAbort: true,
        },
      },
      logging: process.env.NODE_ENV === 'development' ? false : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
} else {
  // SQLite default
  const dbDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const storagePath = path.resolve(__dirname, '../../data/database.sqlite');

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  });
}

module.exports = sequelize;

