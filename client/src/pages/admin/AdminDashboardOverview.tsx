import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { OverviewStats } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import {
  Package,
  Layers,
  Inbox,
  Rocket,
  CheckCircle2,
  Clock,
  PlusCircle,
  Eye,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getOverviewStats();
      if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const formatTime = (iso?: string | null) => {
    if (!iso) return 'Chưa có thông tin xuất bản';
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
        title="Dashboard Tổng Quan"
        description="Theo dõi hoạt động, trạng thái nội dung website và các tác vụ quản trị nhanh của 2K Maker"
        onPublishedSuccess={fetchStats}
      />

      <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
        {/* Stat Cards 4 Cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Products */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Tổng Sản Phẩm 3D
              </span>
              <h3 className="text-3xl font-black text-navy-900">
                {stats?.totalProducts ?? 0}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                {stats?.visibleProducts ?? 0} đang hiển thị • {stats?.hiddenProducts ?? 0} đang ẩn
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Categories */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Danh Mục Sản Phẩm
              </span>
              <h3 className="text-3xl font-black text-navy-900">
                {stats?.totalCategories ?? 0}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-1">
                Móc khóa, mô hình, mascot, phụ kiện
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Inquiries */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Yêu Cầu Tư Vấn / Đặt In
              </span>
              <h3 className="text-3xl font-black text-navy-900">
                {stats?.totalInquiries ?? 0}
              </h3>
              <p className="text-[11px] font-semibold text-amber-600 mt-1">
                {stats?.newInquiries ?? 0} yêu cầu mới cần xử lý
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Published State */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Trạng Thái Xuất Bản
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-black text-emerald-600">
                  Đã Xuất Bản
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-1 truncate max-w-[170px]" title={formatTime(stats?.lastPublishedAt)}>
                Lần cuối: {formatTime(stats?.lastPublishedAt)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thao tác quản trị nhanh</span>
            </div>
            <h4 className="text-lg font-black tracking-tight">
              Quản lý sản phẩm & Xuất bản Landing Page
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Thêm sản phẩm mới hoặc cập nhật các section để làm mới nội dung trang web tức thì.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-navy-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-brand-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm sản phẩm mới</span>
            </Link>

            <Link
              to="/admin/publish"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <Rocket className="w-4 h-4 text-brand-400" />
              <span>Quản lý xuất bản</span>
            </Link>
          </div>
        </div>

        {/* 2 Grid Columns: Recent Inquiries & Recent Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Recent Customer Inquiries */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-brand-600" />
                  <h4 className="text-base font-extrabold text-navy-900">
                    Yêu Cầu Tư Vấn Gần Đây
                  </h4>
                </div>
                <Link
                  to="/admin/inquiries"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Xem tất cả</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {stats.recentInquiries.map((inq) => (
                    <div key={inq.id} className="py-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-navy-900">
                            {inq.customerName}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({inq.customerPhone})
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-amber-100 text-amber-800'
                                : inq.status === 'contacted'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {inq.status === 'new' ? 'Mới' : inq.status === 'contacted' ? 'Đã liên hệ' : 'Hoàn thành'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                          {inq.productName ? `Quan tâm: ${inq.productName} • ` : ''}
                          {inq.message}
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Chưa có yêu cầu tư vấn nào từ khách hàng.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <Link
                to="/admin/inquiries"
                className="text-xs font-bold text-navy-900 hover:text-brand-600 inline-flex items-center gap-1"
              >
                <span>Mở hộp thư tư vấn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Recent Products Added */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-brand-600" />
                  <h4 className="text-base font-extrabold text-navy-900">
                    Sản Phẩm Trong Kho Lưu Trữ
                  </h4>
                </div>
                <Link
                  to="/admin/products"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Quản lý kho</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {stats.recentProducts.map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail || (p.images?.[0] ?? '')}
                          alt={p.title}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-navy-900 line-clamp-1">
                            {p.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {p.category?.name || 'Sản phẩm 3D'}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.isVisible ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {p.isVisible ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Chưa có sản phẩm nào.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <Link
                to="/admin/products"
                className="text-xs font-bold text-navy-900 hover:text-brand-600 inline-flex items-center gap-1"
              >
                <span>Xem tất cả sản phẩm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

