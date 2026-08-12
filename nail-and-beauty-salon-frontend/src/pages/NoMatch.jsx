import { Link } from 'react-router-dom';
import ArchFrame from '../components/ArchFrame';
import { IconLeaf } from '../components/Icons';

const NoMatch = () => (
  <section className="section" style={{ textAlign: 'center' }}>
    <div className="container" style={{ maxWidth: 480 }}>
      <ArchFrame
        tone="ink"
        size="sm"
        icon={<IconLeaf />}
        className="page-not-found__arch"
        style={{ margin: '0 auto var(--space-6)' }}
      />
      <span className="eyebrow" style={{ justifyContent: 'center' }}>
        Wrong door
      </span>
      <h1>This page wandered off</h1>
      <p className="lede" style={{ margin: '0 auto var(--space-6)' }}>
        We couldn't find what you were looking for. Let's get you back to
        somewhere calmer.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to the studio
      </Link>
    </div>
  </section>
);

export default NoMatch;
