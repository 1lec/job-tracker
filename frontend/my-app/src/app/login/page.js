// app/login/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Enter your email and password to access your account.
      </p>

      <form className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required className={styles.formInput} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" required className={styles.formInput} />
        </div>

        <input
          type="submit"
          value="Login"
          className={styles.navButton}
        />
      </form>

      <p style={{ marginTop: '2rem' }}>Don't have an account? Click below to sign up.</p>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction} onClick={() => router.push('/signup')}>
          Signup
        </button>
        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
