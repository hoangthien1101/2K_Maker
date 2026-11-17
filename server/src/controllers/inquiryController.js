const { ContactInquiry } = require('../models');

exports.submitInquiry = async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, productName, inquiryType, message, attachmentUrl } = req.body;

    if (!customerName || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp Họ tên và Số điện thoại liên hệ',
      });
    }

    const inquiry = await ContactInquiry.create({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail ? customerEmail.trim() : null,
      productName: productName ? productName.trim() : null,
      inquiryType: inquiryType || 'consultation',
      message: message || '',
      attachmentUrl: attachmentUrl || null,
      status: 'new',
    });

    return res.status(201).json({
      success: true,
      message: 'Cảm ơn bạn! 2K Maker đã tiếp nhận yêu cầu và sẽ liên hệ hỗ trợ bạn trong thời gian sớm nhất.',
      data: inquiry,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể gửi yêu cầu lúc này, vui lòng thử lại sau',
      error: error.message,
    });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const inquiries = await ContactInquiry.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi tải danh sách yêu cầu tư vấn',
      error: error.message,
    });
  }
};

exports.updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await ContactInquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu' });
    }

    const { status, adminNote } = req.body;
    if (status) inquiry.status = status;
    if (adminNote !== undefined) inquiry.adminNote = adminNote;

    await inquiry.save();

    return res.json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: inquiry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật yêu cầu', error: error.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await ContactInquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu' });
    }

    await inquiry.destroy();

    return res.json({
      success: true,
      message: 'Đã xóa yêu cầu tư vấn',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa yêu cầu', error: error.message });
  }
};

