import Basic from '../components/offset-based/basic/basic';
import ServerBasic from '@/components/offset-based/server-basic/basic';
import NumberedBasic from '@/components/numbered/basic/basic';
import Better from '@/components/offset-based/better/better';
import NumberedOptimized from '@/components/numbered/better/better';
import NumberedBetterEllipsis from '@/components/numbered/better-ellipsis/better-ellipsis';

export default function Home() {
  return (
    <>
      {/* <Basic />
      <Better />
      <ServerBasic/> */}
      <NumberedBasic />
      <NumberedOptimized />
      <NumberedBetterEllipsis />
    </>
  );
}
