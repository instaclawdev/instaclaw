import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

export function buildApp() {
  const app = Fastify({ logger });

  app.get('/health', async () => ({ status: 'ok', service: 'api' }));

  app.get('/v1/status', async () => ({ service: 'api', uptime: process.uptime() }));

  return app;
}

if (require.main === module) {
  const cfg = loadConfig();
  const app = buildApp();
  const port = cfg.port ?? 3000;
  app.listen({ port }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`API listening at ${address}`);
  });
}
