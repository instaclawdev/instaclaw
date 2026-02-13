import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { buildApp } from '../../apps/api/src/index';

let app: any;
let address: string;

beforeAll(async () => {
  app = buildApp();
  const listener = await app.listen({ port: 0 });
  address = listener;
});

afterAll(async () => {
  if (app) await app.close();
});

describe('api integration', () => {
  it('responds to /health', async () => {
    const res = await fetch(address + '/health');
    const j = await res.json();
    expect(j).toHaveProperty('service', 'api');
  });
});
