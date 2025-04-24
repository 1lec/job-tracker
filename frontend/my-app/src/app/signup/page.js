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
        <label htmlFor="first_name">First Name:</label><br></br>
        <input type="text" id="first_name" name="first_name" required></input><br></br>

        <label htmlFor="last_name">Last Name:</label><br></br>
        <input type="text" id="last_name" name="last_name" required></input><br></br>

        <label htmlFor="email">Email Address:</label><br></br>
        <input type="email" id="email" name="email" required></input><br></br>

        <label htmlFor="password">Password:</label><br></br>
        <input type="password" id="password" name="password" required></input><br></br>

        <label htmlFor="skills">Skills:</label><br></br>
        <input type="text" id="skills" name="skills" required></input><br></br><br></br>

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
