import './globals.css';

export const metadata = {
  title: 'Aud Studios 2025',
  description: 'Next.js Project',
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