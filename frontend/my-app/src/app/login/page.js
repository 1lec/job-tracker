'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // const res = await fetch('/api/authentication/login', {
      const res = await fetch('http://localhost:7091/api/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      // On success, navigate to the dashboard or home page
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Enter your email and password to access your account.
      </p>

      <form
        className={styles.table}
        style={{ padding: '1rem', borderRadius: '8px' }}
        onSubmit={handleSubmit}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            required
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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
