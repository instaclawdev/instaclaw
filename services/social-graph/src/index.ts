import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const app = Fastify({ logger });
const cfg = loadConfig();

app.get('/health', async () => ({ status: 'ok', service: 'social-graph' }));

app.get('/v1/edges', async () => ({ edges: [] }));

const port = cfg.port ?? 3101;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`social-graph listening at ${address}`);
});
