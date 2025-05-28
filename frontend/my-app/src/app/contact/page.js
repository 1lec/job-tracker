// used this to learn how to make tables https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

// The fetch and delete functionalities were made with assistance from ChatGPT. It saved at least an hour of work.
// Thread: https://chatgpt.com/share/68292fa4-dd68-800a-b573-48659bb2e2bc

// 05/22/2025: Changes to incorporate JWT into the page's backend calls were made with assistance from ChatGPT, saving 1-2 hours of work.
// Thread: https://chatgpt.com/share/682f62d3-74b0-800a-b7ef-5e61b29beb36

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
    // Check if user has a token to see if they should be allowed to access this page
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    
    async function fetchContacts() {
      // Check if the user still has a token, in case the token has expired or has been deleted
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('https://localhost:7091/api/contacts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Catches authorization errors
        if (res.status === 401) {
          router.push('/login');
          return;
        }

        // Catches database-related errors
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
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`https://localhost:7091/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      });

      // Catches authorization errors
        if (res.status === 401) {
          router.push('/login');
          return;
        }

      // Catches database-related errors
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

  function handleAdd() {
    router.push(`/contact/add/`);
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Contacts</h1>

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction} onClick={() => handleAdd()}>
          Add Contact
        </button>
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
