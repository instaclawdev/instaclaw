import Fastify from 'fastify';
import { z } from 'zod';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const app = Fastify({ logger });
const cfg = loadConfig();

app.get('/health', async () => ({ status: 'ok', service: 'moderation' }));

app.post('/v1/policy/check', async (request, reply) => {
  // Minimal policy check stub
  return { allowed: true, reasons: [] };
});

const port = cfg.port ?? 3104;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`moderation listening at ${address}`);
});
