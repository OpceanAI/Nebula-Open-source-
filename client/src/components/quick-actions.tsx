import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Database, BarChart3, LifeBuoy } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      id: 'settings',
      label: 'Bot Settings *shy*',
      icon: Settings,
      className: 'kawaii-button-pink',
    },
    {
      id: 'mongodb',
      label: 'MongoDB Config',
      icon: Database,
      className: 'kawaii-button-lavender',
    },
    {
      id: 'analytics',
      label: 'View Analytics uwu',
      icon: BarChart3,
      className: 'kawaii-button-mint',
    },
    {
      id: 'support',
      label: 'Support *whispers*',
      icon: LifeBuoy,
      className: 'kawaii-button-peach',
    },
  ];

  return (
    <Card className="kawaii-card p-6 rounded-2xl">
      <h2 className="text-xl font-kawaii font-bold text-gray-800 mb-4 flex items-center">
        Quick Actions <span className="ml-2">⚡</span>
      </h2>
      
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              className={`w-full ${action.className} p-3 rounded-xl font-medium flex items-center justify-center`}
              data-testid={`button-${action.id}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
