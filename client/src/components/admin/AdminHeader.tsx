import React, { useState } from 'react';
import { Rocket, Eye, ShieldCheck } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { useToast } from '../../context/ToastContext';
import { ConfirmDialog } from './ConfirmDialog';

interface AdminHeaderProps {
  title: string;
  description?: string;
  onPublishedSuccess?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  description,
  onPublishedSuccess,
}) => {
  const { success, error } = useToast();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const res = await contentService.publishWebsite('Xuất bản từ Admin CMS Toolbar');
      success(res.message || 'Xuất bản website thành công!');
      setShowPublishModal(false);
      if (onPublishedSuccess) onPublishedSuccess();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xuất bản website');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-[#D9E8FF] py-4 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#223176] tracking-tight">
              {title}
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#EEF4FF] text-[#0A42A1] border border-[#D9E8FF]">
              <ShieldCheck className="w-3 h-3 text-[#0A42A1]" />
              CMS 2K Maker
            </span>
          </div>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl border border-[#D9E8FF] hover:border-[#0A42A1] bg-white hover:bg-[#EEF4FF] text-[#223176] hover:text-[#0A42A1] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#0A42A1]" />
            <span>Xem Landing Page</span>
          </a>

          <button
            onClick={() => setShowPublishModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#223176] to-[#0A42A1] hover:from-[#192458] hover:to-[#083582] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#0A42A1]/20 transition-all active:scale-95 cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-[#6FA8FF]" />
            <span>Xuất bản Website</span>
          </button>
        </div>
      </header>

      {/* Quick Publish Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showPublishModal}
        title="Xác nhận Xuất bản Website"
        message="Hành động này sẽ cập nhật tất cả nội dung nháp (Slogan, Hero, About Us, Sản phẩm, Why Choose Us, Liên hệ) ra ngoài Landing Page của khách hàng ngay lập tức mà không cần triển khai lại code."
        confirmLabel="Xuất bản ngay"
        cancelLabel="Để sau"
        onConfirm={handlePublish}
        onCancel={() => setShowPublishModal(false)}
        isLoading={isPublishing}
      />
    </>
  );
};
