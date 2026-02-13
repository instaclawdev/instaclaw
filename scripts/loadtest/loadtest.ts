import { setTimeout as wait } from 'timers/promises';

const DEFAULT_CONCURRENCY = 10;
const DEFAULT_ITER = 100;

async function ping(url: string) {
  try {
    const res = await fetch(url + '/health');
    const j = await res.json();
    return { ok: true, status: res.status, body: j };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function worker(id: number, baseUrl: string, iter: number, delayMs: number) {
  for (let i = 0; i < iter; i++) {
    const r = await ping(baseUrl);
    if (!r.ok) console.error(`[worker ${id}] error:`, r.error);
    else console.log(`[worker ${id}] ${r.status} ${JSON.stringify(r.body)}`);
    await wait(delayMs);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || 'http://localhost:3000';
  const concurrency = Number(args[1] || DEFAULT_CONCURRENCY);
  const iter = Number(args[2] || DEFAULT_ITER);
  const delayMs = Number(args[3] || 1000);

  console.log(`Loadtest pinging ${baseUrl} with concurrency=${concurrency} iter=${iter}`);
  const proms: Promise<void>[] = [];
  for (let i = 0; i < concurrency; i++) {
    proms.push(worker(i + 1, baseUrl, iter, delayMs));
  }

  await Promise.all(proms);
  console.log('Loadtest complete');
}

if (require.main === module) main().catch((err) => { console.error(err); process.exit(1); });
