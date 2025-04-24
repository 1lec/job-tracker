// app/login/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function HelloPage() {
  const router = useRouter();

  return (
    <main>
      <h1>Login</h1><br></br>
      <p>Enter your email and password to access your account.</p><br></br>
      <form>
        <label htmlFor="email">Email:</label><br></br>
        <input type="email" id="email" name="email" required></input><br></br>

        <label htmlFor="password">Password:</label><br></br>
        <input type="password" id="password" name="password" required></input><br></br>
        <input type="submit" value="Login"></input>
      </form><br></br>

      <p>Don't have an account? Click here to sign up.</p>
      <button
        onClick={() => router.push('/signup')}
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
        Signup
      </button><br></br>

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
