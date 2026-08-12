import { http } from './client';

// Note: Contact's identity key is a composite Address object, so the
// backend's read-by-id and delete-by-id routes (/contact/{id}) can't be
// driven from a simple path segment. We only use the routes that work
// with plain JSON bodies: create, update, and list-all.
export const contactApi = {
  getAll: () => http.get('/contact/all'),
  create: (contact) => http.post('/contact', contact),
  update: (contact) => http.put('/contact', contact),
};

export const inquiriesApi = {
  getAll: () => http.get('/inquiry'),
  read: (id) => http.get(`/inquiry/${encodeURIComponent(id)}`),
  create: (inquiry) => http.post('/inquiry', inquiry),
  remove: (id) => http.del(`/inquiry/${encodeURIComponent(id)}`),
};
