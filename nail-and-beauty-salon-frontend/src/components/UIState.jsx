export const Loading = ({ label = 'Loading…' }) => (
  <p className="skeleton">{label}</p>
);

export const EmptyState = ({ title, hint }) => (
  <div className="empty-state">
    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-ink)' }}>{title}</p>
    {hint && <p style={{ margin: '6px 0 0', fontSize: 14 }}>{hint}</p>}
  </div>
);

export const Notice = ({ type = 'success', children }) =>
  children ? <div className={`notice notice-${type}`}>{children}</div> : null;
