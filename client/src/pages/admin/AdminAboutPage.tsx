import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { AboutContent, CoreValue } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import { Save, Plus, Edit2, Trash2, Sparkles, Loader2, Info } from 'lucide-react';

export const AdminAboutPage: React.FC = () => {
  const { success, error } = useToast();
  const [aboutData, setAboutData] = useState<Partial<AboutContent>>({
    sectionTitle: 'ABOUT 2K MAKER',
    heading: '2K MAKER – BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D',
    introParagraph1: 'Mỗi ý tưởng đều xứng đáng có một phiên bản của riêng mình.',
    introParagraph2: '2K Maker là cửa hàng chuyên nhận in 3D theo yêu cầu, từ móc khóa, phụ kiện cá nhân đến mô hình nhân vật và mascot độc đáo.',
    introParagraph3: 'Với mong muốn đưa công nghệ in 3D đến gần hơn với mọi người, 2K Maker giúp khách hàng biến những ý tưởng sáng tạo thành sản phẩm thực tế với mức chi phí hợp lý.',
    storyTitle: 'Câu chuyện thương hiệu',
    storyContent: 'Xuất phát từ niềm đam mê sáng tạo và mong muốn tạo nên những sản phẩm khác biệt, 2K Maker ra đời với mục tiêu biến những ý tưởng độc đáo thành những món đồ hữu hình, mang dấu ấn riêng của mỗi khách hàng.',
    illustrationImage: '',
  });

  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal State for Core Value Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<Partial<CoreValue> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchAbout = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getAbout();
      if (res.data) {
        setAboutData(res.data);
        if (res.data.coreValues) {
          setCoreValues(res.data.coreValues);
        }
      }
    } catch (err) {
      error('Không thể tải thông tin About Us');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await contentService.updateAbout(aboutData);
      success('Đã cập nhật nội dung About Us thành công (Bản nháp)!');
    } catch (err: any) {
      error(err.message || 'Lỗi lưu thông tin');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddValue = () => {
    setEditingValue({
      title: '',
      description: '',
      icon: 'Sparkles',
      sortOrder: coreValues.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditValue = (val: CoreValue) => {
    setEditingValue({ ...val });
    setIsModalOpen(true);
  };

  const handleSaveValue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValue?.title?.trim() || !editingValue?.description?.trim()) {
      error('Vui lòng nhập tiêu đề và mô tả giá trị cốt lõi');
      return;
    }

    try {
      if (editingValue.id) {
        await contentService.updateCoreValue(editingValue.id, editingValue);
        success('Cập nhật giá trị cốt lõi thành công');
      } else {
        await contentService.createCoreValue(editingValue);
        success('Thêm giá trị cốt lõi mới thành công');
      }
      setIsModalOpen(false);
      fetchAbout();
    } catch (err: any) {
      error(err.message || 'Lỗi thao tác giá trị cốt lõi');
    }
  };

  const handleDeleteValue = async () => {
    if (!deleteTargetId) return;
    try {
      await contentService.deleteCoreValue(deleteTargetId);
      success('Đã xóa giá trị cốt lõi');
      setDeleteTargetId(null);
      fetchAbout();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xóa');
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
        title="Quản Lý Giới Thiệu (About Us)"
        description="Chỉnh sửa câu chuyện thương hiệu 2K Maker, định hướng dịch vụ in 3D và các giá trị cốt lõi"
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl space-y-8">
        <form onSubmit={handleSaveAbout} className="space-y-8">
          {/* Section Headings Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Info className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-extrabold text-navy-900">
                Tiêu Đề & Lời Mở Đầu Giới Thiệu
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tiêu Đề Nhãn Section *
                </label>
                <input
                  type="text"
                  required
                  value={aboutData.sectionTitle || ''}
                  onChange={(e) => setAboutData({ ...aboutData, sectionTitle: e.target.value })}
                  placeholder="ABOUT 2K MAKER"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tiêu Đề Chính Section *
                </label>
                <input
                  type="text"
                  required
                  value={aboutData.heading || ''}
                  onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
                  placeholder="2K MAKER – BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs font-bold text-navy-900"
                />
              </div>
            </div>

            {/* Intro Paragraph 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Thông Điệp Mở Đầu (Đoạn 1 - Nổi bật) *
              </label>
              <input
                type="text"
                required
                value={aboutData.introParagraph1 || ''}
                onChange={(e) => setAboutData({ ...aboutData, introParagraph1: e.target.value })}
                placeholder="Mỗi ý tưởng đều xứng đáng có một phiên bản của riêng mình."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-semibold text-slate-800"
              />
            </div>

            {/* Intro Paragraph 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mô Tả Lĩnh Vực Hoạt Động (Đoạn 2) *
              </label>
              <textarea
                rows={2}
                required
                value={aboutData.introParagraph2 || ''}
                onChange={(e) => setAboutData({ ...aboutData, introParagraph2: e.target.value })}
                placeholder="2K Maker là cửa hàng chuyên nhận in 3D theo yêu cầu..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs text-slate-800 leading-relaxed"
              />
            </div>

            {/* Intro Paragraph 3 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tầm Nhìn & Khả Năng Tiếp Cận (Đoạn 3) *
              </label>
              <textarea
                rows={2}
                required
                value={aboutData.introParagraph3 || ''}
                onChange={(e) => setAboutData({ ...aboutData, introParagraph3: e.target.value })}
                placeholder="Với mong muốn đưa công nghệ in 3D đến gần hơn với mọi người..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs text-slate-800 leading-relaxed"
              />
            </div>
          </div>

          {/* Brand Story Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
            <h3 className="text-base font-extrabold text-navy-900 pb-4 border-b border-slate-100">
              Câu Chuyện Thương Hiệu (Brand Story)
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tiêu Đề Khối Câu Chuyện *
              </label>
              <input
                type="text"
                required
                value={aboutData.storyTitle || ''}
                onChange={(e) => setAboutData({ ...aboutData, storyTitle: e.target.value })}
                placeholder="Câu chuyện thương hiệu"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs font-bold text-navy-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nội Dung Câu Chuyện Thương Hiệu *
              </label>
              <textarea
                rows={3}
                required
                value={aboutData.storyContent || ''}
                onChange={(e) => setAboutData({ ...aboutData, storyContent: e.target.value })}
                placeholder="Xuất phát từ niềm đam mê sáng tạo..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-xs text-slate-800 leading-relaxed"
              />
            </div>

            {/* Illustration Image Uploader */}
            <ImageUploader
              label="Hình Ảnh Minh Họa Xưởng In & Chế Tác"
              value={aboutData.illustrationImage || ''}
              onChange={(url) => setAboutData({ ...aboutData, illustrationImage: url as string })}
              helperText="Tải lên ảnh máy in 3D hoạt động hoặc không gian làm việc của 2K Maker"
            />
          </div>

          {/* Submit About Content Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              {isSaving ? <span>Đang lưu...</span> : <><Save className="w-4 h-4" /><span>Lưu Thông Tin About Us</span></>}
            </button>
          </div>
        </form>

        {/* Core Values Management Section */}
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-navy-900">
                Các Thẻ Giá Trị Cốt Lõi (Core Values)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quản lý các tiêu chí định hướng: Sáng tạo, Cá nhân hóa, Dễ tiếp cận
              </p>
            </div>

            <button
              onClick={handleOpenAddValue}
              className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm giá trị cốt lõi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-brand-100 text-brand-700 uppercase">
                      Thứ tự: {val.sortOrder}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditValue(val)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(val.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-navy-900 mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add/Edit Core Value */}
      {isModalOpen && editingValue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-navy-900 mb-4">
              {editingValue.id ? 'Chỉnh Sửa Giá Trị Cốt Lõi' : 'Thêm Giá Trị Cốt Lõi Mới'}
            </h3>

            <form onSubmit={handleSaveValue} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tiêu Đề (Ví dụ: CREATIVITY – Sáng tạo) *
                </label>
                <input
                  type="text"
                  required
                  value={editingValue.title || ''}
                  onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mô Tả Chi Tiết *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingValue.description || ''}
                  onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Icon Đại Diện
                  </label>
                  <select
                    value={editingValue.icon || 'Sparkles'}
                    onChange={(e) => setEditingValue({ ...editingValue, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Sparkles">Sparkles (Sáng tạo)</option>
                    <option value="Fingerprint">Fingerprint (Cá nhân hóa)</option>
                    <option value="HeartHandshake">HeartHandshake (Dễ tiếp cận)</option>
                    <option value="Compass">Compass (Định hướng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Thứ Tự Hiển Thị
                  </label>
                  <input
                    type="number"
                    value={editingValue.sortOrder || 1}
                    onChange={(e) => setEditingValue({ ...editingValue, sortOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-brand-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Xóa Giá Trị Cốt Lõi"
        message="Bạn có chắc chắn muốn xóa giá trị này khỏi danh sách giới thiệu?"
        isDangerous
        confirmLabel="Xóa ngay"
        onConfirm={handleDeleteValue}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

