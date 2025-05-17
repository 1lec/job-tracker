// used this to learn how to make tables https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

// app/contact/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function ContactPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch('https://localhost:7091/api/contacts'); // adjust to match your backend URL
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Contacts</h1>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction}>Add New Person</button>
        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(({ id, name, company, email }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{company}</td>
                <td>{email}</td>
                <td>
                  <button className={styles.cookedButton} style={{ marginRight: '0.5rem' }}>
                    Edit
                  </button>
                  <button className={styles.cookedButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
