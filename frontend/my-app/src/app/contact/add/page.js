// app/contact/add/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/branding.module.css';

export default function AddContactPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const userId = 1; // TODO: later we need to get the id of the user creating the contact

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`https://localhost:7091/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({firstName, lastName, company, email, userId}),
        });

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
