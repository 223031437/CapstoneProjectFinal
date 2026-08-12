import { Link } from 'react-router-dom';
import ArchFrame from '../components/ArchFrame';
import useAsync from '../hooks/useAsync';
import { servicesApi } from '../api/services';
import { employeesApi } from '../api/employees';
import {
  IconSparkle,
  IconLeaf,
  IconHand,
  IconArrowRight,
  IconStar,
  IconDroplet,
} from '../components/Icons';
import './Home.css';

const VALUES = [
  {
    icon: <IconHand />,
    tone: 'clay',
    title: 'Precision, unhurried',
    body: 'Every ritual is paced to the person in the chair, not the clock — technical care with room to breathe.',
  },
  {
    icon: <IconLeaf />,
    tone: 'sage',
    title: 'Considered ingredients',
    body: 'We choose formulas for what they leave out as much as what they do — gentle on skin, kind to hands that work hard.',
  },
  {
    icon: <IconSparkle />,
    tone: 'ink',
    title: 'A space for everyone',
    body: 'No assumptions about who books what. Nail styling, skincare and grooming, open to all.',
  },
];

const Home = () => {
  const { data: services } = useAsync(() => servicesApi.getAll(), []);
  const { data: employees } = useAsync(() => employeesApi.getAll(), []);

  const previewServices = (services || []).slice(0, 3);
  const previewTeam = (employees || []).slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">A ritual for every hand</span>
            <h1>
              Calm hands,
              <br />
              clear skin, <em>quietly</em> done well.
            </h1>
            <p className="lede">
              Terra &amp; Bloom is a nail and beauty studio built around
              unhurried, precise care — from structured manicures to
              restorative skin treatments, for anyone who walks through the
              door.
            </p>
            <div className="hero__actions">
              <Link to="/book" className="btn btn-primary">
                Book a ritual <IconArrowRight width={16} height={16} />
              </Link>
              <Link to="/services" className="btn btn-ghost">
                View services
              </Link>
            </div>

            <div className="hero__stats">
              <div>
                <strong>6</strong>
                <span>treatment categories</span>
              </div>
              <div>
                <strong>1:1</strong>
                <span>paced appointments</span>
              </div>
              <div>
                <strong>Open</strong>
                <span>to every guest</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <ArchFrame
              tone="clay"
              size="lg"
              icon={<IconDroplet />}
              label="est. for hands &amp; skin"
              className="hero__arch"
            />
            <div className="hero__float card">
              <IconStar width={18} height={18} />
              <div>
                <strong>Considered, not rushed</strong>
                <span>Every booking gets a full, unshared slot.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Signature rituals</span>
            <h2>A few of the treatments on offer</h2>
          </div>

          {previewServices.length > 0 ? (
            <div className="preview-grid">
              {previewServices.map((s, i) => (
                <Link
                  to="/services"
                  className="service-preview-card"
                  key={s.serviceId || i}
                >
                  <ArchFrame
                    tone={['clay', 'sage', 'ink'][i % 3]}
                    size="sm"
                    icon={<IconSparkle />}
                  />
                  <h3>{s.serviceName || 'Service'}</h3>
                  <p>{s.description || s.category}</p>
                  {typeof s.price === 'number' && (
                    <span className="tag">from R{s.price}</span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="preview-grid preview-grid--placeholder">
              {['Nail styling', 'Skin restoration', 'Grooming rituals'].map(
                (t, i) => (
                  <div className="service-preview-card" key={t}>
                    <ArchFrame
                      tone={['clay', 'sage', 'ink'][i % 3]}
                      size="sm"
                      icon={<IconSparkle />}
                    />
                    <h3>{t}</h3>
                    <p>Full menu is on its way from the studio calendar.</p>
                  </div>
                )
              )}
            </div>
          )}

          <div className="section-cta">
            <Link to="/services" className="btn btn-ghost">
              See the full menu <IconArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why guests return</span>
            <h2>Care that's technical first, gentle always</h2>
          </div>
          <div className="values__grid">
            {VALUES.map((v) => (
              <div className="values__item" key={v.title}>
                <div className={`values__icon values__icon--${v.tone}`}>
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__row">
          <div>
            <span className="eyebrow" style={{ color: 'inherit' }}>
              Ready when you are
            </span>
            <h2>Reserve your next ritual</h2>
          </div>
          <Link to="/book" className="btn btn-primary btn-inverse">
            Book an appointment <IconArrowRight width={16} height={16} />
          </Link>
        </div>
      </section>

      {previewTeam.length > 0 && (
        <section className="section team-strip">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Behind the counter</span>
              <h2>Meet a few of the team</h2>
            </div>
            <div className="team-strip__row">
              {previewTeam.map((e, i) => (
                <div className="team-strip__item" key={e.userId || i}>
                  <ArchFrame
                    tone={['sage', 'clay', 'ink'][i % 3]}
                    size="sm"
                    icon={<IconHand />}
                  />
                  <strong>
                    {e.firstName} {e.lastName}
                  </strong>
                  <span>{e.role || 'Studio artist'}</span>
                </div>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/team" className="btn btn-ghost">
                Meet the full team <IconArrowRight width={16} height={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
