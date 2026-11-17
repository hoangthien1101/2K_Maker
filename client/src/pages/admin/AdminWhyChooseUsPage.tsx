import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { WhyChooseUsItem } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const AdminWhyChooseUsPage: React.FC = () => {
  const { success, error } = useToast();
  const [items, setItems] = useState<WhyChooseUsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<WhyChooseUsItem> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await contentService.getWhyChooseUs();
      if (res.data) {
        setItems(res.data);
      }
    } catch (err: any) {
      error('Không thể tải Why Choose Us');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      number: `0${items.length + 1}`,
      tag: 'FEATURE',
      title: '',
      description: '',
      icon: 'Flame',
      sortOrder: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WhyChooseUsItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title?.trim() || !editingItem?.description?.trim()) {
      error('Vui lòng nhập tiêu đề và mô tả');
      return;
    }

    try {
      if (editingItem.id) {
        await contentService.updateWhyChooseUs(editingItem.id, editingItem);
        success('Cập nhật thẻ thành công');
      } else {
        await contentService.createWhyChooseUs(editingItem);
        success('Thêm thẻ mới thành công');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      error(err.message || 'Lỗi lưu thông tin');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await contentService.deleteWhyChooseUs(deleteTargetId);
      success('Đã xóa thẻ');
      setDeleteTargetId(null);
      fetchItems();
    } catch (err: any) {
      error(err.message || 'Lỗi khi xóa thẻ');
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
        title="Quản Lý Why Choose Us (Tại Sao Chọn 2K Maker)"
        description="Chỉnh sửa 4 điểm mạnh nổi bật: Độc đáo, Đa dạng, Giá cả hợp lý, Sản xuất theo yêu cầu"
      />

      <div className="p-6 sm:p-8 overflow-y-auto max-w-5xl space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-navy-900">
                Danh Sách Thẻ Lý Do Lựa Chọn (4 Cards)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các điểm mạnh cốt lõi chứng minh uy tín và năng lực in 3D của 2K Maker
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Thẻ Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-brand-600">
                        {item.number}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-700"
                        title="Sửa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-extrabold text-navy-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Icon: {item.icon || 'Flame'}</span>
                  <span>Thứ tự: {item.sortOrder}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-navy-900 mb-4">
              {editingItem.id ? 'Chỉnh Sửa Thẻ Why Choose Us' : 'Thêm Thẻ Mới'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Số Thứ Tự (01, 02, 03, 04) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.number || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nhãn Tag (UNIQUE, DIVERSE...) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.tag || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tiêu Đề (ĐỘC ĐÁO, ĐA DẠNG...) *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Đoạn Mô Tả *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Icon Minh Họa
                  </label>
                  <select
                    value={editingItem.icon || 'Flame'}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Flame">Flame (Độc đáo)</option>
                    <option value="Layers">Layers (Đa dạng)</option>
                    <option value="BadgePercent">BadgePercent (Giá hợp lý)</option>
                    <option value="Wrench">Wrench (Sản xuất theo yêu cầu)</option>
                    <option value="Sparkles">Sparkles (Nổi bật)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Thứ Tự Sắp Xếp
                  </label>
                  <input
                    type="number"
                    value={editingItem.sortOrder || 1}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: Number(e.target.value) })}
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
                  Lưu Thẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Xóa Thẻ Why Choose Us"
        message="Bạn có chắc chắn muốn xóa thẻ lý do này?"
        isDangerous
        confirmLabel="Xóa ngay"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

