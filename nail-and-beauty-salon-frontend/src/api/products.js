import { http } from './client';

export const productsApi = {
  getAll: () => http.get('/product/getAll'),
  read: (productID) => http.get(`/product/read/${encodeURIComponent(productID)}`),
  create: (product) => http.post('/product/create', product),
  update: (product) => http.put('/product/update', product),
  remove: (productID) => http.del(`/product/delete/${encodeURIComponent(productID)}`),
};
