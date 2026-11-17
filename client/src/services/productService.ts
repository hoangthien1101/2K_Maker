import { api } from './api';
import { Product, ProductCategory } from '../types';

export const productService = {
  getProducts: (params?: { category?: string; search?: string; isAdmin?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.isAdmin) searchParams.append('isAdmin', 'true');
    const q = searchParams.toString();
    return api.get<{ success: boolean; data: Product[] }>(`/products${q ? `?${q}` : ''}`);
  },

  getProductById: (id: number | string) => {
    return api.get<{ success: boolean; data: Product }>(`/products/${id}`);
  },

  createProduct: (productData: Partial<Product>) => {
    return api.post<{ success: boolean; message: string; data: Product }>('/products', productData);
  },

  updateProduct: (id: number, productData: Partial<Product>) => {
    return api.put<{ success: boolean; message: string; data: Product }>(`/products/${id}`, productData);
  },

  deleteProduct: (id: number) => {
    return api.delete<{ success: boolean; message: string }>(`/products/${id}`);
  },

  toggleVisibility: (id: number) => {
    return api.patch<{ success: boolean; message: string; data: Product }>(`/products/${id}/visibility`);
  },

  // Categories
  getCategories: () => {
    return api.get<{ success: boolean; data: ProductCategory[] }>('/products/categories');
  },

  createCategory: (data: { name: string; sortOrder?: number }) => {
    return api.post<{ success: boolean; message: string; data: ProductCategory }>('/products/categories', data);
  },

  updateCategory: (id: number, data: { name?: string; sortOrder?: number; isActive?: boolean }) => {
    return api.put<{ success: boolean; message: string; data: ProductCategory }>(`/products/categories/${id}`, data);
  },

  deleteCategory: (id: number) => {
    return api.delete<{ success: boolean; message: string }>(`/products/categories/${id}`);
  },
};

