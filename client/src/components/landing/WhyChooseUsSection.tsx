import React from 'react';
import { WhyChooseUsItem } from '../../types';
import { Flame, Layers, BadgePercent, Wrench, Check, Sparkles } from 'lucide-react';

interface WhyChooseUsSectionProps {
  items: WhyChooseUsItem[];
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ items }) => {
  const defaultItems: WhyChooseUsItem[] = [
    {
      id: 1,
      number: '01',
      tag: 'UNIQUE',
      title: 'ĐỘC ĐÁO',
      description: 'Sản phẩm được tạo ra từ ý tưởng riêng, mang dấu ấn cá nhân và không bị giới hạn bởi những mẫu có sẵn.',
      icon: 'Flame',
      sortOrder: 1,
      isDraft: false,
    },
    {
      id: 2,
      number: '02',
      tag: 'DIVERSE',
      title: 'ĐA DẠNG',
      description: 'Từ móc khóa, phụ kiện nhỏ đến mô hình nhân vật và mascot, đáp ứng nhiều nhu cầu sử dụng khác nhau.',
      icon: 'Layers',
      sortOrder: 2,
      isDraft: false,
    },
    {
      id: 3,
      number: '03',
      tag: 'AFFORDABLE',
      title: 'GIÁ CẢ HỢP LÝ',
      description: 'Mức giá dễ tiếp cận, có nhiều lựa chọn phù hợp với kích thước, độ phức tạp và ngân sách của khách hàng.',
      icon: 'BadgePercent',
      sortOrder: 3,
      isDraft: false,
    },
    {
      id: 4,
      number: '04',
      tag: 'MADE TO ORDER',
      title: 'SẢN XUẤT THEO YÊU CẦU',
      description: 'Tiếp nhận ý tưởng và yêu cầu riêng, tư vấn phương án thực hiện để tạo ra sản phẩm phù hợp với mong muốn của khách hàng.',
      icon: 'Wrench',
      sortOrder: 4,
      isDraft: false,
    },
  ];

  const cards = items && items.length > 0 ? items : defaultItems;

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame':
      case 'Unique':
        return <Flame className="w-6 h-6 stroke-[2]" />;
      case 'Layers':
      case 'Diverse':
        return <Layers className="w-6 h-6 stroke-[2]" />;
      case 'BadgePercent':
      case 'Affordable':
        return <BadgePercent className="w-6 h-6 stroke-[2]" />;
      case 'Wrench':
      case 'MadeToOrder':
        return <Wrench className="w-6 h-6 stroke-[2]" />;
      default:
        return <Sparkles className="w-6 h-6 stroke-[2]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-[#D9E8FF]">
      {/* Background accents */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EEF4FF] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#0A42A1] tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D9E8FF] inline-block mb-3.5">
            WHY CHOOSE 2K MAKER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#223176] tracking-tight leading-tight mb-4">
            TẠI SAO CHỌN 2K MAKER?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Không chỉ đơn thuần là in 3D, chúng tôi mang đến cơ hội biến những ý tưởng riêng thành sản phẩm thực tế.
          </p>
        </div>

        {/* 4 Cards Grid (Studio Freight Numbered Editorial Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white border border-[#D9E8FF] hover:border-[#0A42A1] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
            >
              <div>
                {/* Header Row: Icon & Sequential Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] text-[#0A42A1] border border-[#D9E8FF] flex items-center justify-center group-hover:bg-[#0A42A1] group-hover:text-white transition-colors duration-300 shadow-xs">
                    {renderIcon(item.icon)}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-[#D9E8FF] transition-colors">
                    {item.number || `0${index + 1}`}
                  </span>
                </div>

                {/* Subtag & Title */}
                <div className="mb-3">
                  <span className="text-[11px] font-extrabold tracking-widest text-[#0A42A1] uppercase block mb-1">
                    {item.tag || `ITEM 0${index + 1}`}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#223176] group-hover:text-[#0A42A1] transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="pt-6 mt-6 border-t border-[#D9E8FF]/80">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-[#223176] transition-colors">
                  <Check className="w-3.5 h-3.5 text-[#0A42A1]" />
                  <span>Tiêu chuẩn chất lượng 2K</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Freight Style Marquee Ticker */}
        <div className="mt-20 overflow-hidden py-6 border-y border-[#D9E8FF]">
          <div className="marquee-track">
            {[...Array(2)].flatMap(() =>
              ['IN 3D THEO YÊU CẦU', '✦', 'FDM & SLA RESIN', '✦', 'ĐỘ CHÍNH XÁC 0.12MM', '✦', 'GIAO HÀNG 24–48H', '✦', 'CÁ NHÂN HÓA 100%', '✦', 'MASCOT ĐỘC BẢN', '✦']
            ).map((word, i) => (
              <span
                key={i}
                className={`flex-shrink-0 px-6 text-sm font-bold tracking-widest uppercase ${
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
