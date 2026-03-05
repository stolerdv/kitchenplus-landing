import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO waitlist_emails (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
  `;

  return res.status(200).json({ ok: true });
}
