import React, { useState, useRef } from 'react';
import { uploadService } from '../../services/inquiryService';
import { UploadCloud, X, Image as ImageIcon, Loader2, Link2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ImageUploaderProps {
  value: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  multiple = false,
  label = 'Hình ảnh',
  helperText = 'Kéo thả hoặc nhấp để chọn tệp hình ảnh (JPG, PNG, WEBP, SVG) • Hỗ trợ tệp lên đến 100MB',
}) => {
  const { error, success } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const currentUrls: string[] = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        error(`Tệp "${files[i].name}" vượt quá giới hạn 100MB cho phép.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
    }

    try {
      setIsUploading(true);
      if (multiple) {
        const fileArr = Array.from(files);
        const res = await uploadService.uploadMultiple(fileArr);
        if (res.urls && res.urls.length > 0) {
          onChange([...currentUrls, ...res.urls]);
          success(`Đã tải lên ${res.urls.length} ảnh thành công`);
        }
      } else {
        const res = await uploadService.uploadSingle(files[0]);
        if (res.url) {
          onChange(res.url);
          success('Đã tải ảnh lên thành công');
        }
      }
    } catch (err: any) {
      error(err.message || 'Lỗi khi tải ảnh lên');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = () => {
    if (!customUrl.trim()) return;
    if (multiple) {
      onChange([...currentUrls, customUrl.trim()]);
    } else {
      onChange(customUrl.trim());
    }
    setCustomUrl('');
    setShowUrlInput(false);
    success('Đã thêm đường dẫn ảnh');
  };

  const handleRemove = (indexToRemove: number) => {
    if (multiple) {
      const updated = currentUrls.filter((_, idx) => idx !== indexToRemove);
      onChange(updated);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>{showUrlInput ? 'Ẩn nhập URL' : 'Dùng URL ảnh trực tiếp'}</span>
        </button>
      </div>

      {/* Direct URL Input Row */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Dán link ảnh (https://...)"
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-brand-600 transition-colors"
          >
            Thêm
          </button>
        </div>
      )}

      {/* Dropzone Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isUploading
            ? 'border-brand-400 bg-brand-50/50'
            : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.stl,.obj,.3mf,.step,.stp,.zip"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-brand-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold">Đang tải ảnh lên máy chủ...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-navy-900">
                Nhấp để tải ảnh từ máy tính
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs">{helperText}</p>
            </>
          )}
        </div>
      </div>

      {/* Previews Grid */}
      {currentUrls.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {currentUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group bg-slate-100"
            >
              <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                title="Xóa ảnh này"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

