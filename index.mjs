import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('❌ ENV not loaded: Check .env format or dotenv config');
}

import express from 'express';
import submitDump from './submitDump.mjs';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🔥 EnataOS backend is live');
});

app.use('/api/submit-dump', submitDump);

const PORT = 80;
app.listen(PORT, () => {
  console.log('🔥 Listening on http://localhost');
});