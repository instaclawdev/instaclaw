import pino from 'pino';

const instance = pino({ level: process.env.LOG_LEVEL ?? 'info' });

export const logger = instance;
export default logger;
