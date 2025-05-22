// app/contact/add/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/branding.module.css';

export default function AddContactPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
      // Check if user has a token, and redirect to login screen if not
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if user has a token, and redirect to login screen if not
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }

      const res = await fetch(`https://localhost:7091/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({firstName, lastName, company, email}),
      });

      // Catches authorization errors
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      // Catches database-related errors
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to add contact');
      }

      // On success, redirect back to the contact list or detail page
      router.push('/contact');
    } catch (err) {
        console.error('Add failed:', err.message);
        alert(`Error: ${err.message}`);
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Add Contact</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label><br />
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          /><br />

          <label htmlFor="lastName">Last Name:</label><br />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /><br />

          <label htmlFor="company">Company:</label><br />
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          /><br />

          <label htmlFor="email">Email Address:</label><br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />

          <input type="submit" value="Add Contact" />
        </form><br></br>
    </main>
  );
}
