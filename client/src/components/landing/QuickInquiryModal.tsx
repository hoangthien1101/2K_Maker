import React, { useState } from 'react';
import { Product } from '../../types';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuickInquiryModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ product, onClose }) => {
  const { success, error } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      error('Vui lòng nhập họ tên và số điện thoại');
      return;
    }

    try {
      setIsSubmitting(true);
      await inquiryService.submitInquiry({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        productName: product.title,
        inquiryType: 'order',
        message: `Khách hàng quan tâm đặt in mẫu: ${product.title}. Yêu cầu tùy biến: ${customNote || 'Theo mẫu chuẩn của shop'}`,
      });

      success('Yêu cầu đặt in mẫu đã được gửi đến 2K Maker!');
      setIsDone(true);
    } catch (err: any) {
      error(err.message || 'Lỗi gửi yêu cầu, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#0F1638]/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#D9E8FF] overflow-hidden z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-[#0A42A1] w-9 h-9 rounded-full bg-[#EEF4FF] hover:bg-[#D9E8FF] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#223176]">
              Đã gửi yêu cầu đặt in thành công!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              2K Maker sẽ liên hệ số điện thoại <span className="font-bold text-[#0A42A1]">{customerPhone}</span> để chốt thông số, màu sắc và gửi bạn xem trước bản in 3D.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A42A1] text-white font-bold text-xs hover:bg-[#083582]"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#0A42A1] uppercase tracking-wider">
                Đặt in theo yêu cầu
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#0A42A1]" />
            </div>

            <h3 className="text-xl font-black text-[#223176] tracking-tight mb-4">
              Liên Hệ Đặt In Sản Phẩm
            </h3>

            {/* Selected Product Highlight Card */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFF] border border-[#D9E8FF] mb-5">
              <img
                src={product.thumbnail || (product.images?.[0] ?? '')}
                alt={product.title}
                className="w-14 h-14 rounded-xl object-cover border border-[#D9E8FF]"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase text-[#0A42A1] block">
                  {product.category?.name || 'In 3D'}
                </span>
                <h4 className="text-xs font-bold text-[#223176] truncate">
                  {product.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {product.material || 'Vật liệu in chất lượng cao'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#223176] uppercase mb-1">
                  Họ và tên bạn *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Nam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] text-xs text-[#223176]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#223176] uppercase mb-1">
                  Số điện thoại / Zalo *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ví dụ: 0987 654 321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] text-xs text-[#223176]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#223176] uppercase mb-1">
                  Email (nhận thiết kế xem trước)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] text-xs text-[#223176]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#223176] uppercase mb-1">
                  Ghi chú tùy biến (màu sắc, khắc tên, kích cỡ riêng)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ví dụ: Khắc tên '2K Maker' lên móc khóa, phối màu xanh dương..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] text-xs text-[#223176]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#0A42A1]/20 transition-colors flex items-center justify-center gap-1.5 active:scale-98"
              >
                {isSubmitting ? (
                  <span>Đang gửi...</span>
                ) : (
                  <>
                    <span>Gửi Yêu Cầu Đặt Hàng</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
