'use client';

import Bundler from '@/components/Bundler';
import ContentHome from '@/components/ContentHome';
import HeaderHome from '@/components/HeaderHome';

export default function Home() {
  return (
    <>
      <HeaderHome></HeaderHome>
      <Bundler></Bundler>
      <ContentHome></ContentHome>
    </>
  );
}
