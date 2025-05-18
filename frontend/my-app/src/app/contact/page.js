// used this to learn how to make tables https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

// The fetch and delete functionalities were made with assistance from ChatGPT. It saved at least an hour of work.
// Thread: https://chatgpt.com/share/68292fa4-dd68-800a-b573-48659bb2e2bc

// app/contact/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/branding.module.css';

export default function ContactPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch('https://localhost:7091/api/contacts');
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

  async function handleDelete(id) {
    try {
      const res = await fetch(`https://localhost:7091/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete contact');
      }
      // Remove the deleted contact from the state
      setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting contact');
    }
  }

  function handleEdit(id) {
    router.push(`/contact/edit/${id}`);
  }

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
            {contacts.map(({ id, firstName, lastName, company, email }) => (
              <tr key={id}>
                <td>{firstName + " " + lastName}</td>
                <td>{company}</td>
                <td>{email}</td>
                <td>
                  <button className={styles.cookedButton} style={{ marginRight: '0.5rem' }} onClick={() => handleEdit(id)}>
                    Edit
                  </button>
                  <button className={styles.cookedButton} onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
