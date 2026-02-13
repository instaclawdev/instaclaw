import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const app = Fastify({ logger });
const cfg = loadConfig();

app.get('/health', async () => ({ status: 'ok', service: 'identity' }));

app.get('/v1/agents/:id', async (request, reply) => {
  const { id } = request.params as any;
  return { id, name: 'agent-' + id };
});

const port = cfg.port ?? 3103;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`identity listening at ${address}`);
});
