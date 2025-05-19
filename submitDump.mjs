import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const supabase = createClient(
  'https://vvfljkimdmshmugvzmft.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2Zmxqa2ltZG1zaG11Z3Z6bWZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY3ODA1NywiZXhwIjoyMDYzMjU0MDU3fQ.b3_eg2q4kNzVT4YWk7Lef2Idn29M5rJMBwCeEybEZ8w'
);

router.post('/', async (req, res) => {
  const { rep_id, account_id, raw_text, transcription } = req.body;

  if (!rep_id || !account_id || !raw_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dump_id = uuidv4();
  const timestamp = new Date().toISOString();

  const { error } = await supabase
    .from('dumps')
    .insert([
      {
        id: dump_id,
        rep_id,
        account_id,
        raw_text,
        transcription: transcription || null,
        timestamp
      }
    ]);

  if (error) {
    console.error('Insert failed:', error);
    return res.status(500).json({ error: 'Insert to Supabase failed' });
  }

  return res.status(200).json({ success: true, dump_id });
});

export default router;

