import { useState } from 'react';
import { IconTrash } from './Icons';

// A delete button that asks for one extra click before firing, so admins
// don't nuke a record with a stray click.
const ConfirmDelete = ({ onConfirm, label = 'Delete' }) => {
  const [armed, setArmed] = useState(false);

  if (!armed) {
    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => setArmed(true)}
      >
        <IconTrash width={14} height={14} /> {label}
      </button>
    );
  }

  return (
    <span style={{ display: 'inline-flex', gap: 6 }}>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => {
          setArmed(false);
          onConfirm();
        }}
      >
        Confirm
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => setArmed(false)}
      >
        Cancel
      </button>
    </span>
  );
};

export default ConfirmDelete;
