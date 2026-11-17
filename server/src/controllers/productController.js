const { Product, ProductCategory } = require('../models');
const { Op } = require('sequelize');

// Public & Admin Products
exports.getProducts = async (req, res) => {
  try {
    const { category, search, isAdmin } = req.query;
    const where = {};

    // If not admin, only show visible products
    if (isAdmin !== 'true') {
      where.isVisible = true;
    }

    if (category && category !== 'all') {
      // Find category by slug or id
      const cat = await ProductCategory.findOne({
        where: {
          [Op.or]: [{ id: isNaN(category) ? -1 : Number(category) }, { slug: category }],
        },
      });
      if (cat) {
        where.categoryId = cat.id;
      }
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { shortDescription: { [Op.like]: `%${search}%` } },
      ];
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'slug'],
        },
      ],
      order: [
        ['sortOrder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể tải danh sách sản phẩm',
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'slug'],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi tải chi tiết sản phẩm',
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      shortDescription,
      fullDescription,
      thumbnail,
      images,
      material,
      dimensions,
      sortOrder,
      isVisible,
      isFeatured,
      customNote,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Tên sản phẩm là bắt buộc',
      });
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();

    const product = await Product.create({
      title: title.trim(),
      slug,
      categoryId: categoryId || null,
      shortDescription,
      fullDescription,
      thumbnail: thumbnail || (Array.isArray(images) && images.length > 0 ? images[0] : null),
      images: Array.isArray(images) ? images : [],
      material,
      dimensions,
      sortOrder: sortOrder || 0,
      isVisible: isVisible !== undefined ? isVisible : true,
      isFeatured: !!isFeatured,
      customNote,
    });

    const fullProduct = await Product.findByPk(product.id, {
      include: [{ model: ProductCategory, as: 'category' }],
    });

    return res.status(201).json({
      success: true,
      message: 'Thêm sản phẩm mới thành công',
      data: fullProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm mới',
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm để cập nhật',
      });
    }

    const {
      title,
      categoryId,
      shortDescription,
      fullDescription,
      thumbnail,
      images,
      material,
      dimensions,
      sortOrder,
      isVisible,
      isFeatured,
      customNote,
    } = req.body;

    if (title && title.trim()) {
      product.title = title.trim();
    }
    if (categoryId !== undefined) product.categoryId = categoryId ? Number(categoryId) : null;
    if (shortDescription !== undefined) product.shortDescription = shortDescription;
    if (fullDescription !== undefined) product.fullDescription = fullDescription;
    if (thumbnail !== undefined) product.thumbnail = thumbnail;
    if (images !== undefined) product.images = images;
    if (material !== undefined) product.material = material;
    if (dimensions !== undefined) product.dimensions = dimensions;
    if (sortOrder !== undefined) product.sortOrder = Number(sortOrder);
    if (isVisible !== undefined) product.isVisible = Boolean(isVisible);
    if (isFeatured !== undefined) product.isFeatured = Boolean(isFeatured);
    if (customNote !== undefined) product.customNote = customNote;

    await product.save();

    const fullProduct = await Product.findByPk(product.id, {
      include: [{ model: ProductCategory, as: 'category' }],
    });

    return res.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: fullProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm',
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    await product.destroy();

    return res.json({
      success: true,
      message: 'Đã xóa sản phẩm thành công',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: error.message,
    });
  }
};

exports.toggleProductVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }

    product.isVisible = !product.isVisible;
    await product.save();

    return res.json({
      success: true,
      message: `Đã ${product.isVisible ? 'hiển thị' : 'ẩn'} sản phẩm`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật trạng thái', error: error.message });
  }
};

// Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.findAll({
      order: [['sortOrder', 'ASC'], ['id', 'ASC']],
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id'],
        },
      ],
    });

    const data = categories.map((c) => ({
      ...c.toJSON(),
      productCount: c.products ? c.products.length : 0,
    }));

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Không thể tải danh mục sản phẩm',
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, sortOrder } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc' });
    }

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const category = await ProductCategory.create({
      name: name.trim(),
      slug,
      sortOrder: sortOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo danh mục thành công',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi tạo danh mục',
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Danh mục không tồn tại' });
    }

    const { name, sortOrder, isActive } = req.body;
    if (name) category.name = name.trim();
    if (sortOrder !== undefined) category.sortOrder = Number(sortOrder);
    if (isActive !== undefined) category.isActive = Boolean(isActive);

    await category.save();

    return res.json({
      success: true,
      message: 'Cập nhật danh mục thành công',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật danh mục', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Danh mục không tồn tại' });
    }

    await category.destroy();
    return res.json({ success: true, message: 'Đã xóa danh mục' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa danh mục', error: error.message });
  }
};

