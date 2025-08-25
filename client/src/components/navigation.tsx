import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export default function Navigation() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/users/1"],
  });

  return (
    <nav className="kawaii-card rounded-none border-0 border-b border-pink-200/20 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="floating">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-kawaii font-bold text-gray-800">
                Kawaii Bot Dashboard <span className="text-pink-400">uwu</span>
              </h1>
              <p className="text-sm text-gray-600">*susurra* Managing your cute Discord bot~</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-cute"></div>
              <span className="text-sm font-medium text-gray-700">Online 🌸</span>
            </div>
            
            <div className="flex items-center space-x-2" data-testid="user-profile">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-sm">{user?.avatar || "👤"}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.username || "Kawaii Admin"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
