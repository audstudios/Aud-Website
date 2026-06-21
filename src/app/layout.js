import './globals.css';

export const metadata = {
  title: 'Aud Studios',
  description: 'Aud Studios is a founder-led creative strategy and production agency, based in NYC.',
  openGraph: {
    title: 'Aud Studios',
    description: 'Aud Studios is a founder-led creative strategy and production agency, based in NYC.',
    siteName: 'Aud Studios',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
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