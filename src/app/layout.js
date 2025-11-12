import './globals.css'; // global styles
import Header from '../components/oldlanding/header/header';
import Footer from '@/components/footer/footer';
import MobileMenu from '@/components/nav/mobilenav/page';


export const metadata = {
  title: 'Aud Studios 2025',
  description: 'Next.js Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <MobileMenu />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
