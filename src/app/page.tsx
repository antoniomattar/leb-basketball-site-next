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
      <VideoPlayer videoUrl="https://live.kwikmotion.com/lbcdramalive/drama/lbcdramapublish/lb2_480p/hdntl=exp=1708790872~acl=%2flbcdramalive%2fdrama%2f*~data=hdntl~hmac=aaff36ada722f95e91be5b37bd3815a1bccc50fa9a8e64dfa327af2923cf1f46/chunks.m3u8" />
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
