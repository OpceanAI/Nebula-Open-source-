import { useQuery } from "@tanstack/react-query";
import type { BotStats } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function StatsOverview() {
  const { data: stats, isLoading } = useQuery<BotStats>({
    queryKey: ["/api/bot/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="kawaii-card p-6 rounded-2xl animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="kawaii-card p-6 rounded-2xl">
          <p className="text-center text-gray-500 py-8">
            *susurra* No stats available uwu 🥺
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="kawaii-card p-6 rounded-2xl" data-testid="stats-servers">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-kawaii font-semibold text-gray-800">Servers 🏠</h3>
          <div className="text-2xl">🌙</div>
        </div>
        <p className="text-3xl font-bold text-pink-400">{stats.servers}</p>
        <p className="text-sm text-gray-600 mt-1">+3 this week uwu</p>
      </Card>
      
      <Card className="kawaii-card p-6 rounded-2xl" data-testid="stats-users">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-kawaii font-semibold text-gray-800">Users 👥</h3>
          <div className="text-2xl">✨</div>
        </div>
        <p className="text-3xl font-bold text-purple-400">{stats.users.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">*shyly* growing every day~</p>
      </Card>
      
      <Card className="kawaii-card p-6 rounded-2xl" data-testid="stats-commands">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-kawaii font-semibold text-gray-800">Commands 💫</h3>
          <div className="text-2xl">🌸</div>
        </div>
        <p className="text-3xl font-bold text-green-400">{stats.commands}</p>
        <p className="text-sm text-gray-600 mt-1">across 42 categories 🥺</p>
      </Card>
      
      <Card className="kawaii-card p-6 rounded-2xl" data-testid="stats-uptime">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-kawaii font-semibold text-gray-800">Uptime ⏰</h3>
          <div className="text-2xl">💖</div>
        </div>
        <p className="text-3xl font-bold text-orange-400">{stats.uptime}</p>
        <p className="text-sm text-gray-600 mt-1">Always here for you~ 💕</p>
      </Card>
    </div>
  );
}
