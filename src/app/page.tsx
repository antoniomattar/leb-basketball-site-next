import Divider from '@/components/Divider';
import GamesList from '@/components/GamesList';
import NavBar from '@/components/NavBar';
import NewsList from '@/components/NewsList';
import Standings from '@/components/Standings';

export default async function page() {
  return (
    <>
      <NavBar />
      <Divider />
      {/* @ts-expect-error Server Component */}
      <Standings />
      <Divider />
      {/* @ts-expect-error Server Component */}
      <GamesList />
      <Divider />
      {/* @ts-expect-error Server Component */}
      <NewsList />
    </>
  );
}
