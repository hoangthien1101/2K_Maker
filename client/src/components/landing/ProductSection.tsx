import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { Search, PackageOpen, Sparkles } from 'lucide-react';
import { scrollToSection } from '../../hooks/useLenis';

interface ProductSectionProps {
  products: Product[];
  categories: ProductCategory[];
  onOrderProduct: (product: Product) => void;
  phone?: string;
  zaloUrl?: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  categories,
  onOrderProduct,
  phone,
  zaloUrl,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all') {
        const matchesCategory =
          p.category?.slug === selectedCategory ||
          p.category?.name.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categoryId === Number(selectedCategory);
        if (!matchesCategory) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = (p.shortDescription || '').toLowerCase().includes(q);
        const inCat = (p.category?.name || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCat) return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 md:py-28 bg-[#F8FAFF] relative border-t border-[#D9E8FF]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold text-[#0A42A1] tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D9E8FF] inline-block mb-3.5">
            PRODUCT SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#223176] tracking-tight leading-tight mb-4">
            Bộ Sưu Tập Sản Phẩm In 3D Sáng Tạo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Từ những chiếc móc khóa xinh xắn, phụ kiện công nghệ đến mô hình nhân vật và mascot độc quyền. Mọi sản phẩm đều có thể tùy biến theo ý tưởng của bạn.
          </p>
        </div>

        {/* Filter Bar: Categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-[#0A42A1] text-white shadow-md shadow-[#0A42A1]/20'
                  : 'bg-white hover:bg-[#EEF4FF] text-[#223176] hover:text-[#0A42A1] border border-[#D9E8FF]'
              }`}
            >
              Tất cả ({products.length})
            </button>

            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.categoryId === cat.id || p.category?.slug === cat.slug
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug || String(cat.id))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.slug || selectedCategory === String(cat.id)
                      ? 'bg-[#0A42A1] text-white shadow-md shadow-[#0A42A1]/20'
                      : 'bg-white hover:bg-[#EEF4FF] text-[#223176] hover:text-[#0A42A1] border border-[#D9E8FF]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu in 3D..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Clean Standard Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={(p) => setSelectedProduct(p)}
                onOrderNow={(p) => onOrderProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D9E8FF] p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] text-[#0A42A1] flex items-center justify-center mx-auto mb-4">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#223176] mb-2">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục sản phẩm in 3D.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0A42A1] text-white text-xs font-bold hover:bg-[#083582] transition-colors shadow-xs"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}

        {/* Bottom Banner Showcase */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#223176] via-[#1A255C] to-[#0A42A1] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#6FA8FF] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dịch vụ in theo file thiết kế riêng</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Bạn có sẵn file 3D (.STL, .OBJ, .STEP) hoặc chỉ mới có ý tưởng phác thảo?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
              2K Maker hỗ trợ kiểm tra file 3D, tối ưu kết cấu và báo giá chi tiết trong vòng 15 phút.
            </p>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="flex-shrink-0 px-7 py-3.5 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#0A42A1] font-black text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Gửi yêu cầu in 3D
          </button>
        </div>

      </div>

      {/* Modal Detail */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrderNow={(p) => {
          setSelectedProduct(null);
          onOrderProduct(p);
        }}
        phone={phone}
        zaloUrl={zaloUrl}
      />
    </section>
  );
};
