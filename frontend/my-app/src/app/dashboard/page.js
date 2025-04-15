// app/dashboard/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function HelloPage() {
  const router = useRouter();

  return (
    <main>
      <div className={styles.wrapper}>
        <h1>Hello, world! I am the Dashboard Page</h1>
      </div>

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
