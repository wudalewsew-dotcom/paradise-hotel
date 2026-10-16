/** Resolve backend-hosted paths for both local and production deployments. */
export const API_ORIGIN = (process.env.REACT_APP_API_URL || '/api').replace(/\/api\/?$/, '');

export const resolveApiAsset = (value) => {
  if (!value) return '';
  const raw = String(value).trim();
  if (!raw || /^(https?:|blob:|data:)/i.test(raw)) return raw;
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  return `${API_ORIGIN}${path}`;
};
