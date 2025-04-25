// app/profile/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/branding.module.css'; // Reuse contact styles
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Profile Page</h1>
      <div className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p><strong>Name:</strong> Karan Patel</p>
        </div>

        <div style={{ marginBottom: '1.5rem'}}>
          <p><strong>Picture:</strong></p>

          {/* Centered image with placeholder styling */}
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#333',
            borderRadius: '8px',
            // margin: '0 auto',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              className={styles.logo}
              src="/capstone-job-tracker-badge-logo.png"
              alt="jobtracker logo"
              width={100}
              height={100}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>
        </div>



        <p style={{ marginBottom: '2rem' }}>
          <strong>Skills:</strong> JavaScript, SQL, React
        </p>
      </div>

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
