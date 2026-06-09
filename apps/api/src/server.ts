import express from 'express';
import cors from 'cors';
import { getAssetUrls } from '@battleship/aws-utils';

const app = express();

// Allow your web app's origin
app.use(cors({
  origin: process.env.WEB_APP_URL ?? 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/api/assets/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const urls = await getAssetUrls([key], 300);
    res.json({ url: urls[key] ?? null });
  } catch (err) {
    console.warn('Asset URL generation failed:', (err as Error).message);
    res.json({ url: null });
  }
});

app.post('/api/assets/batch', async (req, res) => {
  try {
    const { keys } = req.body;
    const urls = await getAssetUrls(keys, 300);
    res.json({ urls });
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