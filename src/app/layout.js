import './globals.css'; // global styles
import Header from '../components/oldlanding/header/header';
import Footer from '@/components/footer/footer';


export const metadata = {
  title: 'Aud Studios 2025',
  description: 'Next.js Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> 
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
