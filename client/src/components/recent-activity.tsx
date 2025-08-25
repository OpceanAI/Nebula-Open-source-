import { useQuery } from "@tanstack/react-query";
import type { ActivityLog } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function RecentActivity() {
  const { data: activities, isLoading } = useQuery<ActivityLog[]>({
    queryKey: ["/api/activity"],
  });

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'bg-green-100/50';
      case 'moderation':
        return 'bg-purple-100/50';
      case 'system':
        return 'bg-blue-100/50';
      case 'join':
        return 'bg-orange-100/50';
      case 'leave':
        return 'bg-red-100/50';
      default:
        return 'bg-gray-100/50';
    }
  };

  if (isLoading) {
    return (
      <Card className="kawaii-card p-6 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/3"></div>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="kawaii-card p-6 rounded-2xl">
      <h2 className="text-2xl font-kawaii font-bold text-gray-800 mb-6 flex items-center">
        Recent Activity <span className="ml-2">📝</span>
      </h2>
      
      {!activities || activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">*susurra* No recent activity uwu 🥺</p>
          <p className="text-sm text-gray-400 mt-2">The logs are being shy~</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 p-3 bg-gradient-to-r from-yellow-50/50 to-transparent rounded-lg ${getActivityColor(activity.type)}`}
              data-testid={`activity-${activity.id}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 ${getActivityColor(activity.type)} rounded-full flex items-center justify-center`}>
                <span className="text-sm">{activity.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {activity.message.includes(activity.serverName) ? (
                    <>
                      {activity.message.split(activity.serverName)[0]}
                      <span className="text-pink-500">{activity.serverName}</span>
                      {activity.message.split(activity.serverName)[1]}
                    </>
                  ) : (
                    activity.message
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(activity.timestamp)}
                  {activity.details && ` - ${activity.details}`}
                </p>
              </div>
            </div>
          ))}
          
          <div className="text-center mt-4">
            <button 
              className="text-sm text-pink-400 hover:text-pink-300 font-medium"
              data-testid="button-view-full-log"
            >
              View full activity log 📖
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
