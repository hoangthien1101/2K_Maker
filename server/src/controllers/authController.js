const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || '2k_maker_secret_key',
    { expiresIn: '7d' }
  );
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên đăng nhập/email và mật khẩu',
      });
    }

    const user = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi đăng nhập',
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi lấy thông tin người dùng',
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, currentPassword, newPassword } = req.body;

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu',
        });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Mật khẩu hiện tại không chính xác',
        });
      }
      user.password = newPassword;
    }

    await user.save();

    return res.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật hồ sơ',
      error: error.message,
    });
  }
};

