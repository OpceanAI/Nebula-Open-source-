import { Request, Response, Router } from "express";
import { storage } from "./storage";
import { 
  insertBotStatsSchema,
  insertCommandCategorySchema,
  insertActivityLogSchema,
  insertSystemStatusSchema,
  insertUserSchema,
  insertGuildConfigSchema,
  insertDiscordUserSchema
} from "@shared/schema";

const router = Router();

// Bot Stats Routes
router.get("/api/bot/stats", async (req: Request, res: Response) => {
  try {
    const stats = await storage.getBotStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bot statistics *susurra* something went wrong uwu" });
  }
});

router.put("/api/bot/stats", async (req: Request, res: Response) => {
  try {
    const validatedStats = insertBotStatsSchema.parse(req.body);
    const stats = await storage.updateBotStats(validatedStats);
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: "Invalid stats data 🥺 please check your input~" });
  }
});

// Command Categories Routes
router.get("/api/commands/categories", async (req: Request, res: Response) => {
  try {
    const categories = await storage.getCommandCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch command categories *whispers* try again later uwu" });
  }
});

router.post("/api/commands/categories", async (req: Request, res: Response) => {
  try {
    const validatedCategory = insertCommandCategorySchema.parse(req.body);
    const category = await storage.createCommandCategory(validatedCategory);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Invalid category data 🌸 please check your kawaii input~" });
  }
});

router.put("/api/commands/categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedCategory = insertCommandCategorySchema.partial().parse(req.body);
    const category = await storage.updateCommandCategory(id, validatedCategory);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to update category 🥺 *shy* something went wrong" });
  }
});

router.delete("/api/commands/categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await storage.deleteCommandCategory(id);
    if (success) {
      res.json({ message: "Category deleted successfully ✨ *whispers* goodbye~" });
    } else {
      res.status(404).json({ error: "Category not found 🌙 maybe it's hiding?" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category 💫 please try again uwu" });
  }
});

// Activity Logs Routes
router.get("/api/activity", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const activities = await storage.getRecentActivity(limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity logs *susurra* the logs are being shy~" });
  }
});

router.post("/api/activity", async (req: Request, res: Response) => {
  try {
    const validatedActivity = insertActivityLogSchema.parse(req.body);
    const activity = await storage.createActivityLog(validatedActivity);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: "Invalid activity data 🌸 please check your kawaii log entry~" });
  }
});

// System Status Routes
router.get("/api/system/status", async (req: Request, res: Response) => {
  try {
    const statuses = await storage.getSystemStatus();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system status 💖 *worried* can't check the systems uwu" });
  }
});

router.put("/api/system/status/:service", async (req: Request, res: Response) => {
  try {
    const { service } = req.params;
    const validatedStatus = insertSystemStatusSchema.parse(req.body);
    const status = await storage.updateSystemStatus(service, validatedStatus);
    res.json(status);
  } catch (error) {
    res.status(400).json({ error: "Invalid status data 🥺 *shy* please check your kawaii status~" });
  }
});

// Popular Commands Routes
router.get("/api/commands/popular", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const commands = await storage.getPopularCommands(limit);
    res.json(commands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular commands ✨ *whispers* they're hiding~" });
  }
});

router.post("/api/commands/usage/:command", async (req: Request, res: Response) => {
  try {
    const { command } = req.params;
    await storage.updateCommandUsage(command);
    res.json({ message: "Command usage updated 🌸 *happy* counting kawaii interactions~" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update command usage 💫 try again uwu" });
  }
});

// User Routes
router.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await storage.getUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found 🌙 *susurra* maybe they're being shy?" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user 🥺 please try again~" });
  }
});

router.post("/api/users", async (req: Request, res: Response) => {
  try {
    const validatedUser = insertUserSchema.parse(req.body);
    const user = await storage.createUser(validatedUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid user data 🌸 please check your kawaii profile~" });
  }
});

// Guild Configuration Routes
router.get("/api/guilds", async (req: Request, res: Response) => {
  try {
    const guilds = await storage.getGuildConfigs();
    res.json(guilds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guild configs *whispers* the servers are being shy uwu" });
  }
});

router.get("/api/guilds/:guildId", async (req: Request, res: Response) => {
  try {
    const { guildId } = req.params;
    const guild = await storage.getGuildConfig(guildId);
    if (guild) {
      res.json(guild);
    } else {
      res.status(404).json({ error: "Guild config not found 🌙 *susurra* maybe it's hiding?" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guild config 💫 please try again uwu" });
  }
});

router.post("/api/guilds", async (req: Request, res: Response) => {
  try {
    const validatedConfig = insertGuildConfigSchema.parse(req.body);
    const config = await storage.createGuildConfig(validatedConfig);
    res.status(201).json(config);
  } catch (error) {
    res.status(400).json({ error: "Invalid guild config 🥺 please check your kawaii server settings~" });
  }
});

router.put("/api/guilds/:guildId", async (req: Request, res: Response) => {
  try {
    const { guildId } = req.params;
    const validatedConfig = insertGuildConfigSchema.partial().parse(req.body);
    const config = await storage.updateGuildConfig(guildId, validatedConfig);
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: "Failed to update guild config ✨ *shy* something went wrong~" });
  }
});

// Discord User Routes
router.get("/api/discord/users/:discordId", async (req: Request, res: Response) => {
  try {
    const { discordId } = req.params;
    const user = await storage.getDiscordUser(discordId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Discord user not found 🌸 *whispers* maybe they're new?~" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Discord user 🥺 please try again uwu" });
  }
});

router.post("/api/discord/users", async (req: Request, res: Response) => {
  try {
    const validatedUser = insertDiscordUserSchema.parse(req.body);
    const user = await storage.createDiscordUser(validatedUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid Discord user data 💫 please check your kawaii profile~" });
  }
});

router.put("/api/discord/users/:discordId", async (req: Request, res: Response) => {
  try {
    const { discordId } = req.params;
    const validatedUser = insertDiscordUserSchema.partial().parse(req.body);
    const user = await storage.updateDiscordUser(discordId, validatedUser);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update Discord user ✨ *shy* something went wrong~" });
  }
});

export default router;
