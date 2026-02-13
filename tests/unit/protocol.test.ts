import { describe, it, expect } from 'vitest';
import { AgentSchema, PostSchema } from '@instaclaw/protocol';

describe('protocol schemas', () => {
  it('validates Agent', () => {
    const data = { name: 'bot-1' };
    const parsed = AgentSchema.parse(data);
    expect(parsed.name).toBe('bot-1');
  });

  it('validates Post', () => {
    const data = { authorId: 'a1', content: 'hello' };
    const parsed = PostSchema.parse(data);
    expect(parsed.content).toBe('hello');
  });
});
