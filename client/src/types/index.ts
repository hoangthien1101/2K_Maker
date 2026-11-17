export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  categoryId: number | null;
  category?: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  material: string;
  dimensions: string;
  sortOrder: number;
  isVisible: boolean;
  isFeatured: boolean;
  customNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroContent {
  id: number;
  slogan: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bannerImage: string;
  logoImage?: string;
  badgeText: string;
  isDraft: boolean;
}

export interface AboutContent {
  id: number;
  sectionTitle: string;
  heading: string;
  introParagraph1: string;
  introParagraph2: string;
  introParagraph3: string;
  storyTitle: string;
  storyContent: string;
  illustrationImage: string;
  isDraft: boolean;
  coreValues?: CoreValue[];
}

export interface CoreValue {
  id: number;
  code?: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder: number;
  isDraft: boolean;
}

export interface WhyChooseUsItem {
  id: number;
  number: string;
  tag: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder: number;
  isDraft: boolean;
}

export interface ContactInfo {
  id: number;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  tiktokUrl: string;
  zaloUrl: string;
  ctaConsultationText: string;
  ctaOrderText: string;
  isDraft: boolean;
}

export interface SectionSetting {
  id: number;
  sectionKey: 'hero' | 'about' | 'products' | 'why_choose_us' | 'contact';
  sectionName: string;
  isVisible: boolean;
  sortOrder: number;
  isDraft: boolean;
}

export interface ContactInquiry {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productName?: string;
  inquiryType: 'consultation' | 'order';
  message?: string;
  attachmentUrl?: string;
  status: 'new' | 'contacted' | 'completed';
  adminNote?: string;
  createdAt: string;
}

export interface SiteData {
  hero: HeroContent | null;
  about: AboutContent | null;
  coreValues: CoreValue[];
  whyChooseUs: WhyChooseUsItem[];
  contact: ContactInfo | null;
  sections: SectionSetting[];
  products: Product[];
  categories: ProductCategory[];
}

export interface OverviewStats {
  totalProducts: number;
  visibleProducts: number;
  hiddenProducts: number;
  totalCategories: number;
  totalInquiries: number;
  newInquiries: number;
  lastPublishedAt: string | null;
  publishedBy: string | null;
  recentInquiries: ContactInquiry[];
  recentProducts: Product[];
}

