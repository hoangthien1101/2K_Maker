const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Yêu cầu đăng nhập quản trị (Không tìm thấy token hợp lệ)',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '2k_maker_secret_key');

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại hoặc đã bị thu hồi quyền truy cập',
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền quản trị viên',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Phiên làm việc đã hết hạn hoặc token không hợp lệ',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;

