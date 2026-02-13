import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const cfg = loadConfig();

async function main() {
  logger.info('jobs starting', { port: cfg.port });
  // Minimal jobs stub
  setInterval(() => logger.debug('jobs heartbeat'), 60_000);
}

if (require.main === module) {
  main().catch((err) => { logger.error(err); process.exit(1); });
}

export {};
