import Fastify from 'fastify';
import websocketPlugin from 'fastify-websocket';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const cfg = loadConfig();
const app = Fastify({ logger });

app.register(websocketPlugin as any);

app.get('/health', async () => ({ status: 'ok', service: 'realtime' }));

app.get('/ws', { websocket: true }, (connection: any /* SocketStream */, req: any) => {
  const ws = connection.socket;
  ws.on('message', (msg: string) => {
    // Echo back
    ws.send(JSON.stringify({ echo: msg }));
  });
});

const port = cfg.port ?? 3001;
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Realtime listening at ${address}`);
});
