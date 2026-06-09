import express from 'express';
import cors from 'cors';
import { getAssetUrls } from '@battleship/aws-utils';

const app = express();

app.use(cors({
  origin: process.env.WEB_APP_URL ?? 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// In-memory cache for presigned URLs (S3 URLs expire in 300s, cache for 240s)
const cache = new Map<string, { url: string; expiresAt: number }>();
const CACHE_TTL_MS = 240_000;

function getCachedUrls(keys: string[]): Record<string, string | null> {
  const now = Date.now();
  const result: Record<string, string | null> = {};
  const misses: string[] = [];

  for (const key of keys) {
    const entry = cache.get(key);
    if (entry && entry.expiresAt > now) {
      result[key] = entry.url;
    } else {
      misses.push(key);
    }
  }

  return { ...result, _misses: misses } as any;
}

async function fetchAndCache(keys: string[]): Promise<Record<string, string | null>> {
  const urls = await getAssetUrls(keys, 300);
  const expiresAt = Date.now() + CACHE_TTL_MS;

  for (const key of keys) {
    if (urls[key]) {
      cache.set(key, { url: urls[key], expiresAt });
    }
  }

  return urls;
}

app.get('/api/assets/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { _misses, ...cached } = getCachedUrls([key]);
    if (_misses.length === 0) {
      return res.json({ url: cached[key] ?? null });
    }
    const urls = await fetchAndCache(_misses);
    res.json({ url: urls[key] ?? null });
  } catch (err) {
    console.warn('Asset URL generation failed:', (err as Error).message);
    res.json({ url: null });
  }
});

app.post('/api/assets/batch', async (req, res) => {
  try {
    const { keys } = req.body;
    const { _misses, ...cached } = getCachedUrls(keys ?? []);
    if (_misses.length === 0) {
      return res.json({ urls: cached });
    }
    const fresh = await fetchAndCache(_misses);
    res.json({ urls: { ...cached, ...fresh } });
  } catch (err) {
    console.warn('Asset URL generation failed:', (err as Error).message);
    const nullUrls: Record<string, null> = {};
    for (const key of req.body.keys ?? []) {
      nullUrls[key] = null;
    }
    res.json({ urls: nullUrls });
  }
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));