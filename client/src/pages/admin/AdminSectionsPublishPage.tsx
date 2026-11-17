import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { SectionSetting, SiteData } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import {
  Rocket,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Loader2,
  ExternalLink,
} from 'lucide-react';

export const AdminSectionsPublishPage: React.FC = () => {
  const { success, error } = useToast();

  const [sections, setSections] = useState<SectionSetting[]>([]);
  const [draftData, setDraftData] = useState<SiteData | null>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [publishedBy, setPublishedBy] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingSections, setIsSavingSections] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [publishNote, setPublishNote] = useState('');

  const fetchPublishState = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getDraftContent();
      if (res.data) {
        setDraftData(res.data);
        if (res.data.sections) {
          const sorted = [...res.data.sections].sort((a, b) => a.sortOrder - b.sortOrder);
          setSections(sorted);
        }
        setLastPublishedAt(res.lastPublishedAt);
        setPublishedBy(res.publishedBy);
      }
    } catch (err: any) {
      error('Không thể tải trạng thái bản thảo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishState();
  }, []);

  // Reorder sections Up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[index - 1];
    newArr[index - 1] = temp;

    // Recalculate sortOrder
    const updated = newArr.map((sec, idx) => ({ ...sec, sortOrder: idx + 1 }));
    setSections(updated);
  };

  // Reorder sections Down
  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[index + 1];
    newArr[index + 1] = temp;

    // Recalculate sortOrder
    const updated = newArr.map((sec, idx) => ({ ...sec, sortOrder: idx + 1 }));
    setSections(updated);
  };

  // Toggle Visibility
  const handleToggleVisibility = (index: number) => {
    const newArr = [...sections];
    newArr[index].isVisible = !newArr[index].isVisible;
    setSections(newArr);
  };

  // Save Sections Order & Visibility
  const handleSaveSections = async () => {
    try {
      setIsSavingSections(true);
      const payload = sections.map((s, idx) => ({
        id: s.id,
        isVisible: s.isVisible,
        sortOrder: idx + 1,
      }));
      await contentService.updateSections(payload);
      success('Đã lưu thứ tự và trạng thái hiển thị của các section!');
    } catch (err: any) {
      error(err.message || 'Lỗi khi lưu cấu hình');
    } finally {
      setIsSavingSections(false);
    }
  };

  // Publish Website
  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const res = await contentService.publishWebsite(publishNote || 'Xuất bản cập nhật mới từ Admin');
      success(res.message);
      setShowPublishDialog(false);
      setPublishNote('');
      fetchPublishState();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xuất bản website');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const formatTime = (iso?: string | null) => {
    if (!iso) return 'Chưa có lượt xuất bản nào';
    const date = new Date(iso);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      <AdminHeader
        title="Quản Lý Giao Diện & Xuất Bản Website"
        description="Bật/tắt các Section, sắp xếp thứ tự hiển thị và xuất bản nội dung cập nhật mới tức thì ra Landing Page"
        onPublishedSuccess={fetchPublishState}
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl space-y-8">
        {/* Publish Status Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Hệ Thống Sẵn Sàng Xuất Bản</span>
            </div>
            <h3 className="text-xl font-black tracking-tight">
              Xuất Bản Trực Tiếp Ra Landing Page (Live Instant Update)
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Tất cả các bản nháp bạn đã sửa (Slogan, Hero, Giới thiệu, Sản phẩm, Why Choose Us, Liên hệ) sẽ lập tức được cập nhật cho khách hàng truy cập mà không cần khởi động lại server.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>Lần xuất bản gần nhất: <strong className="text-white">{formatTime(lastPublishedAt)}</strong> {publishedBy ? `bởi ${publishedBy}` : ''}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/20"
            >
              <Eye className="w-4 h-4 text-brand-300" />
              <span>Xem Landing Page</span>
            </a>

            <button
              onClick={() => setShowPublishDialog(true)}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-navy-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Xuất Bản Website Ngay</span>
            </button>
          </div>
        </div>

        {/* Section Visibility & Reordering Table */}
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-navy-900">
                Thứ Tự & Trạng Thái Hiển Thị Các Section
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kéo chỉnh thứ tự hoặc ẩn bớt các mục không muốn hiển thị trên trang chủ
              </p>
            </div>

            <button
              onClick={handleSaveSections}
              disabled={isSavingSections}
              className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingSections ? 'Đang lưu...' : 'Lưu Thứ Tự Section'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {sections.map((sec, index) => (
              <div
                key={sec.id || sec.sectionKey}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-brand-300 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {/* Position Badge */}
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 font-black text-xs text-navy-900 flex items-center justify-center shadow-xs">
                    {index + 1}
                  </span>

                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-navy-900">
                      {sec.sectionName}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Key: #{sec.sectionKey}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-navy-900 disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Di chuyển lên trên"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === sections.length - 1}
                      className="p-1 text-slate-400 hover:text-navy-900 disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Di chuyển xuống dưới"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toggle Visibility Button */}
                  <button
                    onClick={() => handleToggleVisibility(index)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      sec.isVisible
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {sec.isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Đang hiển thị</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Đang ẩn</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publish Dialog */}
      <div className="p-0">
        <ConfirmDialog
          isOpen={showPublishDialog}
          title="Xác Nhận Xuất Bản Website 2K Maker"
          message="Hệ thống sẽ đồng bộ toàn bộ dữ liệu bạn đã thiết lập (Slogan, Hero, Giới thiệu, Sản phẩm, Why Choose Us, Liên hệ) vào bản xuất bản chính thức. Khách hàng truy cập sẽ nhìn thấy nội dung mới ngay lập tức!"
          confirmLabel="Xuất bản ngay"
          cancelLabel="Hủy"
          onConfirm={handlePublish}
          onCancel={() => setShowPublishDialog(false)}
          isLoading={isPublishing}
        />
      </div>
    </div>
  );
};

