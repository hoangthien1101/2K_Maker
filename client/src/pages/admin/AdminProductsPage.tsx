import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { Product, ProductCategory } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Package,
  Layers,
  Sparkles,
  Loader2,
  X,
  Check,
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { success, error } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active tab: 'products' | 'categories'
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<ProductCategory> | null>(null);
  const [deleteCategoryTarget, setDeleteCategoryTarget] = useState<ProductCategory | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts({ isAdmin: true }),
        productService.getCategories(),
      ]);
      if (prodRes.data) setProducts(prodRes.data);
      if (catRes.data) setCategories(catRes.data);
    } catch (err: any) {
      error('Lỗi khi tải dữ liệu sản phẩm');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all') {
      const matchCat =
        p.category?.slug === selectedCategory ||
        p.categoryId === Number(selectedCategory) ||
        p.category?.name === selectedCategory;
      if (!matchCat) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = (p.shortDescription || '').toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }
    return true;
  });

  // Toggle Visibility
  const handleToggleVisibility = async (product: Product) => {
    try {
      const res = await productService.toggleVisibility(product.id);
      success(res.message);
      setProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, isVisible: !item.isVisible } : item
        )
      );
    } catch (err: any) {
      error(err.message || 'Lỗi thay đổi trạng thái');
    }
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct({
      title: '',
      categoryId: categories.length > 0 ? categories[0].id : null,
      shortDescription: '',
      fullDescription: '',
      thumbnail: '',
      images: [],
      material: 'PLA+ Cao cấp / PETG',
      dimensions: '',
      sortOrder: products.length + 1,
      isVisible: true,
      isFeatured: false,
      customNote: 'Có thể điều chỉnh kích thước và màu sắc theo yêu cầu.',
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct({
      ...prod,
      images: Array.isArray(prod.images) ? [...prod.images] : [],
    });
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title?.trim()) {
      error('Vui lòng nhập tên sản phẩm');
      return;
    }

    try {
      const imagesArr = Array.isArray(editingProduct.images) ? editingProduct.images : [];
      const primaryThumb = editingProduct.thumbnail || (imagesArr.length > 0 ? imagesArr[0] : '');

      const payload = {
        ...editingProduct,
        thumbnail: primaryThumb,
        images: imagesArr,
      };

      if (editingProduct.id) {
        await productService.updateProduct(editingProduct.id, payload);
        success('Cập nhật sản phẩm thành công!');
      } else {
        await productService.createProduct(payload);
        success('Đã thêm sản phẩm mới thành công!');
      }

      setIsProductModalOpen(false);
      fetchData();
    } catch (err: any) {
      error(err.message || 'Lỗi lưu sản phẩm');
    }
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!deleteProductTarget) return;
    try {
      await productService.deleteProduct(deleteProductTarget.id);
      success('Đã xóa sản phẩm thành công');
      setDeleteProductTarget(null);
      fetchData();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  // Category Actions
  const handleOpenAddCategory = () => {
    setEditingCategory({ name: '', sortOrder: categories.length + 1 });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: ProductCategory) => {
    setEditingCategory({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name?.trim()) {
      error('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      if (editingCategory.id) {
        await productService.updateCategory(editingCategory.id, editingCategory);
        success('Cập nhật danh mục thành công');
      } else {
        await productService.createCategory({
          name: editingCategory.name.trim(),
          sortOrder: editingCategory.sortOrder,
        });
        success('Thêm danh mục mới thành công');
      }
      setIsCategoryModalOpen(false);
      fetchData();
    } catch (err: any) {
      error(err.message || 'Lỗi lưu danh mục');
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryTarget) return;
    try {
      await productService.deleteCategory(deleteCategoryTarget.id);
      success('Đã xóa danh mục');
      setDeleteCategoryTarget(null);
      fetchData();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xóa danh mục');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      <AdminHeader
        title="Quản Lý Sản Phẩm In 3D"
        description="Thêm mới, sửa, xóa, tải ảnh chất lượng cao và phân loại danh mục sản phẩm của 2K Maker"
      />

      <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
        {/* Navigation Tabs between Products & Categories */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Danh Sách Sản Phẩm ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'categories'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Danh Mục Sản Phẩm ({categories.length})
            </button>
          </div>

          <div>
            {activeTab === 'products' ? (
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Sản Phẩm Mới</span>
              </button>
            ) : (
              <button
                onClick={handleOpenAddCategory}
                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Danh Mục</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({products.length})
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      selectedCategory === c.slug
                        ? 'bg-navy-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên sản phẩm..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">Hình ảnh & Tên Sản Phẩm</th>
                      <th className="py-4 px-4">Danh mục</th>
                      <th className="py-4 px-4">Vật liệu in</th>
                      <th className="py-4 px-4 text-center">Thứ tự</th>
                      <th className="py-4 px-4 text-center">Trạng thái</th>
                      <th className="py-4 px-6 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Title & Thumbnail */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.thumbnail || (p.images?.[0] ?? '')}
                              alt={p.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-extrabold text-navy-900 line-clamp-1 max-w-xs">
                                {p.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                                {p.shortDescription}
                              </p>
                              {p.isFeatured && (
                                <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 uppercase">
                                  Nổi bật
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                            {p.category?.name || 'Khác'}
                          </span>
                        </td>

                        {/* Material */}
                        <td className="py-4 px-4 text-slate-600">
                          {p.material || 'PLA / Resin'}
                        </td>

                        {/* Sort Order */}
                        <td className="py-4 px-4 text-center font-bold text-navy-900">
                          {p.sortOrder}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleToggleVisibility(p)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-colors ${
                              p.isVisible
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {p.isVisible ? (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Hiển thị</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Đang ẩn</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 transition-colors"
                              title="Chỉnh sửa sản phẩm"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteProductTarget(p)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          Không tìm thấy sản phẩm nào trong kho lưu trữ.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES LIST */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6">
            <h3 className="text-base font-extrabold text-navy-900 mb-4">
              Phân Loại Danh Mục Sản Phẩm (Móc khóa, Phụ kiện, Mô hình, Mascot...)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-navy-900">{c.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Slug: {c.slug}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditCategory(c)}
                        className="p-1.5 text-slate-400 hover:text-brand-600"
                        title="Sửa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteCategoryTarget(c)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/60">
                    <span>Thứ tự: {c.sortOrder}</span>
                    <span className="font-bold text-brand-600">{c.productCount ?? 0} sản phẩm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-10 my-8 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-navy-900">
                  {editingProduct.id ? 'Chỉnh Sửa Thông Tin Sản Phẩm In 3D' : 'Thêm Sản Phẩm Mới'}
                </h3>
                <p className="text-xs text-slate-500">
                  Nhập đầy đủ thông tin, tải lên nhiều ảnh và chọn ảnh đại diện nổi bật
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên Sản Phẩm *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  placeholder="Ví dụ: Móc khóa Typography 2K Maker phát sáng"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Category & Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Danh Mục *
                  </label>
                  <select
                    value={editingProduct.categoryId || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        categoryId: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Thứ Tự Sắp Xếp
                  </label>
                  <input
                    type="number"
                    value={editingProduct.sortOrder || 1}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, sortOrder: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingProduct.isVisible ?? true}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isVisible: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>Hiển thị</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingProduct.isFeatured ?? false}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>Nổi bật</span>
                  </label>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mô Tả Ngắn (Hiển thị tại Card ngoài trang chủ) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                  }
                  placeholder="Mô tả tóm tắt sản phẩm trong 1-2 câu..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mô Tả Chi Tiết (Hiển thị khi mở xem Modal chi tiết)
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.fullDescription || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, fullDescription: e.target.value })
                  }
                  placeholder="Chi tiết về thiết kế, ứng dụng, độ nét in, cách bảo quản..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Specs: Material & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Vật Liệu In (PLA+, PETG, Resin 8K, Silk...)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.material || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, material: e.target.value })
                    }
                    placeholder="Ví dụ: Nhựa PLA+ sinh học cao cấp"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kích Thước Tham Khảo
                  </label>
                  <input
                    type="text"
                    value={editingProduct.dimensions || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, dimensions: e.target.value })
                    }
                    placeholder="Ví dụ: 6.5 x 2.5 x 0.8 cm (Có thể tùy chỉnh)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ghi Chú Tùy Biến Thêm
                </label>
                <input
                  type="text"
                  value={editingProduct.customNote || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, customNote: e.target.value })
                  }
                  placeholder="Ví dụ: Nhận khắc tên theo bảng 24 màu hoặc in kích cỡ theo yêu cầu."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Multiple Images Upload */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <ImageUploader
                  label="Bộ Sưu Tập Hình Ảnh Sản Phẩm (Tải lên nhiều ảnh)"
                  multiple={true}
                  value={editingProduct.images || []}
                  onChange={(newImages) => {
                    const arr = Array.isArray(newImages) ? newImages : [newImages];
                    const thumb = editingProduct.thumbnail || (arr.length > 0 ? arr[0] : '');
                    setEditingProduct({ ...editingProduct, images: arr, thumbnail: thumb });
                  }}
                  helperText="Kéo thả nhiều ảnh cùng lúc để khách hàng có thể xem nhiều góc độ của sản phẩm 3D"
                />

                {/* Primary Thumbnail Selector */}
                {Array.isArray(editingProduct.images) && editingProduct.images.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold text-navy-900 mb-2">
                      Chọn Ảnh Làm Thumbnail Đại Diện:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {editingProduct.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setEditingProduct({ ...editingProduct, thumbnail: img })}
                          className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            editingProduct.thumbnail === img
                              ? 'border-brand-600 ring-2 ring-brand-400'
                              : 'border-slate-300 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumb option" className="w-full h-full object-cover" />
                          {editingProduct.thumbnail === img && (
                            <div className="absolute inset-0 bg-brand-600/30 flex items-center justify-center text-white">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-brand-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md active:scale-95 transition-all"
                >
                  Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setIsCategoryModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-navy-900 mb-4">
              {editingCategory.id ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tên Danh Mục (Ví dụ: Móc khóa, Mascot, Phụ kiện) *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Thứ Tự Sắp Xếp
                </label>
                <input
                  type="number"
                  value={editingCategory.sortOrder || 1}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, sortOrder: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-brand-600"
                >
                  Lưu Danh Mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM DIALOGS */}
      <ConfirmDialog
        isOpen={!!deleteProductTarget}
        title="Xóa Sản Phẩm In 3D"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${deleteProductTarget?.title}"? Dữ liệu này sẽ được xóa khỏi cơ sở dữ liệu.`}
        isDangerous
        confirmLabel="Xóa sản phẩm"
        onConfirm={handleDeleteProduct}
        onCancel={() => setDeleteProductTarget(null)}
      />

      <ConfirmDialog
        isOpen={!!deleteCategoryTarget}
        title="Xóa Danh Mục Sản Phẩm"
        message={`Bạn có chắc chắn muốn xóa danh mục "${deleteCategoryTarget?.name}"?`}
        isDangerous
        confirmLabel="Xóa danh mục"
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteCategoryTarget(null)}
      />
    </div>
  );
};

