import { useState } from 'react';
import { appointmentsApi } from '../../api/appointments';
import useAsync from '../../hooks/useAsync';
import { Loading, EmptyState, Notice } from '../../components/UIState';
import ConfirmDelete from '../../components/ConfirmDelete';

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

const AdminAppointments = () => {
  const { data, loading, error, reload } = useAsync(
    () => appointmentsApi.getAll(),
    []
  );
  const [notice, setNotice] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const handleStatusChange = async (appointment, status) => {
    setSavingId(appointment.appointmentId);
    setNotice(null);
    try {
      await appointmentsApi.update({ ...appointment, status });
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await appointmentsApi.remove(appointmentId);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    }
  };

  return (
    <div className="admin-panel admin-panel--single">
      <div className="admin-list">
        <h3>Bookings ({data?.length ?? 0})</h3>
        <Notice type="error">{notice?.message}</Notice>
        {loading && <Loading label="Loading bookings…" />}
        {error && <Notice type="error">{error.message}</Notice>}
        {!loading && data && data.length === 0 && (
          <EmptyState title="No bookings yet" hint="New requests from the Book a ritual page will show up here." />
        )}
        {!loading && data && data.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>When</th>
                <th>Service</th>
                <th>Notes</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.appointmentId}>
                  <td>{a.appointmentId}</td>
                  <td>{a.dateTime ? new Date(a.dateTime).toLocaleString() : '—'}</td>
                  <td>{a.serviceSelected}</td>
                  <td style={{ maxWidth: 220 }}>{a.notes}</td>
                  <td>
                    <select
                      value={a.status || 'Pending'}
                      disabled={savingId === a.appointmentId}
                      onChange={(e) => handleStatusChange(a, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td><ConfirmDelete onConfirm={() => handleDelete(a.appointmentId)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
