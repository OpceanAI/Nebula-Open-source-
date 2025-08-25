import Navigation from '@/components/navigation';
import KawaiiCard from '@/components/kawaii-card';

export default function Commands() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <KawaiiCard>
          <div className="text-center py-12">
            <h1 className="text-3xl font-kawaii font-bold text-gray-800 mb-4">
              Commands Page 💫
            </h1>
            <p className="text-gray-600 mb-6">
              *susurra* This page will show all 133+ kawaii commands~ 🌸
            </p>
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-sm text-gray-500">
              Coming soon uwu *shy*
            </p>
          </div>
        </KawaiiCard>
      </div>
    </div>
  );
}
