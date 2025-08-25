import Navigation from '@/components/navigation';
import KawaiiCard from '@/components/kawaii-card';

export default function Settings() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <KawaiiCard>
          <div className="text-center py-12">
            <h1 className="text-3xl font-kawaii font-bold text-gray-800 mb-4">
              Settings Page ⚙️
            </h1>
            <p className="text-gray-600 mb-6">
              *whispers* Configure your kawaii bot settings here~ ✨
            </p>
            <div className="text-6xl mb-4">🛠️</div>
            <p className="text-sm text-gray-500">
              Coming soon uwu *blush*
            </p>
          </div>
        </KawaiiCard>
      </div>
    </div>
  );
}
