import './globals.css';

export const metadata = {
  title: 'Aud Studios',
  description: 'Aud Studios is a founder-led creative strategy and production agency, based in NYC.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}