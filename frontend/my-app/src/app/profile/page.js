// app/profile/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function HelloPage() {
  const router = useRouter();

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ marginBottom: '2rem' }}>
        <h1>Profile Page</h1>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p><strong>Name:</strong> Karan Patel</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p><strong>Picture:</strong></p>
      </div>
     
      <p> <strong>Skills:</strong> JavaScript, SQL, React</p>

      <div style={{ marginTop: '1.5rem' }}>

      <button
        style={{
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Edit Profile
      </button>

      <button
        onClick={() => router.push('/')}
        style={{
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


      </div>
    </main>
  );
}
