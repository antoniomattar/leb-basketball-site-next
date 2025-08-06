import Divider from '@/components/Divider';
import NavBar from '@/components/NavBar';
import NewsList from '@/components/NewsList';
import Round from '@/components/Round';
import Standings from '@/components/Standings';
import StreamSection from '@/components/StreamSection';

export default async function page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section with Live Stream */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl">
              Asia Cup 2025
            </h1>
            <p className="text-lg text-black">#YalaLebnen 🇱🇧</p>
          </div>

          {/* Live Stream */}
          <div className="mb-6">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              🔴 Live Stream
            </h2>
            <StreamSection />
          </div>
        </div>
      </section>

      <Divider />

      {/* Standings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Standings />
        </div>
      </section>

      <Divider />

      {/* Games Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <Round />
        </div>
      </section>

      <Divider />

      {/* News Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <NewsList />
        </div>
      </section>
    </div>
  );
}
