// app/signup/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function HelloPage() {
  const router = useRouter();

  return (
    <main>
      <h1>Signup</h1><br></br>
      <p>New to Job Tracker? Complete the form to create your account and optimize your job search!</p><br></br>
      <form>
        <label htmlFor="first_name" required>First Name:</label><br></br>
        <input type="text"></input><br></br>

        <label htmlFor="last_name" required>Last Name:</label><br></br>
        <input type="text"></input><br></br>

        <label htmlFor="email" required>Email Address:</label><br></br>
        <input type="email"></input><br></br>

        <label htmlFor="password" required>Password:</label><br></br>
        <input type="password"></input><br></br>

        <label htmlFor="skills" required>Skills:</label><br></br>
        <input type="text"></input><br></br><br></br>

        <input type="submit" value="Sign Up"></input>
      </form>
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
