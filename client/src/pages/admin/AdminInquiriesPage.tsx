import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { ContactInquiry } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import {
  Inbox,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  Loader2,
  ExternalLink,
} from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  const { success, error } = useToast();

  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const res = await inquiryService.getInquiries(filterStatus);
      if (res.data) {
        setInquiries(res.data);
      }
    } catch (err: any) {
      error('Lỗi khi tải danh sách yêu cầu tư vấn');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus]);

  const handleUpdateStatus = async (id: number, newStatus: 'new' | 'contacted' | 'completed') => {
    try {
      await inquiryService.updateInquiry(id, { status: newStatus });
      success('Cập nhật trạng thái xử lý thành công');
      fetchInquiries();
    } catch (err: any) {
      error(err.message || 'Lỗi cập nhật');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await inquiryService.deleteInquiry(deleteTargetId);
      success('Đã xóa yêu cầu tư vấn');
      setDeleteTargetId(null);
      fetchInquiries();
    } catch (err: any) {
      error(err.message || 'Lỗi xóa yêu cầu');
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
        title="Hộp Thư Yêu Cầu Tư Vấn & Đặt In 3D"
        description="Quản lý các tin nhắn, yêu cầu báo giá và thông tin liên hệ do khách hàng gửi từ website"
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl space-y-6">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-navy-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất cả ({inquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'new'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Mới chưa xử lý
          </button>
          <button
            onClick={() => setFilterStatus('contacted')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'contacted'
                ? 'bg-sky-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Đã liên hệ
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'completed'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Đã hoàn thành
          </button>
        </div>

        {/* Inquiries Cards List */}
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-base font-black text-navy-900">
                    {inq.customerName}
                  </span>

                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      inq.status === 'new'
                        ? 'bg-amber-100 text-amber-800'
                        : inq.status === 'contacted'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {inq.status === 'new'
                      ? 'Mới tiếp nhận'
                      : inq.status === 'contacted'
                      ? 'Đang tư vấn'
                      : 'Đã hoàn tất đơn'}
                  </span>

                  <span className="text-xs text-slate-400">
                    {new Date(inq.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>

                {/* Contact numbers */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                  <a
                    href={`tel:${inq.customerPhone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 text-navy-900 hover:text-brand-600"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-500" />
                    <span>{inq.customerPhone}</span>
                  </a>

                  {inq.customerEmail && (
                    <a
                      href={`mailto:${inq.customerEmail}`}
                      className="flex items-center gap-1.5 text-navy-900 hover:text-brand-600"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-500" />
                      <span>{inq.customerEmail}</span>
                    </a>
                  )}

                  <a
                    href={`https://zalo.me/${inq.customerPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sky-600 hover:underline text-[11px]"
                  >
                    <span>Mở Zalo tư vấn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Product Name if any */}
                {inq.productName && (
                  <div className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg inline-block">
                    Quan tâm mẫu in: {inq.productName}
                  </div>
                )}

                {/* Message */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {inq.message || 'Không có mô tả chi tiết'}
                </div>
              </div>

              {/* Status Change Buttons & Delete */}
              <div className="flex md:flex-col items-center justify-end gap-2 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                {inq.status !== 'contacted' && (
                  <button
                    onClick={() => handleUpdateStatus(inq.id, 'contacted')}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] transition-colors"
                  >
                    Đánh dấu: Đã liên hệ
                  </button>
                )}

                {inq.status !== 'completed' && (
                  <button
                    onClick={() => handleUpdateStatus(inq.id, 'completed')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition-colors"
                  >
                    Đánh dấu: Hoàn tất
                  </button>
                )}

                {inq.status !== 'new' && (
                  <button
                    onClick={() => handleUpdateStatus(inq.id, 'new')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] transition-colors"
                  >
                    Đặt lại: Mới
                  </button>
                )}

                <button
                  onClick={() => setDeleteTargetId(inq.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Xóa yêu cầu này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {inquiries.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-navy-900 mb-1">
                Không có yêu cầu tư vấn nào
              </h4>
              <p className="text-xs text-slate-400">
                Các yêu cầu gửi từ form liên hệ ngoài Landing Page sẽ hiển thị tại đây.
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Xóa Yêu Cầu Tư Vấn"
        message="Bạn có chắc chắn muốn xóa mục này khỏi danh sách?"
        isDangerous
        confirmLabel="Xóa ngay"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

