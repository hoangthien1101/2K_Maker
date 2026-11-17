import { api } from './api';
import {
  SiteData,
  HeroContent,
  AboutContent,
  CoreValue,
  WhyChooseUsItem,
  ContactInfo,
  SectionSetting,
  OverviewStats,
} from '../types';

export const contentService = {
  getPublishedContent: () => {
    return api.get<{ success: boolean; data: SiteData; source: string; publishedAt?: string }>('/content/published');
  },

  getDraftContent: () => {
    return api.get<{
      success: boolean;
      data: SiteData;
      lastPublishedAt: string | null;
      publishedBy: string | null;
    }>('/content/draft');
  },

  publishWebsite: (note?: string) => {
    return api.post<{ success: boolean; message: string; publishedAt: string }>('/content/publish', { note });
  },

  getOverviewStats: () => {
    return api.get<{ success: boolean; data: OverviewStats }>('/content/stats');
  },

  // Hero
  getHero: () => api.get<{ success: boolean; data: HeroContent }>('/content/hero'),
  updateHero: (data: Partial<HeroContent>) =>
    api.put<{ success: boolean; message: string; data: HeroContent }>('/content/hero', data),

  // About
  getAbout: () => api.get<{ success: boolean; data: AboutContent & { coreValues: CoreValue[] } }>('/content/about'),
  updateAbout: (data: Partial<AboutContent>) =>
    api.put<{ success: boolean; message: string; data: AboutContent }>('/content/about', data),

  // Core Values
  getCoreValues: () => api.get<{ success: boolean; data: CoreValue[] }>('/content/core-values'),
  createCoreValue: (data: Partial<CoreValue>) =>
    api.post<{ success: boolean; message: string; data: CoreValue }>('/content/core-values', data),
  updateCoreValue: (id: number, data: Partial<CoreValue>) =>
    api.put<{ success: boolean; message: string; data: CoreValue }>(`/content/core-values/${id}`, data),
  deleteCoreValue: (id: number) =>
    api.delete<{ success: boolean; message: string }>(`/content/core-values/${id}`),

  // Why Choose Us
  getWhyChooseUs: () => api.get<{ success: boolean; data: WhyChooseUsItem[] }>('/content/why-choose-us'),
  createWhyChooseUs: (data: Partial<WhyChooseUsItem>) =>
    api.post<{ success: boolean; message: string; data: WhyChooseUsItem }>('/content/why-choose-us', data),
  updateWhyChooseUs: (id: number, data: Partial<WhyChooseUsItem>) =>
    api.put<{ success: boolean; message: string; data: WhyChooseUsItem }>(`/content/why-choose-us/${id}`, data),
  deleteWhyChooseUs: (id: number) =>
    api.delete<{ success: boolean; message: string }>(`/content/why-choose-us/${id}`),

  // Contact
  getContact: () => api.get<{ success: boolean; data: ContactInfo }>('/content/contact'),
  updateContact: (data: Partial<ContactInfo>) =>
    api.put<{ success: boolean; message: string; data: ContactInfo }>('/content/contact', data),

  // Sections
  getSections: () => api.get<{ success: boolean; data: SectionSetting[] }>('/content/sections'),
  updateSections: (sections: Array<{ id: number; isVisible: boolean; sortOrder: number }>) =>
    api.put<{ success: boolean; message: string; data: SectionSetting[] }>('/content/sections', { sections }),
};

