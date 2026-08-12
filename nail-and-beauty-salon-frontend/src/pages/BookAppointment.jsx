import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { servicesApi } from '../api/services';
import { appointmentsApi } from '../api/appointments';
import { Notice } from '../components/UIState';
import { IconCalendar, IconCheck } from '../components/Icons';
import './FormPage.css';

const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
];

const emptyForm = (preselected) => ({
  dateTime: '',
  serviceSelected: preselected || '',
  streetNumber: '',
  streetName: '',
  suburb: '',
  city: '',
  province: '',
  postalCode: '',
  notes: '',
});

const generateAppointmentId = () =>
  `APT-${Date.now().toString(36).toUpperCase()}`;

const BookAppointment = () => {
  const location = useLocation();
  const { data: services } = useAsync(() => servicesApi.getAll(), []);

  const [form, setForm] = useState(emptyForm(location.state?.serviceSelected));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok, message, id }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const appointmentId = generateAppointmentId();
    const payload = {
      appointmentId,
      dateTime: form.dateTime, // "YYYY-MM-DDTHH:mm" — matches LocalDateTime
      serviceSelected: form.serviceSelected,
      notes: form.notes,
      status: 'Pending',
      address: {
        streetNumber: form.streetNumber,
        streetName: form.streetName,
        suburb: form.suburb,
        city: form.city,
        province: form.province,
        postalCode: Number(form.postalCode) || 0,
      },
    };

    try {
      await appointmentsApi.create(payload);
      setResult({
        ok: true,
        message: `Booked! Your reference is ${appointmentId}. The studio will confirm your slot shortly.`,
      });
      setForm(emptyForm());
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section form-page">
      <div className="container form-page__grid">
        <div className="form-page__intro">
          <span className="eyebrow">Reserve your slot</span>
          <h1>Book a ritual</h1>
          <p className="lede">
            Tell us what you're after and when suits you. Every booking is
            given its own unshared slot — no double stacking, no rush.
          </p>
          <div className="form-page__note card">
            <IconCalendar width={18} height={18} />
            <span>
              Bookings are reviewed by the studio and confirmed by phone or
              email — you'll hear from us before your slot is locked in.
            </span>
          </div>
        </div>

        <form className="card form-card" onSubmit={handleSubmit}>
          <Notice type={result?.ok ? 'success' : 'error'}>
            {result && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {result.ok && <IconCheck width={16} height={16} />}
                {result.message}
              </span>
            )}
          </Notice>

          <div className="form-row">
            <div className="field">
              <label htmlFor="dateTime">Date &amp; time</label>
              <input
                id="dateTime"
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="serviceSelected">Service</label>
              <select
                id="serviceSelected"
                name="serviceSelected"
                value={form.serviceSelected}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose a service
                </option>
                {(services || []).map((s) => (
                  <option key={s.serviceId} value={s.serviceName}>
                    {s.serviceName}
                  </option>
                ))}
                {!services?.length && form.serviceSelected && (
                  <option value={form.serviceSelected}>
                    {form.serviceSelected}
                  </option>
                )}
              </select>
            </div>
          </div>

          <p className="form-card__subhead">Your contact address</p>

          <div className="form-row">
            <div className="field">
              <label htmlFor="streetNumber">Street number</label>
              <input
                id="streetNumber"
                name="streetNumber"
                value={form.streetNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="streetName">Street name</label>
              <input
                id="streetName"
                name="streetName"
                value={form.streetName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="suburb">Suburb</label>
              <input
                id="suburb"
                name="suburb"
                value={form.suburb}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={form.province}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a province
                </option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="postalCode">Postal code</label>
              <input
                id="postalCode"
                name="postalCode"
                inputMode="numeric"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes for your artist (optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Allergies, preferences, anything we should know…"
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Booking…' : 'Request appointment'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
