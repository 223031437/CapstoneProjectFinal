import { useState } from 'react';
import { employeesApi } from '../../api/employees';
import useAsync from '../../hooks/useAsync';
import { Loading, EmptyState, Notice } from '../../components/UIState';
import ConfirmDelete from '../../components/ConfirmDelete';

const empty = {
  userId: '',
  employeeId: '',
  firstName: '',
  lastName: '',
  email: '',
  cellNumber: '',
  role: '',
};

const AdminEmployees = () => {
  const { data, loading, error, reload } = useAsync(
    () => employeesApi.getAll(),
    []
  );
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await employeesApi.create(form);
      setNotice({ ok: true, message: `Added ${form.firstName} ${form.lastName}.` });
      setForm(empty);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await employeesApi.remove(userId);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    }
  };

  return (
    <div className="admin-panel">
      <form className="card admin-form" onSubmit={handleSubmit}>
        <h3>Add a team member</h3>
        <Notice type={notice?.ok ? 'success' : 'error'}>{notice?.message}</Notice>

        <div className="form-row">
          <div className="field">
            <label htmlFor="userId">Staff ID (user ID)</label>
            <input id="userId" name="userId" value={form.userId} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="employeeId">Employee ID</label>
            <input id="employeeId" name="employeeId" value={form.employeeId} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="cellNumber">Cell number</label>
            <input id="cellNumber" name="cellNumber" value={form.cellNumber} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" value={form.role} onChange={handleChange} placeholder="Nail artist, esthetician…" required />
        </div>

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Adding…' : 'Add team member'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Current team ({data?.length ?? 0})</h3>
        {loading && <Loading label="Loading team…" />}
        {error && <Notice type="error">{error.message}</Notice>}
        {!loading && data && data.length === 0 && (
          <EmptyState title="No team members yet" />
        )}
        {!loading && data && data.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Cell</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <tr key={e.userId}>
                  <td>{e.firstName} {e.lastName}</td>
                  <td>{e.role}</td>
                  <td>{e.email}</td>
                  <td>{e.cellNumber}</td>
                  <td><ConfirmDelete onConfirm={() => handleDelete(e.userId)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminEmployees;
