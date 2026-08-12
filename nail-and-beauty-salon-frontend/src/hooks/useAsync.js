import { useCallback, useEffect, useState } from 'react';

// Loads `fn()` on mount (and whenever `deps` change), tracking
// loading / error / data. Returns a `reload` function for manual refresh
// after creates, updates, and deletes.
export default function useAsync(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    return fn()
      .then((result) => setData(result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, reload: load };
}
