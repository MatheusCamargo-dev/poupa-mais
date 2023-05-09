import Bundler from '@/components/Bundler';
import ContentHome from '@/components/ContentHome';
import FooterHome from '@/components/FooterHome';
import HeaderHome from '@/components/HeaderHome';

export default function Home() {
  return (
    <>
      <HeaderHome></HeaderHome>
      <Bundler></Bundler>
      <div className="bg-dark-blue w-100 h-8"></div>
      <ContentHome></ContentHome>
      <FooterHome></FooterHome>
    </>
  );
}
