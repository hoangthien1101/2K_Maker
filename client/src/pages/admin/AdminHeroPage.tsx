import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { HeroContent } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { useToast } from '../../context/ToastContext';
import { Save, Sparkles, Loader2, RefreshCw } from 'lucide-react';

export const AdminHeroPage: React.FC = () => {
  const { success, error } = useToast();
  const [heroData, setHeroData] = useState<Partial<HeroContent>>({
    slogan: 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.',
    title: 'Dịch vụ thiết kế và in 3D theo yêu cầu chất lượng cao',
    description: '2K Maker mang công nghệ in 3D hiện đại đến gần hơn với mọi người. Chuyên nhận in móc khóa, phụ kiện, mô hình nhân vật và mascot độc bản với mức chi phí hợp lý nhất.',
    ctaText: 'KHÁM PHÁ SẢN PHẨM',
    ctaLink: '#products',
    bannerImage: '',
    logoImage: '',
    badgeText: 'CÔNG NGHỆ IN 3D HIỆN ĐẠI – ĐỘ CHI TIẾT CAO',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchHero = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getHero();
      if (res.data) {
        setHeroData(res.data);
      }
    } catch (err: any) {
      error('Không thể tải thông tin Hero');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await contentService.updateHero(heroData);
      success('Đã lưu thay đổi Hero thành công! Nhấn "Xuất bản Website" để cập nhật ra Landing Page.');
    } catch (err: any) {
      error(err.message || 'Lỗi khi lưu Hero');
    } finally {
      setIsSaving(false);
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
        title="Quản Lý Hero / Banner Mở Đầu"
        description="Chỉnh sửa Slogan thương hiệu 2K MAKER, tiêu đề chính, mô tả dịch vụ, ảnh đại diện và nút hành động CTA"
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Main Content Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-extrabold text-navy-900">
                Thông Điệp Thương Hiệu & Tiêu Đề
              </h3>
            </div>

            {/* Slogan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Slogan Thương Hiệu (Chữ in hoa nổi bật) *
              </label>
              <input
                type="text"
                required
                value={heroData.slogan || ''}
                onChange={(e) => setHeroData({ ...heroData, slogan: e.target.value })}
                placeholder="BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-bold text-navy-900"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Slogan cốt lõi của 2K Maker: BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.
              </span>
            </div>

            {/* Hero Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tiêu Đề Phụ (Sub-title) *
              </label>
              <input
                type="text"
                required
                value={heroData.title || ''}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Dịch vụ thiết kế và in 3D theo yêu cầu..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm text-slate-800"
              />
            </div>

            {/* Badge Text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Thẻ Nhãn Nổi Bật (Badge Text)
              </label>
              <input
                type="text"
                value={heroData.badgeText || ''}
                onChange={(e) => setHeroData({ ...heroData, badgeText: e.target.value })}
                placeholder="CÔNG NGHỆ IN 3D HIỆN ĐẠI – ĐỘ CHI TIẾT CAO"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Đoạn Mô Tả Dịch Vụ In 3D *
              </label>
              <textarea
                rows={3}
                required
                value={heroData.description || ''}
                onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                placeholder="Mô tả tóm tắt thế mạnh, vật liệu và khả năng in 3D..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs text-slate-800 leading-relaxed"
              />
            </div>

            {/* CTA Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tên Nút Hành Động (CTA Button)
                </label>
                <input
                  type="text"
                  value={heroData.ctaText || ''}
                  onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                  placeholder="KHÁM PHÁ SẢN PHẨM"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Đường Dẫn Cuộn (Target Section ID)
                </label>
                <input
                  type="text"
                  value={heroData.ctaLink || ''}
                  onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
                  placeholder="#products hoặc #contact"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Media Images Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <h3 className="text-base font-extrabold text-navy-900 pb-4 border-b border-slate-100">
              Hình Ảnh Banner & Logo Thương Hiệu
            </h3>

            {/* Banner Image Uploader */}
            <ImageUploader
              label="Hình Ảnh Trưng Bày Hero 3D (Kích thước lớn nổi bật)"
              value={heroData.bannerImage || ''}
              onChange={(url) => setHeroData({ ...heroData, bannerImage: url as string })}
              helperText="Tải lên ảnh mẫu in 3D hoàn thiện hoặc poster sắc nét độ phân giải cao"
            />

            {/* Logo Image Uploader */}
            <ImageUploader
              label="Logo 2K MAKER (Để trống nếu dùng logo mặc định)"
              value={heroData.logoImage || ''}
              onChange={(url) => setHeroData({ ...heroData, logoImage: url as string })}
              helperText="Logo định dạng PNG nền trong suốt hoặc SVG"
            />
          </div>

          {/* Bottom Action Submit Button */}
          <div className="flex items-center justify-end gap-3 sticky bottom-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
            <button
              type="button"
              onClick={fetchHero}
              className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Khôi phục</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-7 py-3 rounded-xl bg-navy-900 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              {isSaving ? (
                <span>Đang lưu...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi Bản Nháp</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

