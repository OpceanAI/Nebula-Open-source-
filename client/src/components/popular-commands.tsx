import { useQuery } from "@tanstack/react-query";
import type { PopularCommand } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function PopularCommands() {
  const { data: commands, isLoading } = useQuery<PopularCommand[]>({
    queryKey: ["/api/commands/popular"],
  });

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music':
        return 'bg-pink-200/50 text-pink-600';
      case 'economy':
        return 'bg-green-200/50 text-green-600';
      case 'fun & games':
        return 'bg-purple-200/50 text-purple-600';
      case 'leveling':
        return 'bg-orange-200/50 text-orange-600';
      default:
        return 'bg-gray-200/50 text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card className="kawaii-card p-6 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="space-y-3">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="kawaii-card p-6 rounded-2xl">
      <h2 className="text-xl font-kawaii font-bold text-gray-800 mb-4 flex items-center">
        Popular Commands <span className="ml-2">⭐</span>
      </h2>
      
      {!commands || commands.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">*susurra* No popular commands uwu 🥺</p>
          <p className="text-sm text-gray-400 mt-2">They're being shy~</p>
        </div>
      ) : (
        <div className="space-y-3">
          {commands.map((command) => (
            <div
              key={command.id}
              className="flex items-center justify-between p-2"
              data-testid={`command-${command.name.replace('/', '')}`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm">{command.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{command.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(command.category)}`}>
                {command.uses.toLocaleString()} uses
              </span>
            </div>
          ))}
          
          <div className="text-center mt-4">
            <button 
              className="text-sm text-pink-400 hover:text-pink-300 font-medium"
              data-testid="button-view-all-stats"
            >
              View all stats uwu 📈
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
