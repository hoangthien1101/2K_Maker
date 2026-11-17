import React from 'react';
import { AboutContent, CoreValue } from '../../types';
import { Sparkles, Fingerprint, HeartHandshake, Compass } from 'lucide-react';

interface AboutSectionProps {
  content: AboutContent | null;
  coreValues: CoreValue[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content, coreValues }) => {
  const sectionTitle = content?.sectionTitle || 'ABOUT 2K MAKER';
  const heading = content?.heading || '2K MAKER – BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D';
  const p1 = content?.introParagraph1 || 'Mỗi ý tưởng đều xứng đáng có một phiên bản của riêng mình.';
  const p2 =
    content?.introParagraph2 ||
    '2K Maker là cửa hàng chuyên nhận in 3D theo yêu cầu, từ móc khóa, phụ kiện cá nhân đến mô hình nhân vật và mascot độc đáo.';
  const p3 =
    content?.introParagraph3 ||
    'Với mong muốn đưa công nghệ in 3D đến gần hơn với mọi người, 2K Maker giúp khách hàng biến những ý tưởng sáng tạo thành sản phẩm thực tế với mức chi phí hợp lý.';
  const storyTitle = content?.storyTitle || 'Câu chuyện thương hiệu';
  const storyContent =
    content?.storyContent ||
    'Xuất phát từ niềm đam mê sáng tạo và mong muốn tạo nên những sản phẩm khác biệt, 2K Maker ra đời với mục tiêu biến những ý tưởng độc đáo thành những món đồ hữu hình, mang dấu ấn riêng của mỗi khách hàng.';
  const illustrationImage =
    content?.illustrationImage ||
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80';

  const defaultValues: CoreValue[] = [
    {
      id: 1,
      title: 'CREATIVITY – Sáng tạo',
      description: 'Khuyến khích những ý tưởng mới lạ và không giới hạn sự sáng tạo.',
      icon: 'Sparkles',
      sortOrder: 1,
      isDraft: false,
    },
    {
      id: 2,
      title: 'PERSONALIZATION – Cá nhân hóa',
      description: 'Mỗi sản phẩm mang dấu ấn và phong cách riêng của khách hàng.',
      icon: 'Fingerprint',
      sortOrder: 2,
      isDraft: false,
    },
    {
      id: 3,
      title: 'ACCESSIBILITY – Dễ tiếp cận',
      description: 'Đưa sản phẩm in 3D đến gần hơn với mọi người bằng mức giá hợp lý.',
      icon: 'HeartHandshake',
      sortOrder: 3,
      isDraft: false,
    },
  ];

  const valuesList = coreValues && coreValues.length > 0 ? coreValues : defaultValues;

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Fingerprint':
        return <Fingerprint className="w-6 h-6 stroke-[2]" />;
      case 'HeartHandshake':
      case 'Smile':
        return <HeartHandshake className="w-6 h-6 stroke-[2]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 stroke-[2]" />;
      default:
        return <Sparkles className="w-6 h-6 stroke-[2]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-[#D9E8FF]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#0A42A1] tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D9E8FF] inline-block mb-3.5">
            {sectionTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#223176] tracking-tight leading-tight">
            {heading}
          </h2>
        </div>

        {/* Brand Intro & Story Grid (Studio Freight Editorial layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20">

          {/* Left Text: Mission & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#F8FAFF] border border-[#D9E8FF] shadow-xs space-y-4">
              <p className="text-xl sm:text-2xl font-black text-[#223176] leading-snug">
                "{p1}"
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {p2}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {p3}
              </p>
            </div>

            {/* Brand Story Box with Brand Gradient Border */}
            <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#EEF4FF] via-white to-[#F8FAFF] border border-[#D9E8FF] shadow-card">
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0A42A1] text-white flex items-center justify-center font-bold shadow-sm shadow-[#0A42A1]/20">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#223176]">
                  {storyTitle}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed italic text-sm sm:text-base">
                "{storyContent}"
              </p>
            </div>

            {/* Editorial Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#EEF4FF]/50 border border-[#D9E8FF]">
                <div className="text-3xl font-black text-[#0A42A1]">500+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#223176]/70 mt-1">Sản phẩm hoàn thiện</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#EEF4FF]/50 border border-[#D9E8FF]">
                <div className="text-3xl font-black text-[#223176]">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#223176]/70 mt-1">Hài lòng &amp; cá nhân hóa</div>
              </div>
            </div>
          </div>

          {/* Right Image: Studio Crafting Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src={illustrationImage}
                alt="2K MAKER Studio Workshop"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#223176]/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#6FA8FF] block mb-1">
                  Xưởng in &amp; chế tác 3D
                </span>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-white/90">
                  Trang bị hệ thống máy in 3D hiện đại bậc nhất, sẵn sàng đáp ứng mọi đơn hàng từ 01 chiếc đến hàng loạt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Values Cards – Studio Freight Numbered Editorial Cards */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-[#223176] tracking-tight">
              Giá Trị Cốt Lõi (Core Values)
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              3 kim chỉ nam tạo nên bản sắc và sự tin yêu của khách hàng dành cho 2K Maker
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesList.map((val, idx) => (
              <div
                key={val.id || idx}
                className="group relative p-8 rounded-3xl bg-white border border-[#D9E8FF] hover:border-[#0A42A1] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] text-[#0A42A1] border border-[#D9E8FF] flex items-center justify-center group-hover:bg-[#0A42A1] group-hover:text-white transition-colors duration-300 shadow-xs">
                    {renderIcon(val.icon)}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-[#D9E8FF] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-[#223176] group-hover:text-[#0A42A1] transition-colors mb-3">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="w-12 h-1 bg-[#EEF4FF] group-hover:w-full group-hover:bg-[#0A42A1] rounded-full transition-all duration-300 mt-6" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
