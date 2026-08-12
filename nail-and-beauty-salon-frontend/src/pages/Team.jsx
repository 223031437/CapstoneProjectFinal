import useAsync from '../hooks/useAsync';
import { employeesApi } from '../api/employees';
import ArchFrame from '../components/ArchFrame';
import { Loading, EmptyState, Notice } from '../components/UIState';
import { IconHand, IconMail, IconPhone } from '../components/Icons';
import './ListPage.css';

const TONES = ['ink', 'clay', 'sage'];

const Team = () => {
  const { data: employees, loading, error } = useAsync(
    () => employeesApi.getAll(),
    []
  );

  return (
    <section className="section list-page">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Behind the counter</span>
          <h1>The team</h1>
          <p className="lede" style={{ margin: '0 auto' }}>
            Trained hands, steady pace. Every artist at Terra &amp; Bloom
            works from the same unhurried standard.
          </p>
        </div>

        {error && (
          <Notice type="error">
            Couldn't load the team from the studio system: {error.message}
          </Notice>
        )}

        {loading && <Loading label="Introducing the team…" />}

        {!loading && !error && (!employees || employees.length === 0) && (
          <EmptyState
            title="No team members published yet"
            hint="Once the studio adds staff, they'll appear here automatically."
          />
        )}

        {!loading && employees && employees.length > 0 && (
          <div className="entity-grid">
            {employees.map((e, i) => (
              <div className="entity-card" key={e.userId || i}>
                <ArchFrame
                  tone={TONES[i % TONES.length]}
                  size="sm"
                  icon={<IconHand />}
                />
                <div className="entity-card__body">
                  <div className="entity-card__row">
                    <h3>
                      {e.firstName} {e.lastName}
                    </h3>
                  </div>
                  {e.role && (
                    <span className="entity-card__meta">{e.role}</span>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                    {e.email && (
                      <span className="entity-card__link" style={{ color: 'var(--color-ink-soft)' }}>
                        <IconMail width={14} height={14} /> {e.email}
                      </span>
                    )}
                    {e.cellNumber && (
                      <span className="entity-card__link" style={{ color: 'var(--color-ink-soft)' }}>
                        <IconPhone width={14} height={14} /> {e.cellNumber}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
