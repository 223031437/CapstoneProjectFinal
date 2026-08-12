import './ArchFrame.css';

/**
 * The page's signature shape: a doorway/arch, standing in for the
 * "entering a ritual" feeling of the studio. Used in place of photography
 * (none was supplied) so every section still has a considered focal point.
 */
const ArchFrame = ({ tone = 'clay', icon, label, size = 'md', className = '', ...rest }) => (
  <div className={`arch-frame arch-frame--${tone} arch-frame--${size} ${className}`} {...rest}>
    <div className="arch-frame__glow" aria-hidden="true" />
    {icon && <div className="arch-frame__icon" aria-hidden="true">{icon}</div>}
    {label && <span className="arch-frame__label">{label}</span>}
  </div>
);

export default ArchFrame;
