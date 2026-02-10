import api from './api';

export const productService = {
    getProducts: async (search = '') => {
        const response = await api.get('/products', {
            params: { search },
        });
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
};
