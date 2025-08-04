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

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl">
            Asia Cup 2025
          </h1>
          <p className="text-lg text-black md:text-xl">#YalaLebnen 🇱🇧</p>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            🔴 Live Stream
          </h2>
          <StreamSection />
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
