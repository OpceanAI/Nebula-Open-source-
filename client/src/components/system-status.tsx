import { useQuery } from "@tanstack/react-query";
import type { SystemStatus } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function SystemStatus() {
  const { data: statuses, isLoading } = useQuery<SystemStatus[]>({
    queryKey: ["/api/system/status"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-400';
      case 'warning':
        return 'bg-yellow-400 pulse-cute';
      case 'error':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100/50';
      case 'warning':
        return 'bg-orange-100/50';
      case 'error':
        return 'bg-red-100/50';
      default:
        return 'bg-gray-100/50';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card className="kawaii-card p-6 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="kawaii-card p-6 rounded-2xl">
      <h2 className="text-xl font-kawaii font-bold text-gray-800 mb-4 flex items-center">
        System Status <span className="ml-2">💖</span>
      </h2>
      
      {!statuses || statuses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">*susurra* No status data uwu 🥺</p>
          <p className="text-sm text-gray-400 mt-2">Systems are being shy~</p>
        </div>
      ) : (
        <div className="space-y-4">
          {statuses.map((status) => (
            <div
              key={status.id}
              className={`flex items-center justify-between p-3 ${getStatusBg(status.status)} rounded-lg`}
              data-testid={`status-${status.service.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${getStatusColor(status.status)} rounded-full`}></div>
                <span className="text-sm font-medium">{status.service}</span>
              </div>
              <span className={`text-xs ${getStatusTextColor(status.status)} font-medium`}>
                {status.message}
              </span>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-yellow-50/50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              *susurra* Everything is running smoothly~ 💫
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
