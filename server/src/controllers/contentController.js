const {
  HeroContent,
  AboutContent,
  CoreValue,
  WhyChooseUsItem,
  ContactInfo,
  SectionSetting,
  Product,
  ProductCategory,
  ContactInquiry,
  PublishSnapshot,
} = require('../models');

// Helper to gather complete state
const compileSiteState = async (isDraft = false) => {
  const [hero, about, coreValues, whyChooseUs, contact, sections, products, categories] = await Promise.all([
    HeroContent.findOne({ order: [['id', 'DESC']] }),
    AboutContent.findOne({ order: [['id', 'DESC']] }),
    CoreValue.findAll({ order: [['sortOrder', 'ASC'], ['id', 'ASC']] }),
    WhyChooseUsItem.findAll({ order: [['sortOrder', 'ASC'], ['id', 'ASC']] }),
    ContactInfo.findOne({ order: [['id', 'DESC']] }),
    SectionSetting.findAll({ order: [['sortOrder', 'ASC'], ['id', 'ASC']] }),
    Product.findAll({
      where: isDraft ? {} : { isVisible: true },
      include: [{ model: ProductCategory, as: 'category', attributes: ['id', 'name', 'slug'] }],
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']],
    }),
    ProductCategory.findAll({
      where: isDraft ? {} : { isActive: true },
      order: [['sortOrder', 'ASC'], ['id', 'ASC']],
    }),
  ]);

  return {
    hero: hero ? hero.toJSON() : null,
    about: about ? about.toJSON() : null,
    coreValues: coreValues.map((v) => v.toJSON()),
    whyChooseUs: whyChooseUs.map((w) => w.toJSON()),
    contact: contact ? contact.toJSON() : null,
    sections: sections.map((s) => s.toJSON()),
    products: products.map((p) => p.toJSON()),
    categories: categories.map((c) => c.toJSON()),
  };
};

// 1. Public Landing Page Content
exports.getPublishedContent = async (req, res) => {
  try {
    // Check if there is an active published snapshot
    const currentSnapshot = await PublishSnapshot.findOne({
      where: { isCurrent: true },
      order: [['id', 'DESC']],
    });

    if (currentSnapshot && currentSnapshot.snapshotData) {
      return res.json({
        success: true,
        source: 'snapshot',
        publishedAt: currentSnapshot.updatedAt || currentSnapshot.createdAt,
        data: currentSnapshot.snapshotData,
      });
    }

    // If no snapshot yet, compile direct live data
    const liveData = await compileSiteState(false);
    return res.json({
      success: true,
      source: 'live',
      data: liveData,
    });
  } catch (error) {
    console.error('Error fetching published content:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể tải nội dung trang chủ',
      error: error.message,
    });
  }
};

// 2. Admin Draft Content
exports.getDraftContent = async (req, res) => {
  try {
    const draftData = await compileSiteState(true);
    const lastPublish = await PublishSnapshot.findOne({
      where: { isCurrent: true },
      order: [['id', 'DESC']],
    });

    return res.json({
      success: true,
      lastPublishedAt: lastPublish ? (lastPublish.updatedAt || lastPublish.createdAt) : null,
      publishedBy: lastPublish ? lastPublish.publishedBy : null,
      data: draftData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Không thể tải bản thảo trang web',
      error: error.message,
    });
  }
};

// 3. Publish Website
exports.publishWebsite = async (req, res) => {
  try {
    const adminName = req.user ? req.user.name : 'Admin';
    const note = req.body.note || 'Cập nhật xuất bản nội dung mới';

    // Compile current published view data
    const publishedData = await compileSiteState(false);

    // Deactivate previous snapshots
    await PublishSnapshot.update({ isCurrent: false }, { where: { isCurrent: true } });

    // Create new snapshot
    const snapshot = await PublishSnapshot.create({
      publishedBy: adminName,
      note,
      snapshotData: publishedData,
      isCurrent: true,
    });

    return res.json({
      success: true,
      message: 'Xuất bản website thành công! Nội dung mới đã được cập nhật trực tiếp ra Landing Page.',
      publishedAt: snapshot.createdAt,
    });
  } catch (error) {
    console.error('Error publishing site:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xuất bản website',
      error: error.message,
    });
  }
};

