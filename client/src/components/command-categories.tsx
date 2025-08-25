import { useQuery } from "@tanstack/react-query";
import type { CommandCategory } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CommandCategories() {
  const { data: categories, isLoading } = useQuery<CommandCategory[]>({
    queryKey: ["/api/commands/categories"],
  });

  if (isLoading) {
    return (
      <Card className="kawaii-card p-6 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'kawaii-pink':
        return 'from-pink-100 to-pink-50 border-pink-200';
      case 'kawaii-lavender':
        return 'from-purple-100 to-purple-50 border-purple-200';
      case 'kawaii-mint':
        return 'from-green-100 to-green-50 border-green-200';
      case 'kawaii-peach':
        return 'from-orange-100 to-orange-50 border-orange-200';
      case 'kawaii-sky':
        return 'from-blue-100 to-blue-50 border-blue-200';
      default:
        return 'from-gray-100 to-gray-50 border-gray-200';
    }
  };

  const getBadgeClasses = (color: string) => {
    switch (color) {
      case 'kawaii-pink':
        return 'bg-pink-200/50 text-pink-600';
      case 'kawaii-lavender':
        return 'bg-purple-200/50 text-purple-600';
      case 'kawaii-mint':
        return 'bg-green-200/50 text-green-600';
      case 'kawaii-peach':
        return 'bg-orange-200/50 text-orange-600';
      case 'kawaii-sky':
        return 'bg-blue-200/50 text-blue-600';
      default:
        return 'bg-gray-200/50 text-gray-600';
    }
  };

  return (
    <Card className="kawaii-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-kawaii font-bold text-gray-800">
          Command Categories <span className="text-pink-400">🌸</span>
        </h2>
        <Button 
          className="kawaii-button-pink text-sm" 
          data-testid="button-add-category"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      {!categories || categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">*susurra* No categories found uwu 🥺</p>
          <p className="text-sm text-gray-400 mt-2">Maybe they're being shy~</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {categories.slice(0, 4).map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-r p-4 rounded-xl border ${getColorClasses(category.color)}`}
                data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getBadgeClasses(category.color)}`}>
                    {category.commandCount} commands
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="flex space-x-2">
                  <button 
                    className="text-xs bg-white/50 px-2 py-1 rounded-full hover:bg-white/70 transition-colors"
                    data-testid={`button-configure-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Configure
                  </button>
                  <button 
                    className="text-xs bg-white/50 px-2 py-1 rounded-full hover:bg-white/70 transition-colors"
                    data-testid={`button-view-commands-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    View Commands
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              className="text-sm text-pink-400 hover:text-pink-300 font-medium"
              data-testid="button-view-all-categories"
            >
              View all {categories.length} categories *shyly* 🌸
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
