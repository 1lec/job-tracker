'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/branding.module.css';

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Convert comma-separated skills into an array
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    
    try {
      const res = await fetch('https://localhost:7091/api/authentication/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, skills }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Signup failed');
      }

      // On success, redirect to login page or home
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Signup</h1>
      <p style={{ marginBottom: '1rem' }}>
        New to Job Tracker? Complete the form to create your account and optimize your job search!
      </p>

      <form className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }} onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label><br />
        <input
          type="text"
          id="first_name"
          name="first_name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        /><br />

        <label htmlFor="last_name">Last Name:</label><br />
        <input
          type="text"
          id="last_name"
          name="last_name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        /><br />

        <label htmlFor="email">Email Address:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <label htmlFor="skills">Skills:</label><br />
        <input
          type="text"
          id="skills"
          name="skills"
          required
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
        /><br /><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="submit"
          value="Sign Up"
          className={styles.navButton}
        />
      </form>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
