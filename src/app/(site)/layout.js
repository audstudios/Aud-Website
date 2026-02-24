import Header from '@/components/oldlanding/header/header';
import Footer from '@/components/footer/footer';
import MobileMenu from '@/components/nav/mobilenav/page';

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}