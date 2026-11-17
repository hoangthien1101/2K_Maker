import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Info,
  Package,
  CheckCircle2,
  PhoneCall,
  Inbox,
  Rocket,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard Tổng Quan', end: true },
    { to: '/admin/hero', icon: Sparkles, label: 'Hero / Banner Mở Đầu' },
    { to: '/admin/about', icon: Info, label: 'Giới Thiệu (About Us)' },
    { to: '/admin/products', icon: Package, label: 'Quản Lý Sản Phẩm' },
    { to: '/admin/why-choose-us', icon: CheckCircle2, label: 'Why Choose Us' },
    { to: '/admin/contact', icon: PhoneCall, label: 'Thông Tin Liên Hệ' },
    { to: '/admin/inquiries', icon: Inbox, label: 'Yêu Cầu Tư Vấn' },
    { to: '/admin/publish', icon: Rocket, label: 'Giao Diện & Xuất Bản' },
  ];

  return (
    <aside className="w-64 bg-[#192458] text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-[#223176] select-none">
      {/* Brand Logo Header */}
      <div className="p-6 border-b border-[#223176]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#223176] to-[#0A42A1] flex items-center justify-center text-white shadow-md shadow-[#0A42A1]/20">
            <Layers className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-tight">
              2K MAKER
            </h1>
            <span className="text-[10px] font-bold text-[#6FA8FF] uppercase tracking-widest block">
              Admin CMS Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Quản trị nội dung
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0A42A1] text-white shadow-md shadow-[#0A42A1]/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#223176]/70'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Xem trực tiếp
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-[#223176]/70 transition-all group"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-[#6FA8FF]" />
            <span>Xem Landing Page</span>
          </div>
          <span className="text-[10px] bg-[#223176] px-2 py-0.5 rounded text-slate-300 group-hover:text-white">
            Tab mới
          </span>
        </a>
      </nav>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-[#223176] bg-[#141C48]">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[11px] text-[#6FA8FF] truncate">
              {user?.email || 'admin@2kmaker.vn'}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#223176] hover:bg-rose-900/50 text-slate-200 hover:text-rose-300 text-xs font-bold transition-colors border border-[#2B3C8C]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};
