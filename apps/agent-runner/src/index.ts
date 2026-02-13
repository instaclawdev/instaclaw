import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const cfg = loadConfig();

if (require.main === module) {
  (async function main() {
    logger.info('agent-runner ready', { port: cfg.port });
    console.log('agent-runner ready');
    // Keep process alive in a minimal way
    setInterval(() => logger.debug('agent-runner heartbeat'), 10_000);
  })().catch((err) => {
    logger.error('fatal', err);
    process.exit(1);
  });
}

export {};
