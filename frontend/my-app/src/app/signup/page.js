// app/signup/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function HelloPage() {
  const router = useRouter();

  return (
    <main>
      <h1>Hello, world!</h1>
      <button
        onClick={() => router.push('/')}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </main>
  );
}
