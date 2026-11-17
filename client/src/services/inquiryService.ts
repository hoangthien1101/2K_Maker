import { api } from './api';
import { ContactInquiry } from '../types';

export const inquiryService = {
  submitInquiry: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    productName?: string;
    inquiryType?: 'consultation' | 'order';
    message?: string;
    attachmentUrl?: string;
  }) => {
    return api.post<{ success: boolean; message: string; data: ContactInquiry }>('/inquiries', data);
  },

  getInquiries: (status?: string) => {
    const q = status && status !== 'all' ? `?status=${status}` : '';
    return api.get<{ success: boolean; data: ContactInquiry[] }>(`/inquiries${q}`);
  },

  updateInquiry: (id: number, data: { status?: 'new' | 'contacted' | 'completed'; adminNote?: string }) => {
    return api.put<{ success: boolean; message: string; data: ContactInquiry }>(`/inquiries/${id}`, data);
  },

  deleteInquiry: (id: number) => {
    return api.delete<{ success: boolean; message: string }>(`/inquiries/${id}`);
  },
};

export const uploadService = {
  uploadSingle: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<{ success: boolean; message: string; url: string; filename: string }>('/upload/single', formData);
  },

  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post<{ success: boolean; message: string; urls: string[] }>('/upload/multiple', formData);
  },
};

