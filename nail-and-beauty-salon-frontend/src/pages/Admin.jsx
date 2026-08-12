import { useState } from 'react';
import AdminEmployees from './admin/AdminEmployees';
import AdminServices from './admin/AdminServices';
import AdminProducts from './admin/AdminProducts';
import AdminAppointments from './admin/AdminAppointments';
import './Admin.css';

const TABS = [
  { key: 'appointments', label: 'Bookings', Comp: AdminAppointments },
  { key: 'employees', label: 'Team', Comp: AdminEmployees },
  { key: 'services', label: 'Services', Comp: AdminServices },
  { key: 'products', label: 'Products', Comp: AdminProducts },
];

const Admin = () => {
  const [active, setActive] = useState('appointments');
  const ActiveComp = TABS.find((t) => t.key === active).Comp;

  return (
    <section className="section admin-page">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Staff portal</span>
          <h1>Studio dashboard</h1>
          <p className="lede">
            Manage bookings, the team, the service menu and retail stock —
            all wired straight to the studio's Spring Boot backend. There's
            no login on this build; treat it as staff-only for now.
          </p>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`admin-tabs__btn ${active === t.key ? 'is-active' : ''}`}
              onClick={() => setActive(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <ActiveComp />
      </div>
    </section>
  );
};

export default Admin;
