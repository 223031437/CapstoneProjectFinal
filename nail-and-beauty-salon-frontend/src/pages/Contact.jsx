import { useState } from 'react';
import useAsync from '../hooks/useAsync';
import { contactApi, inquiriesApi } from '../api/contact';
import { Notice } from '../components/UIState';
import { IconPin, IconPhone, IconMail, IconClock, IconCheck } from '../components/Icons';
import './FormPage.css';

const SUBJECTS = [
  { value: 'Human_Resource', label: 'Human resources' },
  { value: 'Customer_Feedback', label: 'Customer feedback' },
  { value: 'Billing_and_Accounts', label: 'Billing & accounts' },
  { value: 'Technical_Support', label: 'Technical support' },
  { value: 'Sales', label: 'Sales' },
];

const emptyForm = {
  fullName: '',
  email: '',
  phoneNumber: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const { data: contacts } = useAsync(() => contactApi.getAll(), []);
  const primaryContact = contacts?.[0];

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      await inquiriesApi.create(form);
      setResult({ ok: true, message: "Thanks — we've received your message and will reply soon." });
      setForm(emptyForm);
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
          <span className="eyebrow">We'd love to hear from you</span>
          <h1>Contact &amp; hours</h1>
          <p className="lede">
            Questions about a treatment, a booking, or just want to say
            hello — send a message and the studio will get back to you.
          </p>

          <div className="contact-facts">
            {primaryContact?.address && (
              <div className="contact-facts__item">
                <IconPin width={18} height={18} />
                <span>
                  {primaryContact.address.streetNumber}{' '}
                  {primaryContact.address.streetName},{' '}
                  {primaryContact.address.suburb}, {primaryContact.address.city}
                  <br />
                  {primaryContact.address.province}{' '}
                  {primaryContact.address.postalCode}
                </span>
              </div>
            )}
            {primaryContact?.phone && (
              <div className="contact-facts__item">
                <IconPhone width={18} height={18} />
                <span>{primaryContact.phone}</span>
              </div>
            )}
            {primaryContact?.email && (
              <div className="contact-facts__item">
                <IconMail width={18} height={18} />
                <span>{primaryContact.email}</span>
              </div>
            )}
            {primaryContact?.hours && (
              <div className="contact-facts__item">
                <IconClock width={18} height={18} />
                <span>Open from {primaryContact.hours}</span>
              </div>
            )}
            {!primaryContact && (
              <p style={{ color: 'var(--color-ink-soft)', fontSize: 14 }}>
                Studio contact details will appear here once published.
              </p>
            )}
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
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose a topic
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="How can we help?"
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
