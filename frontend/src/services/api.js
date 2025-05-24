import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use((config) => {
    // Try to get admin token first, then user token
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear both tokens on authentication error
            localStorage.removeItem('adminToken');
            localStorage.removeItem('userToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const register = async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.token) {
        // Store token based on user role
        if (response.data.user.role === 'admin') {
            localStorage.setItem('adminToken', response.data.token);
        } else {
            localStorage.setItem('userToken', response.data.token);
        }
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
};

export const getCurrentUser = async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
};

// CCTV Products API calls
export const getCCTVProducts = async () => {
    const response = await api.get('/api/cctv-products');
    return response.data.map(product => ({
        ...product,
        image: product.image ? product.image : null,
    }));
};

export const createCCTVProduct = async (formData) => {
    const response = await api.post('/api/cctv-products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const updateCCTVProduct = async (id, formData) => {
    const response = await api.put(`/api/cctv-products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const deleteCCTVProduct = async (id) => {
    const response = await api.delete(`/api/cctv-products/${id}`);
    return { success: true, message: response.data.message };
};

// NanoBeam Products API calls
export const getNanoBeamProducts = async () => {
    const response = await api.get('/api/nanobeam-products');
    return response.data.map(product => ({
        ...product,
        image: product.image ? product.image : null,
    }));
};

export const createNanoBeamProduct = async (formData) => {
    const response = await api.post('/api/nanobeam-products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const updateNanoBeamProduct = async (id, formData) => {
    const response = await api.put(`/api/nanobeam-products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const deleteNanoBeamProduct = async (id) => {
    const response = await api.delete(`/api/nanobeam-products/${id}`);
    return { success: true, message: response.data.message };
};

// Internet Packages API calls
export const getInternetPackages = async () => {
    const response = await api.get('/api/internet-packages');
    return response.data.map(product => ({
        ...product,
        image: product.image ? product.image : null,
    }));
};

export const createInternetPackage = async (formData) => {
    const response = await api.post('/api/internet-packages', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const updateInternetPackage = async (id, formData) => {
    const response = await api.put(`/api/internet-packages/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const deleteInternetPackage = async (id) => {
    const response = await api.delete(`/api/internet-packages/${id}`);
    return { success: true, message: response.data.message };
};

// News API calls
export const getNews = async () => {
    const response = await api.get('/api/news');
    return response.data;
};

export const getNewsById = async (id) => {
    try {
        console.log('Fetching news with ID:', id);
        const response = await api.get(`/api/news/${id}`);
        console.log('News API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getNewsById:', error.response?.data || error.message);
        throw error;
    }
};

export const createNews = async (formData) => {
    const response = await api.post('/api/news', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const updateNews = async (id, formData) => {
    const response = await api.put(`/api/news/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { success: true, data: response.data };
};

export const deleteNews = async (id) => {
    const response = await api.delete(`/api/news/${id}`);
    return { success: true, message: response.data.message };
};

export const likeNews = async (id) => {
    const response = await api.post(`/api/news/${id}/like`);
    return response.data;
};

export const addComment = async (id, content) => {
    try {
        const response = await api.post(`/api/news/${id}/comment`, { content });
        return response.data;
    } catch (error) {
        console.error('Error in addComment:', error);
        throw error;
    }
};

export const deleteComment = async (newsId, commentId) => {
    try {
        await api.delete(`/api/news/${newsId}/comment/${commentId}`);
        const response = await api.get(`/api/news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteComment:', error);
        throw error;
    }
};

export const addReply = async (newsId, commentId, content) => {
    const response = await api.post(`/api/news/${newsId}/comment/${commentId}/reply`, { content });
    return response.data;
};

export const deleteReply = async (newsId, commentId, replyId) => {
    try {
        await api.delete(`/api/news/${newsId}/comment/${commentId}/reply/${replyId}`);
        const response = await api.get(`/api/news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteReply:', error);
        throw error;
    }
};

export default api; 