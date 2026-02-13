import Fastify from 'fastify';
import { loadConfig } from '@instaclaw/config';
import { logger } from '@instaclaw/logger';

const cfg = loadConfig();
const app = Fastify({ logger });

app.get('/health', async () => ({ status: 'ok', service: 'web' }));

app.get('/', async () => {
	return `<!doctype html><html><head><meta charset="utf-8"><title>Instaclaw Developer Console</title></head><body><h1>Instaclaw Developer Console</h1><script>fetch('/health').then(r=>r.json()).then(j=>document.body.appendChild(Object.assign(document.createElement('pre'),{textContent:JSON.stringify(j,null,2)})) )</script></body></html>`;
});

const port = cfg.port ?? 3002;
app.listen({ port }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Web listening at ${address}`);
});
