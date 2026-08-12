import { Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { servicesApi } from '../api/services';
import ArchFrame from '../components/ArchFrame';
import { Loading, EmptyState, Notice } from '../components/UIState';
import { IconSparkle, IconArrowRight } from '../components/Icons';
import './ListPage.css';

const TONES = ['clay', 'sage', 'ink'];

const Services = () => {
  const { data: services, loading, error } = useAsync(
    () => servicesApi.getAll(),
    []
  );

  return (
    <section className="section list-page">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">The menu</span>
          <h1>Services</h1>
          <p className="lede" style={{ margin: '0 auto' }}>
            Every treatment is booked as its own unhurried slot. Prices are a
            starting point — your artist will confirm before you sit down.
          </p>
        </div>

        {error && (
          <Notice type="error">
            Couldn't load services from the studio system: {error.message}
          </Notice>
        )}

        {loading && <Loading label="Gathering the menu…" />}

        {!loading && !error && (!services || services.length === 0) && (
          <EmptyState
            title="No services published yet"
            hint="Once the studio adds services, they'll appear here automatically."
          />
        )}

        {!loading && services && services.length > 0 && (
          <div className="entity-grid">
            {services.map((s, i) => (
              <div className="entity-card" key={s.serviceId || i}>
                <ArchFrame
                  tone={TONES[i % TONES.length]}
                  size="sm"
                  icon={<IconSparkle />}
                />
                <div className="entity-card__body">
                  <div className="entity-card__row">
                    <h3>{s.serviceName}</h3>
                    {typeof s.price === 'number' && (
                      <span className="tag">R{s.price}</span>
                    )}
                  </div>
                  {s.category && (
                    <span className="entity-card__meta">{s.category}</span>
                  )}
                  <p>{s.description}</p>
                  <Link
                    to="/book"
                    state={{ serviceSelected: s.serviceName }}
                    className="entity-card__link"
                  >
                    Book this ritual <IconArrowRight width={15} height={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
