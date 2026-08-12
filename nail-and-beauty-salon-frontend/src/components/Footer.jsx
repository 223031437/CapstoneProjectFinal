import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer__grid">
      <div>
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">
            Terra<span className="brand__amp">&amp;</span>Bloom
          </span>
        </Link>
        <p className="site-footer__tag">
          A calm, gender-neutral studio for hands, feet and skin — considered
          rituals, unhurried care.
        </p>
      </div>

      <div>
        <h4 className="site-footer__heading">Explore</h4>
        <ul>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/book">Book a ritual</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="site-footer__heading">Studio</h4>
        <ul>
          <li><Link to="/contact">Contact &amp; hours</Link></li>
          <li><Link to="/admin">Staff portal</Link></li>
        </ul>
      </div>
    </div>

    <div className="container site-footer__bottom">
      <span>© {new Date().getFullYear()} Terra &amp; Bloom Nail &amp; Beauty Studio</span>
      <span>Built with care, for every kind of hand.</span>
    </div>
  </footer>
);

export default Footer;
