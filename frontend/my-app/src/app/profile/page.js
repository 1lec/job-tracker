// app/profile/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Profile Page</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <p><strong>Name:</strong> Karan Patel</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p><strong>Picture:</strong></p>
        {/* Placeholder for image if needed */}
        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#333',
          borderRadius: '8px'
        }} />
      </div>

      <p style={{ marginBottom: '2rem' }}>
        <strong>Skills:</strong> JavaScript, SQL, React
      </p>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction}>
          Edit Profile
        </button>

        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
