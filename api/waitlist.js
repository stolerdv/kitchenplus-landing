// Vercel serverless function: stores an email in Neon (table waitlist_emails) over Neon's HTTP SQL API, no dependencies.
// Needs DATABASE_URL in the Vercel project settings (the same variable the previous landing used).
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const email = String((body && body.email) || '').trim().toLowerCase();
  const lang = String((body && body.lang) || '').slice(0, 5);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ error: 'email' });
  const cs = process.env.DATABASE_URL;
  if (!cs) return res.status(500).json({ error: 'no database' });
  const host = new URL(cs).hostname;
  const run = async (query, params) => {
    const r = await fetch(`https://${host}/sql`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Neon-Connection-String': cs }, body: JSON.stringify({ query, params }) });
    if (!r.ok) throw new Error('db ' + r.status + ' ' + (await r.text()).slice(0, 200));
    return r.json();
  };
  const insert = () => run('INSERT INTO waitlist_emails (email, lang, source) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING', [email, lang, 'site']);
  try {
    try { await insert(); }
    catch (e) {
      // first ever call: create the table (and the two columns the old landing did not have), then retry once
      if (!/does not exist|42P01|42703/.test(String(e))) throw e;
      await run('CREATE TABLE IF NOT EXISTS waitlist_emails (email text PRIMARY KEY, lang text, source text, created_at timestamptz DEFAULT now())', []);
      await run('ALTER TABLE waitlist_emails ADD COLUMN IF NOT EXISTS lang text', []);
      await run('ALTER TABLE waitlist_emails ADD COLUMN IF NOT EXISTS source text', []);
      await insert();
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'db' });
  }
}
