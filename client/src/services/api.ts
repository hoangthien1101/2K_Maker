const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RequestOptions extends RequestInit {
  data?: any;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('2k_maker_token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let body = options.body;
  if (options.data) {
    if (options.data instanceof FormData) {
      body = options.data;
      // Let browser set Content-Type with boundary for FormData
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.data);
    }
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  const resData = await response.json().catch(() => ({
    success: false,
    message: 'Không thể phân tích phản hồi từ máy chủ',
  }));

  if (!response.ok) {
    throw new Error(resData.message || `Lỗi yêu cầu: ${response.status}`);
  }

  return resData;
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'POST', data }),
  put: <T>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'PUT', data }),
  patch: <T>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'PATCH', data }),
  delete: <T>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'DELETE' }),
};

