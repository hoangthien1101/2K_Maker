exports.uploadSingle = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tệp hình ảnh để tải lên',
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      message: 'Tải ảnh lên thành công',
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi tải ảnh lên',
      error: error.message,
    });
  }
};

exports.uploadMultiple = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một hình ảnh',
      });
    }

    const urls = req.files.map((file) => `/uploads/${file.filename}`);

    return res.json({
      success: true,
      message: `Đã tải lên ${req.files.length} hình ảnh`,
      urls,
      files: req.files.map((f) => ({ url: `/uploads/${f.filename}`, filename: f.filename })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tải nhiều ảnh lên',
      error: error.message,
    });
  }
};

