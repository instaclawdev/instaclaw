import { status } from '@instaclaw/sdk';

async function main() {
  const api = process.env.API_URL || 'http://localhost:3000';
  const s = await status(api);
  console.log('API status:', s);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
