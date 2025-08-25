import type { 
  BotStats, 
  CommandCategory, 
  ActivityLog, 
  SystemStatus, 
  PopularCommand, 
  User, 
  GuildConfig,
  DiscordUser,
  InsertBotStats,
  InsertCommandCategory,
  InsertActivityLog,
  InsertSystemStatus,
  InsertPopularCommand,
  InsertUser,
  InsertGuildConfig,
  InsertDiscordUser
} from "@shared/schema";

export interface IStorage {
  // Bot Stats
  getBotStats(): Promise<BotStats | null>;
  updateBotStats(stats: InsertBotStats): Promise<BotStats>;

  // Command Categories
  getCommandCategories(): Promise<CommandCategory[]>;
  createCommandCategory(category: InsertCommandCategory): Promise<CommandCategory>;
  updateCommandCategory(id: string, category: Partial<InsertCommandCategory>): Promise<CommandCategory>;
  deleteCommandCategory(id: string): Promise<boolean>;

  // Activity Logs
  getRecentActivity(limit?: number): Promise<ActivityLog[]>;
  createActivityLog(activity: InsertActivityLog): Promise<ActivityLog>;

  // System Status
  getSystemStatus(): Promise<SystemStatus[]>;
  updateSystemStatus(service: string, status: InsertSystemStatus): Promise<SystemStatus>;

  // Popular Commands
  getPopularCommands(limit?: number): Promise<PopularCommand[]>;
  updateCommandUsage(commandName: string): Promise<void>;

