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
      <VideoPlayer videoUrl="https://dmitnthvll.cdn.mangomolo.com/dubaisports/smil:dubaisports.stream.smil/chunklist_b1000000.m3u8?stime=20230606041903&etime=20230613082043&token=04175ab72cdc0335d2ce2" />
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
