import { http } from './client';

export const servicesApi = {
  getAll: () => http.get('/service/getAll'),
  read: (serviceId) => http.get(`/service/read/${encodeURIComponent(serviceId)}`),
  create: (service) => http.post('/service/create', service),
  update: (service) => http.put('/service/update', service),
  remove: (serviceId) => http.del(`/service/delete/${encodeURIComponent(serviceId)}`),
};
