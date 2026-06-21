import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      gap: '30px',
      padding: '0 20px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: 'PPPangaiaMedium, sans-serif',
        fontSize: '120px',
        color: '#1d1d1d',
        letterSpacing: '-5px',
        lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{
        fontFamily: 'PPNeueMontreal-Thin, system-ui, sans-serif',
        fontSize: '20px',
        color: '#1d1d1d',
      }}>
        This page doesn't exist.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'PPMontreal-Bold, system-ui, sans-serif',
          fontSize: '14px',
          color: '#000',
          background: '#fff',
          border: '1px solid #1d1d1d',
          padding: '12px 30px',
          textDecoration: 'none',
          letterSpacing: '1px',
        }}
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
