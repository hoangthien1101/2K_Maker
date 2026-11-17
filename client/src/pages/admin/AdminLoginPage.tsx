import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Layers, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { error, success } = useToast();

  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('admin123456');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      error('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    try {
      setIsLoading(true);
      await login(identifier.trim(), password);
      success('Đăng nhập thành công! Chào mừng quản trị viên.');
      navigate('/admin');
    } catch (err: any) {
      error(err.message || 'Tài khoản hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#192458] px-4 relative overflow-hidden">
      {/* Background Tech Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-[#0A42A1]/30 via-[#6FA8FF]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-[#D9E8FF] z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#223176] to-[#0A42A1] flex items-center justify-center text-white shadow-lg shadow-[#0A42A1]/25 mb-4">
            <Layers className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-[#223176] tracking-tight">
            2K MAKER ADMIN
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Hệ thống Quản trị Nội dung Website In 3D (CMS)
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
              Tài khoản / Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin hoặc admin@2kmaker.vn"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#223176] uppercase tracking-wider mb-1.5">
              Mật khẩu quản trị
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9E8FF] focus:outline-none focus:border-[#0A42A1] focus:ring-2 focus:ring-[#0A42A1]/15 text-xs font-medium text-[#223176] transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#0A42A1]/25 hover:shadow-lg hover:shadow-[#0A42A1]/35 transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 mt-6 cursor-pointer"
          >
            {isLoading ? (
              <span>Đang xác thực...</span>
            ) : (
              <>
                <span>Đăng nhập Quản Trị</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 pt-6 border-t border-[#D9E8FF] bg-[#EEF4FF]/70 -mx-8 -mb-8 p-6 rounded-b-3xl">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#223176] uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-[#0A42A1]" />
            <span>Tài khoản quản trị mặc định:</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600 font-mono">
            <div>
              <span className="text-slate-400">Username: </span>
              <span className="font-bold text-[#0A42A1]">admin</span> (hoặc <span className="font-bold text-[#0A42A1]">admin@2kmaker.vn</span>)
            </div>
            <div>
              <span className="text-slate-400">Mật khẩu: </span>
              <span className="font-bold text-[#0A42A1]">admin123456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
