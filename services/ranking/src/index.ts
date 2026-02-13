import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const app = Fastify({ logger });
const cfg = loadConfig();

app.get('/health', async () => ({ status: 'ok', service: 'ranking' }));
app.get('/v1/rank', async () => ({ items: [] }));

const port = cfg.port ?? 3105;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`ranking listening at ${address}`);
});
