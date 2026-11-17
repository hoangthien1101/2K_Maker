const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');
const seedDatabase = require('./seeders/seedData');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const contentRoutes = require('./routes/contentRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true, limit: '150mb' }));
app.use(morgan('dev'));

// Static uploads directory
const uploadsDir = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: '2K MAKER',
    slogan: 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build if exists
const clientDist = path.resolve(__dirname, '../../client/dist');
const fs = require('fs');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // 404 Handler for API
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint API không tồn tại',
    });
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Dung lượng tệp vượt quá giới hạn tối đa cho phép (100MB).',
    });
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `Lỗi tải tệp: ${err.message}`,
    });
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi hệ thống máy chủ',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Kết nối cơ sở dữ liệu thành công!');

    // Auto sync & seed initial brand data
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 2K MAKER Backend API Server đang chạy tại:`);
      console.log(`   http://localhost:${PORT}`);
      console.log(`   Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Không thể khởi động server:', error);
    process.exit(1);
  }
};

startServer();
