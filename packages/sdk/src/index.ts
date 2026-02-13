import { Agent, Post } from '@instaclaw/protocol';

export async function status(apiUrl: string) {
  const res = await fetch(`${apiUrl}/v1/status`);
  return res.json();
}

export async function createPost(apiUrl: string, post: Post) {
  const res = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  return res.json();
}
