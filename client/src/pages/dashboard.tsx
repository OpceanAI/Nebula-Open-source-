import Navigation from "@/components/navigation";
import StatsOverview from "@/components/stats-overview";
import CommandCategories from "@/components/command-categories";
import RecentActivity from "@/components/recent-activity";
import QuickActions from "@/components/quick-actions";
import SystemStatus from "@/components/system-status";
import PopularCommands from "@/components/popular-commands";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <StatsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CommandCategories />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <SystemStatus />
            <PopularCommands />
          </div>
        </div>
      </div>
    </div>
  );
}