// 4. Hero Content Management
exports.getHero = async (req, res) => {
  try {
    let hero = await HeroContent.findOne({ order: [['id', 'DESC']] });
    if (!hero) {
      hero = await HeroContent.create({});
    }
    return res.json({ success: true, data: hero });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải Hero', error: error.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    let hero = await HeroContent.findOne({ order: [['id', 'DESC']] });
    if (!hero) {
      hero = await HeroContent.create(req.body);
    } else {
      await hero.update(req.body);
    }
    return res.json({
      success: true,
      message: 'Cập nhật thông tin Hero thành công (Đã lưu bản nháp)',
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật Hero', error: error.message });
  }
};

// 5. About Us Content Management
exports.getAbout = async (req, res) => {
  try {
    let about = await AboutContent.findOne({ order: [['id', 'DESC']] });
    if (!about) {
      about = await AboutContent.create({});
    }
    const coreValues = await CoreValue.findAll({ order: [['sortOrder', 'ASC']] });
    return res.json({ success: true, data: { ...about.toJSON(), coreValues } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải About Us', error: error.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    let about = await AboutContent.findOne({ order: [['id', 'DESC']] });
    if (!about) {
      about = await AboutContent.create(req.body);
    } else {
      await about.update(req.body);
    }
    return res.json({
      success: true,
      message: 'Cập nhật About Us thành công (Đã lưu bản nháp)',
      data: about,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật About Us', error: error.message });
  }
};

// Core Values
exports.getCoreValues = async (req, res) => {
  try {
    const values = await CoreValue.findAll({ order: [['sortOrder', 'ASC'], ['id', 'ASC']] });
    return res.json({ success: true, data: values });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải giá trị cốt lõi', error: error.message });
  }
};

exports.createCoreValue = async (req, res) => {
  try {
    const value = await CoreValue.create(req.body);
    return res.status(201).json({ success: true, message: 'Thêm giá trị cốt lõi thành công', data: value });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tạo giá trị cốt lõi', error: error.message });
  }
};

exports.updateCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CoreValue.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy mục' });
    await item.update(req.body);
    return res.json({ success: true, message: 'Cập nhật giá trị cốt lõi thành công', data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật giá trị cốt lõi', error: error.message });
  }
};

exports.deleteCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CoreValue.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy mục' });
    await item.destroy();
    return res.json({ success: true, message: 'Đã xóa giá trị cốt lõi' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa giá trị cốt lõi', error: error.message });
  }
};

// 6. Why Choose Us Management
exports.getWhyChooseUs = async (req, res) => {
  try {
    const items = await WhyChooseUsItem.findAll({ order: [['sortOrder', 'ASC'], ['id', 'ASC']] });
    return res.json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải Why Choose Us', error: error.message });
  }
};

exports.createWhyChooseUs = async (req, res) => {
  try {
    const item = await WhyChooseUsItem.create(req.body);
    return res.status(201).json({ success: true, message: 'Thêm thẻ thành công', data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tạo thẻ Why Choose Us', error: error.message });
  }
};

exports.updateWhyChooseUs = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await WhyChooseUsItem.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy thẻ' });
    await item.update(req.body);
    return res.json({ success: true, message: 'Cập nhật thẻ thành công', data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật thẻ', error: error.message });
  }
};

exports.deleteWhyChooseUs = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await WhyChooseUsItem.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy thẻ' });
    await item.destroy();
    return res.json({ success: true, message: 'Đã xóa thẻ' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa thẻ', error: error.message });
  }
};

// 7. Contact Management
exports.getContact = async (req, res) => {
  try {
    let contact = await ContactInfo.findOne({ order: [['id', 'DESC']] });
    if (!contact) {
      contact = await ContactInfo.create({});
    }
    return res.json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải Contact', error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    let contact = await ContactInfo.findOne({ order: [['id', 'DESC']] });
    if (!contact) {
      contact = await ContactInfo.create(req.body);
    } else {
      await contact.update(req.body);
    }
    return res.json({
      success: true,
      message: 'Cập nhật thông tin liên hệ thành công (Đã lưu bản nháp)',
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật Contact', error: error.message });
  }
};

// 8. Section Settings Management
exports.getSections = async (req, res) => {
  try {
    const sections = await SectionSetting.findAll({ order: [['sortOrder', 'ASC']] });
    return res.json({ success: true, data: sections });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi tải cài đặt section', error: error.message });
  }
};

exports.updateSections = async (req, res) => {
  try {
    const { sections } = req.body; // array of { id, isVisible, sortOrder }
    if (!Array.isArray(sections)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
    }

    for (const item of sections) {
      await SectionSetting.update(
        { isVisible: item.isVisible, sortOrder: item.sortOrder },
        { where: { id: item.id } }
      );
    }

    const updated = await SectionSetting.findAll({ order: [['sortOrder', 'ASC']] });
    return res.json({
      success: true,
      message: 'Cập nhật trạng thái hiển thị và thứ tự section thành công',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật section', error: error.message });
  }
};

// 9. Dashboard Overview Stats
exports.getOverviewStats = async (req, res) => {
  try {
    const [totalProducts, visibleProducts, totalCategories, totalInquiries, newInquiries, lastPublish] = await Promise.all([
      Product.count(),
      Product.count({ where: { isVisible: true } }),
      ProductCategory.count(),
      ContactInquiry.count(),
      ContactInquiry.count({ where: { status: 'new' } }),
      PublishSnapshot.findOne({ where: { isCurrent: true }, order: [['id', 'DESC']] }),
    ]);

    const recentInquiries = await ContactInquiry.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    const recentProducts = await Product.findAll({
      include: [{ model: ProductCategory, as: 'category', attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    return res.json({
      success: true,
      data: {
        totalProducts,
        visibleProducts,
        hiddenProducts: totalProducts - visibleProducts,
        totalCategories,
        totalInquiries,
        newInquiries,
        lastPublishedAt: lastPublish ? (lastPublish.updatedAt || lastPublish.createdAt) : null,
        publishedBy: lastPublish ? lastPublish.publishedBy : null,
        recentInquiries,
        recentProducts,
      },
    });
  } catch (error) {
    console.error('Error getting overview stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể tải số liệu thống kê',
      error: error.message,
    });
  }
};

