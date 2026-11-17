import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { SiteData, Product } from '../types';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { AboutSection } from '../components/landing/AboutSection';
import { ProductSection } from '../components/landing/ProductSection';
import { WhyChooseUsSection } from '../components/landing/WhyChooseUsSection';
import { ContactSection } from '../components/landing/ContactSection';
import { Footer } from '../components/landing/Footer';
import { QuickInquiryModal } from '../components/landing/QuickInquiryModal';
import { Loader2, RefreshCw } from 'lucide-react';
import { useLenis, scrollToSection } from '../hooks/useLenis';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const LandingPage: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);

  // Initialize Lenis smooth scroll
  useLenis();

  // Initialize scroll reveal
  useScrollReveal();

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const res = await contentService.getPublishedContent();
      if (res.data) {
        setSiteData(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching landing page data:', err);
      setLoadError(err.message || 'Không thể tải nội dung trang web');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (!isLoading && siteData) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, siteData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0A42A1] text-white flex items-center justify-center shadow-lg shadow-[#0A42A1]/25 animate-pulse">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <span className="text-xs font-black text-[#223176] tracking-widest uppercase">
            2K MAKER • ĐANG TẢI...
          </span>
          <span className="text-[11px] text-[#0A42A1] font-semibold">Biến ý tưởng thành sản phẩm 3D</span>
        </div>
      </div>
    );
  }

  if (loadError || !siteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFF] px-4">
        <div className="max-w-md w-full p-8 rounded-3xl border border-[#D9E8FF] bg-white text-center shadow-card">
          <h2 className="text-xl font-bold text-[#223176] mb-2">Không Thể Tải Trang Web</h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            {loadError || 'Đã có sự cố khi kết nối tới máy chủ 2K Maker API.'}
          </p>
          <button
            onClick={fetchContent}
            className="px-6 py-3 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử lại</span>
          </button>
        </div>
      </div>
    );
  }

  const { hero, about, coreValues, whyChooseUs, contact, sections, products, categories } = siteData;

  const renderSection = (key: string) => {
    switch (key) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            content={hero}
            onExploreClick={() => scrollToSection('products')}
            onContactClick={() => scrollToSection('contact')}
          />
        );
      case 'about':
        return <AboutSection key="about" content={about} coreValues={coreValues || []} />;
      case 'products':
        return (
          <ProductSection
            key="products"
            products={products || []}
            categories={categories || []}
            onOrderProduct={(prod: Product) => setOrderingProduct(prod)}
            phone={contact?.phone}
            zaloUrl={contact?.zaloUrl}
          />
        );
      case 'why_choose_us':
        return <WhyChooseUsSection key="why_choose_us" items={whyChooseUs || []} />;
      case 'contact':
        return <ContactSection key="contact" contactInfo={contact} />;
      default:
        return null;
    }
  };

  const visibleSections = sections && sections.length > 0
    ? [...sections].sort((a, b) => a.sortOrder - b.sortOrder).filter((s) => s.isVisible)
    : [
        { id: 1, sectionKey: 'hero' as const, sectionName: 'Hero', isVisible: true, sortOrder: 1, isDraft: false },
        { id: 2, sectionKey: 'about' as const, sectionName: 'About', isVisible: true, sortOrder: 2, isDraft: false },
        { id: 3, sectionKey: 'products' as const, sectionName: 'Products', isVisible: true, sortOrder: 3, isDraft: false },
        { id: 4, sectionKey: 'why_choose_us' as const, sectionName: 'Why Choose Us', isVisible: true, sortOrder: 4, isDraft: false },
        { id: 5, sectionKey: 'contact' as const, sectionName: 'Contact', isVisible: true, sortOrder: 5, isDraft: false },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar logoImage={hero?.logoImage} />

      <main className="flex-1">
        {visibleSections.map((sec) => renderSection(sec.sectionKey))}
      </main>

      <Footer
        contactInfo={contact}
        slogan={hero?.slogan}
        logoImage={hero?.logoImage}
      />

      <QuickInquiryModal
        product={orderingProduct}
        onClose={() => setOrderingProduct(null)}
      />
    </div>
  );
};
