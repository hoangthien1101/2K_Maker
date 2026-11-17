import React from 'react';
import { Layers, ArrowUp, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { ContactInfo } from '../../types';
import { scrollToSection } from '../../hooks/useLenis';

interface FooterProps {
  contactInfo: ContactInfo | null;
  slogan?: string;
  logoImage?: string;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  slogan = 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.',
  logoImage,
}) => {
  const phone = contactInfo?.phone || '0988 234 567';
  const email = contactInfo?.email || 'contact@2kmaker.vn';
  const address = contactInfo?.address || 'Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội';
  const facebookUrl = contactInfo?.facebookUrl || 'https://facebook.com/2kmaker.3dprint';
  const tiktokUrl = contactInfo?.tiktokUrl || 'https://tiktok.com/@2kmaker.official';
  const zaloUrl = contactInfo?.zaloUrl || 'https://zalo.me/0988234567';

  const scrollToTop = () => {
    scrollToSection('home');
  };

  return (
    <footer className="bg-[#223176] text-slate-200 pt-16 pb-12 border-t border-[#0A42A1]/40 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Studio Freight Giant Slogan Header Statement */}
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6FA8FF] block mb-2">
              2K MAKER • 3D PRINTING BRAND
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
              {slogan}
            </h2>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex-shrink-0 w-fit"
          >
            Liên hệ tư vấn
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {logoImage ? (
                <img src={logoImage} alt="2K MAKER Logo" className="h-9 w-auto object-contain" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0A42A1] to-[#6FA8FF] flex items-center justify-center text-white shadow-md">
                  <Layers className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
              <span className="text-xl font-black tracking-tight text-white">
                2K MAKER
              </span>
            </div>

            <p className="text-sm font-bold text-[#6FA8FF] uppercase tracking-wider">
              {slogan}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Cửa hàng dịch vụ thiết kế và in 3D theo yêu cầu chuyên nghiệp. Biến mọi ý tưởng cá nhân và dự án thành sản phẩm vật lý hữu hình với chi phí tối ưu nhất.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                Fb
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                Tk
              </a>
              <a
                href={zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Zalo"
              >
                Zl
              </a>
            </div>
          </div>

          {/* Quick Nav Links Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">
              Điều Hướng Nhanh
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-[#6FA8FF] transition-colors"
                >
                  Trang chủ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-[#6FA8FF] transition-colors"
                >
                  Giới thiệu (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="hover:text-[#6FA8FF] transition-colors"
                >
                  Sản phẩm in 3D (Products)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-choose-us')}
                  className="hover:text-[#6FA8FF] transition-colors"
                >
                  Tại sao chọn chúng tôi (Why Choose Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-[#6FA8FF] transition-colors"
                >
                  Liên hệ &amp; Tư vấn (Contact)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#6FA8FF] mt-0.5 flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6FA8FF] flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6FA8FF] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-[#0A42A1]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© {new Date().getFullYear()} 2K MAKER. Tất cả quyền được bảo lưu.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Biến ý tưởng thành sản phẩm 3D với <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white transition-colors flex items-center gap-1 shadow-sm"
              title="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
