import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/LandingPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminHeroPage } from './pages/admin/AdminHeroPage';
import { AdminAboutPage } from './pages/admin/AdminAboutPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminWhyChooseUsPage } from './pages/admin/AdminWhyChooseUsPage';
import { AdminContactPage } from './pages/admin/AdminContactPage';
import { AdminSectionsPublishPage } from './pages/admin/AdminSectionsPublishPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Customer Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Protected Portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardOverview />} />
              <Route path="hero" element={<AdminHeroPage />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="why-choose-us" element={<AdminWhyChooseUsPage />} />
              <Route path="contact" element={<AdminContactPage />} />
              <Route path="inquiries" element={<AdminInquiriesPage />} />
              <Route path="publish" element={<AdminSectionsPublishPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
