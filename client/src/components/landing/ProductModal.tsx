import React, { useState } from 'react';
import { Product } from '../../types';
import { X, Layers, Maximize2, ShieldCheck, MessageSquareShare, PhoneCall, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderNow: (product: Product) => void;
  phone?: string;
  zaloUrl?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOrderNow,
  phone = '0988 234 567',
  zaloUrl = 'https://zalo.me/0988234567',
}) => {
  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'];

  const [activeImage, setActiveImage] = useState<string>(images[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F1638]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#D9E8FF] overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#EEF4FF] text-slate-600 hover:text-[#0A42A1] flex items-center justify-center shadow-md transition-all focus:outline-none border border-[#D9E8FF]"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-[#F8FAFF] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D9E8FF]">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#D9E8FF] mb-4">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-lg bg-[#223176]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {product.category?.name || 'In 3D'}
                </span>
              </div>
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === img
                        ? 'border-[#0A42A1] shadow-md scale-95'
                        : 'border-[#D9E8FF] hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#0A42A1] uppercase tracking-wider">
                  {product.category?.name || 'Sản phẩm 3D'}
                </span>
                {product.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#EEF4FF] text-[#0A42A1] border border-[#D9E8FF]">
                    <Sparkles className="w-3 h-3 text-[#0A42A1]" />
                    Được yêu thích
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-[#223176] tracking-tight mb-3">
                {product.title}
              </h2>

              {/* Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                {product.shortDescription}
              </p>

              {/* Detailed Specs Box */}
              <div className="space-y-3 bg-[#F8FAFF] p-4 rounded-2xl border border-[#D9E8FF] mb-6 text-xs text-slate-700">
                {product.material && (
                  <div className="flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-[#0A42A1] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#223176]">Vật liệu in: </span>
                      <span>{product.material}</span>
                    </div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-start gap-2.5">
                    <Maximize2 className="w-4 h-4 text-[#0A42A1] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#223176]">Kích thước tham khảo: </span>
                      <span>{product.dimensions}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0A42A1] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#223176]">Cá nhân hóa: </span>
                    <span>Tùy chỉnh kích thước, màu sắc, khắc tên/logo theo yêu cầu riêng.</span>
                  </div>
                </div>

                {product.customNote && (
                  <div className="pt-2 border-t border-[#D9E8FF] text-slate-500 italic">
                    * {product.customNote}
                  </div>
                )}
              </div>

              {product.fullDescription && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Mô tả chi tiết &amp; Quy cách chế tác
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {product.fullDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#D9E8FF]">
              <button
                onClick={() => {
                  onClose();
                  onOrderNow(product);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-sm tracking-wide shadow-md shadow-[#0A42A1]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Liên hệ đặt in mẫu này</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-4 rounded-xl border border-[#D9E8FF] hover:border-[#0A42A1] text-[#223176] hover:text-[#0A42A1] text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-[#EEF4FF]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#0A42A1]" />
                  <span>Hotline: {phone}</span>
                </a>

                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#EEF4FF] hover:bg-[#D9E8FF] text-[#0A42A1] text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors border border-[#D9E8FF]"
                >
                  <span>Chat Zalo tư vấn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
