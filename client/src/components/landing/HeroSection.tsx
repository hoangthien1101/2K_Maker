import React from 'react';
import { HeroContent } from '../../types';
import { ArrowDown, Sparkles, Box, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  content: HeroContent | null;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onExploreClick,
  onContactClick,
}) => {
  const slogan = content?.slogan || 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.';
  const title = content?.title || 'Dịch vụ thiết kế và in 3D theo yêu cầu chất lượng cao';
  const description =
    content?.description ||
    '2K Maker mang công nghệ in 3D hiện đại đến gần hơn với mọi người. Chuyên nhận in móc khóa, phụ kiện cá nhân, mô hình nhân vật và mascot độc bản với mức chi phí hợp lý nhất.';
  const ctaText = content?.ctaText || 'KHÁM PHÁ SẢN PHẨM';
  const bannerImage =
    content?.bannerImage ||
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80';
  const badgeText = content?.badgeText || 'CÔNG NGHỆ IN 3D HIỆN ĐẠI – ĐỘ CHI TIẾT CAO';

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFF] to-[#EEF4FF]"
    >
      {/* Background Subtle Gradient Glows (Original Palette) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-[#0A42A1]/10 via-[#6FA8FF]/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#EEF4FF] blur-2xl pointer-events-none rounded-full" />

      {/* Grid line pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0A42A1 1px, transparent 1px), linear-gradient(90deg, #0A42A1 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">

        {/* Studio Freight Technical Meta Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#D9E8FF]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0A42A1] font-bold">
              [ 2K MAKER STUDIO • 3D PRINT ON DEMAND ]
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
            <span>RES: 0.12MM</span>
            <span>•</span>
            <span>FDM &amp; SLA RESIN</span>
            <span>•</span>
            <span>HANOI, VN</span>
          </div>
        </div>

        {/* Main 2-Column Split Layout (Studio Freight Bold Editorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* LEFT: Typography & Headline Content (45% - 48%) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left z-10">

            {/* Tech Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D9E8FF] text-[#0A42A1] text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0A42A1]" />
              <span>{badgeText}</span>
            </div>

            {/* Giant Editorial Typography Group */}
            <div className="w-full max-w-xl mb-6">
              {/* Brand Name Line */}
              <div className="mb-2">
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A42A1]">
                  2K MAKER
                </span>
              </div>

              {/* Slogan Lines with Clear Visual Hierarchy */}
              <div className="space-y-1 mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#223176] tracking-tight leading-tight">
                  BIẾN Ý TƯỞNG THÀNH
                </h1>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A42A1] tracking-tight leading-tight">
                  SẢN PHẨM 3D.
                </div>
              </div>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base font-semibold text-[#223176]/85 mb-3 tracking-wide">
                {title}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                {description}
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#0A42A1]/25 hover:shadow-lg hover:shadow-[#0A42A1]/35 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 group"
              >
                <span>{ctaText}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-[#EEF4FF] border-2 border-[#D9E8FF] hover:border-[#0A42A1] text-[#223176] hover:text-[#0A42A1] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Gửi Ý Tưởng Ngay</span>
                <ArrowUpRight className="w-4 h-4 text-[#0A42A1]" />
              </button>
            </div>

            {/* Horizontal Mini Highlights Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#D9E8FF] w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-[#223176]">0.12mm</span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-500">Lớp in siêu mịn</span>
              </div>
              <div className="flex flex-col border-l border-[#D9E8FF] pl-3 sm:pl-5">
                <span className="text-xl sm:text-2xl font-black text-[#0A42A1]">100%</span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-500">Cá nhân hóa mẫu</span>
              </div>
              <div className="flex flex-col border-l border-[#D9E8FF] pl-3 sm:pl-5">
                <span className="text-xl sm:text-2xl font-black text-[#223176]">24 - 48h</span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-500">Giao hàng siêu tốc</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Large Visual Showcase Banner (52% - 55%) */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full">
            <div className="relative w-full">
              {/* Outer Decorative Gradient Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0A42A1]/20 via-[#6FA8FF]/20 to-transparent rounded-[2.5rem] blur-2xl -rotate-1 pointer-events-none" />

              {/* Main Expanded Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white/80 backdrop-blur-sm group">
                <div className="w-full h-[360px] sm:h-[460px] md:h-[500px] lg:h-[520px] xl:h-[560px] relative overflow-hidden bg-slate-100">
                  <img
                    src={bannerImage}
                    alt="2K MAKER 3D Printing Showcase"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle Image Bottom Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#223176]/80 via-[#223176]/15 to-transparent pointer-events-none" />
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0A42A1] text-white flex items-center justify-center font-bold shadow-md shadow-[#0A42A1]/20 flex-shrink-0">
                      <Box className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#223176] uppercase tracking-wide">
                        Sản phẩm in 3D hoàn thiện độc bản
                      </h4>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#0A42A1]">
                        Công nghệ FDM &amp; SLA Resin • Độ bền cơ học cao
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-[#EEF4FF] text-[#0A42A1] text-[11px] font-extrabold uppercase tracking-wider border border-[#D9E8FF]">
                    2K MAKER
                  </span>
                </div>
              </div>

              {/* Floating Pill Badge 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-white py-2 px-3.5 rounded-2xl shadow-card border border-[#D9E8FF] flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] text-[#0A42A1] flex items-center justify-center font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Độ nét cao</div>
                  <div className="text-xs font-extrabold text-[#223176]">FDM &amp; SLA Resin 8K</div>
                </div>
              </div>

              {/* Floating Pill Badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 bg-white py-2 px-3.5 rounded-2xl shadow-card border border-[#D9E8FF] flex items-center gap-2.5 z-20 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Tiêu chuẩn</div>
                  <div className="text-xs font-extrabold text-[#223176]">Chuẩn mẫu thiết kế 100%</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Studio Freight Running Marquee Ticker */}
        <div className="mt-16 pt-8 border-t border-[#D9E8FF] overflow-hidden">
          <div className="marquee-track">
            {[...Array(2)].flatMap(() =>
              ['IN 3D THEO YÊU CẦU', '✦', 'FDM & SLA RESIN 8K', '✦', 'ĐỘ CHÍNH XÁC 0.12MM', '✦', 'GIAO HÀNG 24–48H', '✦', 'CÁ NHÂN HÓA 100%', '✦', 'MASCOT & PHỤ KIỆN', '✦']
            ).map((word, i) => (
              <span
                key={i}
                className={`flex-shrink-0 px-6 text-xs font-bold tracking-widest uppercase ${
                  word === '✦' ? 'text-[#0A42A1]' : 'text-[#223176]/50'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
