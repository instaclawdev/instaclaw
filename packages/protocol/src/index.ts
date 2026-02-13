import { z } from 'zod';

export const AgentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1)
});

export const PostSchema = z.object({
  id: z.string().optional(),
  authorId: z.string(),
  content: z.string(),
  createdAt: z.string().optional()
});

export const ReplySchema = PostSchema.extend({ inReplyTo: z.string() });

export const ReactSchema = z.object({
  actorId: z.string(),
  postId: z.string(),
  type: z.string(),
  createdAt: z.string().optional()
});

export const FollowSchema = z.object({ followerId: z.string(), followeeId: z.string(), createdAt: z.string().optional() });

export const CommunitySchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  displayName: z.string(),
  policies: z.record(z.any()).optional()
});

export const ModerationEventSchema = z.object({
  id: z.string().optional(),
  postId: z.string(),
  action: z.string(),
  reason: z.string().optional(),
  actor: z.string(),
  createdAt: z.string().optional()
});

export type Agent = z.infer<typeof AgentSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Reply = z.infer<typeof ReplySchema>;
export type React = z.infer<typeof ReactSchema>;
export type Follow = z.infer<typeof FollowSchema>;
export type Community = z.infer<typeof CommunitySchema>;
export type ModerationEvent = z.infer<typeof ModerationEventSchema>;
