// used this to learn how to make tables https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

// app/contact/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function ContactPage() {
  const router = useRouter();
  const [contacts] = useState([
    { id: 1, name: 'John Doe', company: 'Example', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', company: 'CompanyX', email: 'jane@companyx.com' },
    { id: 3, name: 'Alice Wu', company: 'StartupY', email: 'alice@startupy.com' }
  ]);

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Contacts</h1>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction}>Add New Person</button>
        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>

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
                <button className={styles.cookedButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
