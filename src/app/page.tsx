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
        WASL TOURNAMENT 🇱🇧
      </h1>
      <VideoPlayer videoUrl="https://cdn1.ipslow.com/tv525_www.elahmad.com_lb2/index.m3u8?token=00c97a0f2823d40444940db0b144757438024216-baf1b1623ca4efe9c966a7666af43a23-1708712015-1708701215 " />
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
