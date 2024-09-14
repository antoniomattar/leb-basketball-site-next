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
      <VideoPlayer videoUrl=" https://live.kwikmotion.com/lbcdramalive/drama/lbcdramapublish/lb2_480p/hdntl=exp=1726385984~acl=%2flbcdramalive%2fdrama%2f*~data=hdntl~hmac=607c30b655cd5c9af2a8303d59477fca569ca6947ff2aa0462ab457b3af2f2c7/chunks.m3u8" />
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
