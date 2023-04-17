import GamesList from '@/components/GamesList';
import Standings from '@/components/Standings';

export default async function page() {
  return (
    <>
      <Standings />
      <GamesList />
    </>
  );
}
