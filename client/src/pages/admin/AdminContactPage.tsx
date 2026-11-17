import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { ContactInfo } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useToast } from '../../context/ToastContext';
import { Save, Phone, Mail, MapPin, Globe, Loader2, Sparkles } from 'lucide-react';

export const AdminContactPage: React.FC = () => {
  const { success, error } = useToast();
  const [contactData, setContactData] = useState<Partial<ContactInfo>>({
    title: "LET'S CREATE SOMETHING UNIQUE!",
    description: 'Bạn có ý tưởng riêng? Hãy để 2K Maker giúp bạn biến ý tưởng thành sản phẩm 3D thực tế.',
    phone: '0988 234 567',
    email: 'contact@2kmaker.vn',
    address: 'Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội',
    facebookUrl: 'https://facebook.com/2kmaker.3dprint',
    tiktokUrl: 'https://tiktok.com/@2kmaker.official',
    zaloUrl: 'https://zalo.me/0988234567',
    ctaConsultationText: 'LIÊN HỆ TƯ VẤN',
    ctaOrderText: 'ĐẶT HÀNG NGAY',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContact = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getContact();
      if (res.data) {
        setContactData(res.data);
      }
    } catch (err: any) {
      error('Không thể tải thông tin liên hệ');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await contentService.updateContact(contactData);
      success('Đã lưu thông tin liên hệ thành công (Bản nháp)!');
    } catch (err: any) {
      error(err.message || 'Lỗi khi lưu');
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
        title="Quản Lý Thông Tin Liên Hệ (Contact)"
        description="Chỉnh sửa số điện thoại hotline, email, địa chỉ xưởng, các đường dẫn mạng xã hội Facebook, TikTok, Zalo"
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl space-y-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Section Heading & Messages */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <h3 className="text-base font-extrabold text-navy-900 pb-4 border-b border-slate-100">
              Tiêu Đề & Lời Kêu Gọi Liên Hệ
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tiêu Đề Section (Viết hoa hiện đại) *
              </label>
              <input
                type="text"
                required
                value={contactData.title || ''}
                onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                placeholder="LET'S CREATE SOMETHING UNIQUE!"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Đoạn Mô Tả Hướng Dẫn *
              </label>
              <textarea
                rows={2}
                required
                value={contactData.description || ''}
                onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
                placeholder="Bạn có ý tưởng riêng? Hãy để 2K Maker giúp bạn biến ý tưởng thành sản phẩm 3D thực tế."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <h3 className="text-base font-extrabold text-navy-900 pb-4 border-b border-slate-100">
              Thông Tin Kết Nối Trực Tiếp
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Số Điện Thoại Hotline *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={contactData.phone || ''}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="0988 234 567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Tiếp Nhận Bản Vẽ / Báo Giá *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={contactData.email || ''}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="contact@2kmaker.vn"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Địa Chỉ Xưởng In & Văn Phòng *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={contactData.address || ''}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  placeholder="Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Social Channels & CTAs Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <h3 className="text-base font-extrabold text-navy-900 pb-4 border-b border-slate-100">
              Đường Dẫn Mạng Xã Hội (Social Links)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Facebook Fanpage URL
                </label>
                <input
                  type="text"
                  value={contactData.facebookUrl || ''}
                  onChange={(e) => setContactData({ ...contactData, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/2kmaker..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  TikTok Channel URL
                </label>
                <input
                  type="text"
                  value={contactData.tiktokUrl || ''}
                  onChange={(e) => setContactData({ ...contactData, tiktokUrl: e.target.value })}
                  placeholder="https://tiktok.com/@2kmaker..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Zalo Chat URL (zalo.me/...)
                </label>
                <input
                  type="text"
                  value={contactData.zaloUrl || ''}
                  onChange={(e) => setContactData({ ...contactData, zaloUrl: e.target.value })}
                  placeholder="https://zalo.me/0988234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nút CTA Tư Vấn
                </label>
                <input
                  type="text"
                  value={contactData.ctaConsultationText || ''}
                  onChange={(e) =>
                    setContactData({ ...contactData, ctaConsultationText: e.target.value })
                  }
                  placeholder="LIÊN HỆ TƯ VẤN"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nút CTA Đặt Hàng
                </label>
                <input
                  type="text"
                  value={contactData.ctaOrderText || ''}
                  onChange={(e) => setContactData({ ...contactData, ctaOrderText: e.target.value })}
                  placeholder="ĐẶT HÀNG NGAY"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              {isSaving ? <span>Đang lưu...</span> : <><Save className="w-4 h-4" /><span>Lưu Thông Tin Liên Hệ</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

