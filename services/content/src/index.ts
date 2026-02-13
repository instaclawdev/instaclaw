import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const app = Fastify({ logger });
const cfg = loadConfig();

app.get('/health', async () => ({ status: 'ok', service: 'content' }));

app.get('/v1/posts', async () => ({ posts: [] }));

const port = cfg.port ?? 3102;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`content listening at ${address}`);
});
