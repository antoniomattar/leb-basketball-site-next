import GamesList from '@/components/GamesList';
import Standings from '@/components/Standings';

export default async function page() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Standings />
      {/* @ts-expect-error Server Component */}
      <GamesList />
    </>
  );
}
