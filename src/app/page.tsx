import Divider from '@/components/Divider';
import NavBar from '@/components/NavBar';
import NewsList from '@/components/NewsList';
import Round from '@/components/Round';
import Standings from '@/components/Standings';
import VideoPlayer from '@/components/VideoPlayer';

export default async function page() {
  return (
    <>
      <NavBar />
      <Divider />
      <h1 className=" text-center font-mono text-3xl font-bold">
        {' '}
        ASIA QUALI TOURNAMENT 🇱🇧
      </h1>
      <VideoPlayer videoUrl="https://fonz01.dlive.click/oMD8AMeqAM8TvRu9JvVNkg/1718068902/34362e3139332e35362e323030/ff416/playlist.m3u8" />
      {/* @ts-expect-error Server Component */}
      <Standings />
      <Divider />
      {/* @ts-expect-error Server Component */}
      <Round />
      <Divider />
      {/* @ts-expect-error Server Component */}
      <NewsList />
    </>
  );
}
