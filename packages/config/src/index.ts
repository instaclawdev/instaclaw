import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional()
});

export type Config = {
  env: string;
  port?: number;
  databaseUrl?: string;
  redisUrl?: string;
};

export function loadConfig(): Config {
  const parsed = EnvSchema.parse(process.env);
  return {
    env: parsed.NODE_ENV ?? 'development',
    port: parsed.PORT ? Number(parsed.PORT) : undefined,
    databaseUrl: parsed.DATABASE_URL,
    redisUrl: parsed.REDIS_URL
  };
}

export const getConfig = loadConfig;
