// app/signup/page.js
'use client';

import { useRouter } from 'next/navigation';
// import styles from '../contact/contact.module.css'; // Reuse contact styles
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function SignupPage() {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Signup</h1>
      <p style={{ marginBottom: '1rem' }}>
        New to Job Tracker? Complete the form to create your account and optimize your job search!
      </p>

      <form className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }}>
        <label htmlFor="first_name">First Name:</label><br />
        <input type="text" id="first_name" name="first_name" required /><br />

        <label htmlFor="last_name">Last Name:</label><br />
        <input type="text" id="last_name" name="last_name" required /><br />

        <label htmlFor="email">Email Address:</label><br />
        <input type="email" id="email" name="email" required /><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" required /><br />

        <label htmlFor="skills">Skills:</label><br />
        <input type="text" id="skills" name="skills" required /><br /><br />

        <input
          type="submit"
          value="Sign Up"
          className={styles.navButton}
        />
      </form>

      <div className={styles.buttonRow}>
        <button
          className={styles.buttonFunction}
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
