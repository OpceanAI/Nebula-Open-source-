import { z } from "zod";

// Bot Statistics Schema
export const BotStatsSchema = z.object({
  id: z.string(),
  servers: z.number(),
  users: z.number(),
  commands: z.number(),
  uptime: z.string(),
  memoryUsage: z.number(),
  status: z.enum(["online", "offline", "maintenance"]),
  lastUpdated: z.date(),
});

// Command Category Schema
export const CommandCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
  description: z.string(),
  commandCount: z.number(),
  color: z.string(),
  enabled: z.boolean(),
  createdAt: z.date(),
});

// Activity Log Schema
export const ActivityLogSchema = z.object({
  id: z.string(),
  type: z.enum(["command", "moderation", "system", "join", "leave"]),
  emoji: z.string(),
  message: z.string(),
  serverName: z.string(),
  timestamp: z.date(),
  details: z.string().optional(),
});

// System Status Schema
export const SystemStatusSchema = z.object({
  id: z.string(),
  service: z.string(),
  status: z.enum(["healthy", "warning", "error"]),
  message: z.string(),
  lastCheck: z.date(),
});

// Popular Command Schema
export const PopularCommandSchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
  uses: z.number(),
  category: z.string(),
});

// User Schema (for dashboard users)
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  isAdmin: z.boolean(),
  lastLogin: z.date(),
});

// Guild Configuration Schema
export const GuildConfigSchema = z.object({
  id: z.string(),
  guildId: z.string(),
  guildName: z.string(),
  prefix: z.string(),
  language: z.string(),
  welcomeChannel: z.string().optional(),
  modChannel: z.string().optional(),
  automod: z.boolean(),
  economy: z.boolean(),
  leveling: z.boolean(),
  music: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Discord Bot User Schema
export const DiscordUserSchema = z.object({
  id: z.string(),
  discordId: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string().optional(),
  xp: z.number().default(0),
  level: z.number().default(1),
  coins: z.number().default(100),
  reputation: z.number().default(0),
  lastDaily: z.date().optional(),
  profile: z.object({
    bio: z.string().optional(),
    color: z.string().optional(),
    badges: z.array(z.string()).default([]),
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Insert schemas
export const insertBotStatsSchema = BotStatsSchema.omit({ id: true, lastUpdated: true });
export const insertCommandCategorySchema = CommandCategorySchema.omit({ id: true, createdAt: true });
export const insertActivityLogSchema = ActivityLogSchema.omit({ id: true });
export const insertSystemStatusSchema = SystemStatusSchema.omit({ id: true, lastCheck: true });
export const insertPopularCommandSchema = PopularCommandSchema.omit({ id: true });
export const insertUserSchema = UserSchema.omit({ id: true, lastLogin: true });
export const insertGuildConfigSchema = GuildConfigSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertDiscordUserSchema = DiscordUserSchema.omit({ id: true, createdAt: true, updatedAt: true });

// Types
export type BotStats = z.infer<typeof BotStatsSchema>;
export type CommandCategory = z.infer<typeof CommandCategorySchema>;
export type ActivityLog = z.infer<typeof ActivityLogSchema>;
export type SystemStatus = z.infer<typeof SystemStatusSchema>;
export type PopularCommand = z.infer<typeof PopularCommandSchema>;
export type User = z.infer<typeof UserSchema>;
export type GuildConfig = z.infer<typeof GuildConfigSchema>;
export type DiscordUser = z.infer<typeof DiscordUserSchema>;

export type InsertBotStats = z.infer<typeof insertBotStatsSchema>;
export type InsertCommandCategory = z.infer<typeof insertCommandCategorySchema>;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type InsertSystemStatus = z.infer<typeof insertSystemStatusSchema>;
export type InsertPopularCommand = z.infer<typeof insertPopularCommandSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertGuildConfig = z.infer<typeof insertGuildConfigSchema>;
export type InsertDiscordUser = z.infer<typeof insertDiscordUserSchema>;
