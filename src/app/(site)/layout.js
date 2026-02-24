import Header from '@/components/oldlanding/header/header';
import Footer from '@/components/footer/footer';
import MobileMenu from '@/components/nav/mobilenav/page';
import ScrollToTop from '@/components/ScrollToTop';

export default function SiteLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <MobileMenu />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}