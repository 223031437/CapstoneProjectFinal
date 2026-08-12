import { useState } from 'react';
import { servicesApi } from '../../api/services';
import useAsync from '../../hooks/useAsync';
import { Loading, EmptyState, Notice } from '../../components/UIState';
import ConfirmDelete from '../../components/ConfirmDelete';

const empty = { serviceId: '', serviceName: '', category: '', description: '', price: '' };

const AdminServices = () => {
  const { data, loading, error, reload } = useAsync(() => servicesApi.getAll(), []);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await servicesApi.create({ ...form, price: Number(form.price) || 0 });
      setNotice({ ok: true, message: `Added ${form.serviceName}.` });
      setForm(empty);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await servicesApi.remove(serviceId);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    }
  };

  return (
    <div className="admin-panel">
      <form className="card admin-form" onSubmit={handleSubmit}>
        <h3>Add a service</h3>
        <Notice type={notice?.ok ? 'success' : 'error'}>{notice?.message}</Notice>

        <div className="form-row">
          <div className="field">
            <label htmlFor="serviceId">Service ID</label>
            <input id="serviceId" name="serviceId" value={form.serviceId} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="serviceName">Name</label>
            <input id="serviceName" name="serviceName" value={form.serviceName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Nails, skin, grooming…" required />
          </div>
          <div className="field">
            <label htmlFor="price">Price (R)</label>
            <input id="price" type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
        </div>

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Adding…' : 'Add service'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Current menu ({data?.length ?? 0})</h3>
        {loading && <Loading label="Loading services…" />}
        {error && <Notice type="error">{error.message}</Notice>}
        {!loading && data && data.length === 0 && <EmptyState title="No services yet" />}
        {!loading && data && data.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th /></tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.serviceId}>
                  <td>{s.serviceName}</td>
                  <td>{s.category}</td>
                  <td>R{s.price}</td>
                  <td><ConfirmDelete onConfirm={() => handleDelete(s.serviceId)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
