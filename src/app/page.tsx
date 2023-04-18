import GamesList from '@/components/GamesList';
import NewsList from '@/components/NewsList';
import Standings from '@/components/Standings';

export default async function page() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Standings />
      {/* @ts-expect-error Server Component */}
      <GamesList />
      {/* @ts-expect-error Server Component */}
      <NewsList />
    </>
  );
}
