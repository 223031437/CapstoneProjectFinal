import { http } from './client';

export const appointmentsApi = {
  getAll: () => http.get('/appointment/getAll'),
  read: (appointmentId) =>
    http.get(`/appointment/read/${encodeURIComponent(appointmentId)}`),
  create: (appointment) => http.post('/appointment/create', appointment),
  update: (appointment) => http.put('/appointment/update', appointment),
  remove: (appointmentId) =>
    http.del(`/appointment/delete/${encodeURIComponent(appointmentId)}`),
};
