async function main() {
  const moderationUrl = process.env.MOD_URL || 'http://localhost:3104';
  const res = await fetch(moderationUrl + '/v1/policy/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
  const j = await res.json();
  console.log('Moderation check result:', j);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