  // Users
  getUser(id: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;

  // Guild Configurations
  getGuildConfigs(): Promise<GuildConfig[]>;
  getGuildConfig(guildId: string): Promise<GuildConfig | null>;
  createGuildConfig(config: InsertGuildConfig): Promise<GuildConfig>;
  updateGuildConfig(guildId: string, config: Partial<InsertGuildConfig>): Promise<GuildConfig>;

  // Discord Users
  getDiscordUser(discordId: string): Promise<DiscordUser | null>;
  createDiscordUser(user: InsertDiscordUser): Promise<DiscordUser>;
  updateDiscordUser(discordId: string, user: Partial<InsertDiscordUser>): Promise<DiscordUser>;
}

class MemStorage implements IStorage {
  private botStats: BotStats | null = null;
  private commandCategories: CommandCategory[] = [];
  private activityLogs: ActivityLog[] = [];
  private systemStatuses: SystemStatus[] = [];
  private popularCommands: PopularCommand[] = [];
  private users: User[] = [];
  private guildConfigs: GuildConfig[] = [];
  private discordUsers: DiscordUser[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with default kawaii bot data
    this.botStats = {
      id: "1",
      servers: 42,
      users: 15847,
      commands: 133,
      uptime: "99.9%",
      memoryUsage: 73,
      status: "online",
      lastUpdated: new Date(),
    };

    this.commandCategories = [
      {
        id: "1",
        name: "Music",
        emoji: "🎵",
        description: "*susurra* Play your favorite songs uwu",
        commandCount: 12,
        color: "kawaii-pink",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Moderation",
        emoji: "🛡️",
        description: "Keep your server safe and cozy 🥺",
        commandCount: 18,
        color: "kawaii-lavender",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Economy",
        emoji: "💰",
        description: "Earn kawaii coins and trade~ ✨",
        commandCount: 25,
        color: "kawaii-mint",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Fun & Games",
        emoji: "🎮",
        description: "Play games and have fun together 💫",
        commandCount: 31,
        color: "kawaii-peach",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Utility",
        emoji: "🔧",
        description: "*whispers* Helpful tools for your server~",
        commandCount: 15,
        color: "kawaii-sky",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Image",
        emoji: "🖼️",
        description: "Create and edit kawaii images 🌸",
        commandCount: 8,
        color: "kawaii-pink",
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: "7",
        name: "Anime",
        emoji: "🌸",
        description: "*excited* All things anime and manga uwu",
        commandCount: 14,
        color: "kawaii-lavender",
        enabled: true,
        createdAt: new Date(),
      },
    ];

    this.activityLogs = [
      {
        id: "1",
        type: "command",
        emoji: "🎵",
        message: "Music command used in Kawaii Server",
        serverName: "Kawaii Server",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        details: "someone played a cute song~",
      },
      {
        id: "2",
        type: "moderation",
        emoji: "🛡️",
        message: "AutoMod detected spam in Gaming Hub",
        serverName: "Gaming Hub",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        details: "handled automatically uwu",
      },
      {
        id: "3",
        type: "join",
        emoji: "⭐",
        message: "New server joined: Anime Lovers",
        serverName: "Anime Lovers",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        details: "*excited* new friends! 🥺",
      },
    ];

    this.systemStatuses = [
      {
        id: "1",
        service: "Bot Status",
        status: "healthy",
        message: "Healthy 🌸",
        lastCheck: new Date(),
      },
      {
        id: "2",
        service: "Database",
        status: "healthy",
        message: "Connected ✨",
        lastCheck: new Date(),
      },
      {
        id: "3",
        service: "Lavalink",
        status: "healthy",
        message: "Online 🎵",
        lastCheck: new Date(),
      },
      {
        id: "4",
        service: "Memory Usage",
        status: "warning",
        message: "73% 🥺",
        lastCheck: new Date(),
      },
    ];

    this.popularCommands = [
      {
        id: "1",
        name: "/play",
        emoji: "🎵",
        uses: 1247,
        category: "Music",
      },
      {
        id: "2",
        name: "/balance",
        emoji: "💰",
        uses: 956,
        category: "Economy",
      },
      {
        id: "3",
        name: "/trivia",
        emoji: "🎮",
        uses: 743,
        category: "Fun & Games",
      },
      {
        id: "4",
        name: "/rank",
        emoji: "📊",
        uses: 621,
        category: "Leveling",
      },
    ];

    this.users = [
      {
        id: "1",
        username: "Kawaii Admin",
        avatar: "👤",
        isAdmin: true,
        lastLogin: new Date(),
      },
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  async getBotStats(): Promise<BotStats | null> {
    return this.botStats;
  }

  async updateBotStats(stats: InsertBotStats): Promise<BotStats> {
    this.botStats = {
      id: this.botStats?.id || "1",
      ...stats,
      lastUpdated: new Date(),
    };
    return this.botStats;
  }

  async getCommandCategories(): Promise<CommandCategory[]> {
    return this.commandCategories;
  }

  async createCommandCategory(category: InsertCommandCategory): Promise<CommandCategory> {
    const newCategory: CommandCategory = {
      id: this.generateId(),
      ...category,
      createdAt: new Date(),
    };
    this.commandCategories.push(newCategory);
    return newCategory;
  }

  async updateCommandCategory(id: string, category: Partial<InsertCommandCategory>): Promise<CommandCategory> {
    const index = this.commandCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Category not found");
    
    this.commandCategories[index] = { ...this.commandCategories[index], ...category };
    return this.commandCategories[index];
  }

  async deleteCommandCategory(id: string): Promise<boolean> {
    const index = this.commandCategories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.commandCategories.splice(index, 1);
    return true;
  }

  async getRecentActivity(limit: number = 10): Promise<ActivityLog[]> {
    return this.activityLogs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createActivityLog(activity: InsertActivityLog): Promise<ActivityLog> {
    const newActivity: ActivityLog = {
      id: this.generateId(),
      ...activity,
    };
    this.activityLogs.push(newActivity);
    return newActivity;
  }

  async getSystemStatus(): Promise<SystemStatus[]> {
    return this.systemStatuses;
  }

  async updateSystemStatus(service: string, status: InsertSystemStatus): Promise<SystemStatus> {
    const index = this.systemStatuses.findIndex(s => s.service === service);
    const newStatus: SystemStatus = {
      id: index >= 0 ? this.systemStatuses[index].id : this.generateId(),
      service,
      ...status,
      lastCheck: new Date(),
    };
    
    if (index >= 0) {
      this.systemStatuses[index] = newStatus;
    } else {
      this.systemStatuses.push(newStatus);
    }
    
    return newStatus;
  }

  async getPopularCommands(limit: number = 10): Promise<PopularCommand[]> {
    return this.popularCommands
      .sort((a, b) => b.uses - a.uses)
      .slice(0, limit);
  }

  async updateCommandUsage(commandName: string): Promise<void> {
    const command = this.popularCommands.find(c => c.name === commandName);
    if (command) {
      command.uses += 1;
    }
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.generateId(),
      ...user,
      lastLogin: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async getGuildConfigs(): Promise<GuildConfig[]> {
    return this.guildConfigs;
  }

  async getGuildConfig(guildId: string): Promise<GuildConfig | null> {
    return this.guildConfigs.find(g => g.guildId === guildId) || null;
  }

  async createGuildConfig(config: InsertGuildConfig): Promise<GuildConfig> {
    const newConfig: GuildConfig = {
      id: this.generateId(),
      ...config,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.guildConfigs.push(newConfig);
    return newConfig;
  }

  async updateGuildConfig(guildId: string, config: Partial<InsertGuildConfig>): Promise<GuildConfig> {
    const index = this.guildConfigs.findIndex(g => g.guildId === guildId);
    if (index === -1) throw new Error("Guild config not found");
    
    this.guildConfigs[index] = { 
      ...this.guildConfigs[index], 
      ...config, 
      updatedAt: new Date() 
    };
    return this.guildConfigs[index];
  }

  async getDiscordUser(discordId: string): Promise<DiscordUser | null> {
    return this.discordUsers.find(u => u.discordId === discordId) || null;
  }

  async createDiscordUser(user: InsertDiscordUser): Promise<DiscordUser> {
    const newUser: DiscordUser = {
      id: this.generateId(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.discordUsers.push(newUser);
    return newUser;
  }

  async updateDiscordUser(discordId: string, user: Partial<InsertDiscordUser>): Promise<DiscordUser> {
    const index = this.discordUsers.findIndex(u => u.discordId === discordId);
    if (index === -1) throw new Error("Discord user not found");
    
    this.discordUsers[index] = { 
      ...this.discordUsers[index], 
      ...user, 
      updatedAt: new Date() 
    };
    return this.discordUsers[index];
  }
}

export const storage: IStorage = new MemStorage();
