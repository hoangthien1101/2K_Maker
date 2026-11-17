import React, { useState } from 'react';
import { ContactInfo } from '../../types';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo }) => {
  const { success, error } = useToast();

  const title = contactInfo?.title || "LET'S CREATE SOMETHING UNIQUE!";
  const description =
    contactInfo?.description ||
    'Bạn có ý tưởng riêng? Hãy để 2K Maker giúp bạn biến ý tưởng thành sản phẩm 3D thực tế.';
  const phone = contactInfo?.phone || '0988 234 567';
  const email = contactInfo?.email || 'contact@2kmaker.vn';
  const address = contactInfo?.address || 'Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội';
  const facebookUrl = contactInfo?.facebookUrl || 'https://facebook.com/2kmaker.3dprint';
  const tiktokUrl = contactInfo?.tiktokUrl || 'https://tiktok.com/@2kmaker.official';
  const zaloUrl = contactInfo?.zaloUrl || 'https://zalo.me/0988234567';
  const ctaConsultation = contactInfo?.ctaConsultationText || 'LIÊN HỆ TƯ VẤN';
  const ctaOrder = contactInfo?.ctaOrderText || 'ĐẶT HÀNG NGAY';

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    inquiryType: 'consultation' as 'consultation' | 'order',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      error('Vui lòng nhập họ tên và số điện thoại liên hệ');
      return;
    }

    try {
      setIsSubmitting(true);
      await inquiryService.submitInquiry(formData);
      success('Gửi yêu cầu thành công! 2K Maker sẽ liên hệ với bạn trong thời gian sớm nhất.');
      setIsSubmitted(true);
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        inquiryType: 'consultation',
        message: '',
      });
    } catch (err: any) {
      error(err.message || 'Không thể gửi yêu cầu, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F8FAFF] relative overflow-hidden border-t border-[#D9E8FF]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#0A42A1] tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D9E8FF] inline-block mb-3.5">
            CONTACT 2K MAKER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#223176] tracking-tight leading-tight mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#D9E8FF] shadow-card space-y-6">
              <h3 className="text-xl font-extrabold text-[#223176] mb-2">
                Thông Tin Kết Nối Trực Tiếp
              </h3>

              {/* Phone Card */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] border border-[#D9E8FF] flex items-center justify-center flex-shrink-0 text-[#0A42A1]">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-0.5">Hotline &amp; Zalo</span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-base font-extrabold text-[#223176] hover:text-[#0A42A1] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] border border-[#D9E8FF] flex items-center justify-center flex-shrink-0 text-[#0A42A1]">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-0.5">Email liên hệ</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-extrabold text-[#223176] hover:text-[#0A42A1] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] border border-[#D9E8FF] flex items-center justify-center flex-shrink-0 text-[#0A42A1]">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-0.5">Xưởng &amp; Địa chỉ</span>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-6 border-t border-[#D9E8FF] grid grid-cols-2 gap-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-xs shadow-[#0A42A1]/20"
                >
                  {ctaConsultation}
                </a>

                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#223176] hover:bg-[#192458] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#6FA8FF]" />
                  <span>{ctaOrder}</span>
                </a>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#D9E8FF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#223176] uppercase tracking-wider">
                Mạng xã hội:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#EEF4FF] hover:bg-[#D9E8FF] text-[#0A42A1] font-bold text-xs border border-[#D9E8FF] flex items-center gap-1 transition-all"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-[#0A42A1]" />
                </a>

                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#EEF4FF] hover:bg-[#D9E8FF] text-[#0A42A1] font-bold text-xs border border-[#D9E8FF] flex items-center gap-1 transition-all"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3 text-[#0A42A1]" />
                </a>

                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#EEF4FF] hover:bg-[#D9E8FF] text-[#0A42A1] font-bold text-xs border border-[#D9E8FF] flex items-center gap-1 transition-all"
                >
                  <span>Zalo</span>
                  <ExternalLink className="w-3 h-3 text-[#0A42A1]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Order Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#D9E8FF] shadow-card relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-[#223176] tracking-tight">
                    Gửi Yêu Cầu Thiết Kế &amp; Báo Giá In 3D
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Điền thông tin và mô tả ý tưởng, 2K Maker sẽ tư vấn kích thước, vật liệu và phương án in tối ưu nhất.
                  </p>
                </div>
                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#0A42A1] items-center justify-center border border-[#D9E8FF]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#223176]">
                    Cảm ơn bạn đã gửi ý tưởng!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Đội ngũ thiết kế 2K Maker đã nhận được yêu cầu. Chúng tôi sẽ liên hệ lại qua số điện thoại/Zalo trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#EEF4FF] hover:bg-[#D9E8FF] text-[#0A42A1] text-xs font-bold transition-colors mt-2"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Select Request Type */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: 'consultation' })}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                        formData.inquiryType === 'consultation'
                          ? 'bg-[#0A42A1] text-white border-[#0A42A1] shadow-xs'
                          : 'bg-[#F8FAFF] hover:bg-[#EEF4FF] text-[#223176] border-[#D9E8FF]'
                      }`}
                    >
                      Tư vấn ý tưởng mới
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: 'order' })}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                        formData.inquiryType === 'order'
                          ? 'bg-[#0A42A1] text-white border-[#0A42A1] shadow-xs'
                          : 'bg-[#F8FAFF] hover:bg-[#EEF4FF] text-[#223176] border-[#D9E8FF]'
                      }`}
                    >
                      Báo giá in mẫu có sẵn
                    </button>
                  </div>

                  {/* Customer Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="Ví dụ: 0912 345 678"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
                      Email (Tùy chọn)
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="Địa chỉ email để nhận báo giá hoặc file 3D"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
                      Mô tả ý tưởng hoặc yêu cầu in *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả sản phẩm bạn muốn làm: loại sản phẩm (móc khóa, mô hình, phụ kiện), kích thước mong muốn, màu sắc hoặc link file mẫu 3D nếu có..."
                      className="w-full px-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#0A42A1]/25 hover:shadow-lg hover:shadow-[#0A42A1]/35 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Đang gửi thông tin...</span>
                    ) : (
                      <>
                        <span>Gửi Yêu Cầu Ngay</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
