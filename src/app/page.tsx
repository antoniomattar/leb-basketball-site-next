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
        DOHA TOURNAMENT 🇱🇧
      </h1>
      <VideoPlayer videoUrl="https://cllive.itworkscdn.net/lbcdramalive/token=nva=1695671735~dirs=1~hash=02007988ca16da81c2b23/drama/lb2_360p_chunks.m3u8" />
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
