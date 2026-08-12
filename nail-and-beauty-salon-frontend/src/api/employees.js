import { http } from './client';

export const employeesApi = {
  getAll: () => http.get('/employee/getAll'),
  read: (userId) => http.get(`/employee/read/${encodeURIComponent(userId)}`),
  create: (employee) => http.post('/employee/create', employee),
  update: (employee) => http.put('/employee/update', employee),
  remove: (userId) => http.del(`/employee/delete/${encodeURIComponent(userId)}`),
};
