import { useState, useEffect } from 'react';

export function useAssetUrl(key: string | null, apiUrl: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!key) return;

    setLoading(true);
    fetch(`${apiUrl}/api/assets/${encodeURIComponent(key)}`)
      .then((r) => r.json())
      .then((data) => setUrl(data.url))
      .finally(() => setLoading(false));
  }, [key]);

  return { url, loading };
}

export function useAssetUrls(keys: string[], apiUrl: string) {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keys.length === 0) return;

    setLoading(true);
    fetch(`${apiUrl}/api/assets/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys }),
    })
      .then((r) => r.json())
      .then((data) => setUrls(data.urls))
      .finally(() => setLoading(false));
  }, [keys.join(',')]);

  return { urls, loading };
}
