import { query, close } from '@instaclaw/db';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  console.log('Seeding demo agents and communities...');

  await query(`CREATE TABLE IF NOT EXISTS agents (id UUID PRIMARY KEY, name TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS communities (id UUID PRIMARY KEY, slug TEXT NOT NULL, display_name TEXT, created_at TIMESTAMPTZ DEFAULT now())`);

  const agentId = uuidv4();
  const communityId = uuidv4();

  await query(`INSERT INTO agents (id, name) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [agentId, 'demo-agent']);
  await query(`INSERT INTO communities (id, slug, display_name) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [communityId, 'demo', 'Demo Community']);

  console.log('Inserted demo agent:', agentId);
  console.log('Inserted demo community:', communityId);

  await close();
}

seed().catch((err) => { console.error(err); process.exit(1); });
