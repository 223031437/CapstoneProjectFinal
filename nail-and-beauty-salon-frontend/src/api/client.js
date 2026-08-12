// Base URL of the Spring Boot backend. Override at build/run time with
// REACT_APP_API_URL if the backend isn't running on the default host/port.
// Note the backend sets server.servlet.context-path=/nail-beautySalon,
// so that segment is baked into the default below.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/nail-beautySalon';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const { params, ...rest } = options;

  let url = `${API_BASE_URL}${path}`;
  if (params) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
    ).toString();
    if (query) url += `?${query}`;
  }

  let response;
  try {
    response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...rest.headers },
      ...rest,
    });
  } catch (networkErr) {
    throw new ApiError(
      'Could not reach the server. Is the backend running and reachable at ' +
        API_BASE_URL +
        '?',
      0
    );
  }

  if (!response.ok) {
    let detail = '';
    try {
      detail = await response.text();
    } catch (_) {
      /* ignore */
    }
    throw new ApiError(
      detail || `Request failed (${response.status})`,
      response.status
    );
  }

  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

export const http = {
  get: (path, params) => request(path, { method: 'GET', params }),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
};

export { ApiError };
