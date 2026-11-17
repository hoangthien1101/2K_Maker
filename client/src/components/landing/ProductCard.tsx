import React from 'react';
import { Product } from '../../types';
import { Eye, MessageSquareShare, Sparkles, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onOrderNow,
}) => {
  const thumbnail =
    product.thumbnail ||
    (product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white border border-[#D9E8FF] hover:border-[#0A42A1] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      {/* Product Image Frame */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 cursor-pointer"
        onClick={() => onViewDetail(product)}
      >
        <img
          src={thumbnail}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#223176]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#223176] shadow-xs border border-[#D9E8FF]">
            {product.category?.name || 'Sản phẩm 3D'}
          </span>
        </div>

        {/* Featured Tag */}
        {product.isFeatured && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0A42A1] text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-[#6FA8FF]" />
              Nổi bật
            </span>
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-white/95 text-[#223176] text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border border-[#D9E8FF]">
            <Eye className="w-3.5 h-3.5 text-[#0A42A1]" />
            <span>Xem chi tiết</span>
          </div>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          onClick={() => onViewDetail(product)}
          className="text-base font-extrabold text-[#223176] group-hover:text-[#0A42A1] transition-colors line-clamp-1 cursor-pointer mb-2"
          title={product.title}
        >
          {product.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.shortDescription || 'Mẫu thiết kế in 3D theo yêu cầu với vật liệu cao cấp, độ chính xác cao.'}
        </p>

        {/* Material & Feature Spec Tag */}
        {product.material && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#0A42A1] bg-[#EEF4FF] px-2.5 py-1.5 rounded-lg border border-[#D9E8FF] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#0A42A1] flex-shrink-0" />
            <span className="truncate">{product.material}</span>
          </div>
        )}

        {/* Bottom CTA Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#D9E8FF]">
          <button
            onClick={() => onViewDetail(product)}
            className="py-2.5 px-3 rounded-xl border border-[#D9E8FF] hover:border-[#0A42A1] bg-white hover:bg-[#EEF4FF] text-[#223176] hover:text-[#0A42A1] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#0A42A1]" />
            <span>Chi tiết</span>
          </button>

          <button
            onClick={() => onOrderNow(product)}
            className="py-2.5 px-3 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs shadow-[#0A42A1]/20 active:scale-95"
          >
            <MessageSquareShare className="w-3.5 h-3.5" />
            <span>Đặt in 3D</span>
          </button>
        </div>
      </div>
    </div>
  );
};
