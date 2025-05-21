// This page was made with assistance from ChatGPT. About an hour of work was saved.
// Thread: https://chatgpt.com/share/68292c72-1fd4-800a-8d99-dc8356fedd68

// app/contact/edit/[id]/page.js
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../../styles/branding.module.css';

export default function EditContactPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    userId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a token, and redirect to login screen if not
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    
    async function fetchContacts() {
      try {
        const res = await fetch(`https://localhost:7091/api/contacts/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await res.json();
        setFormData({
          id: data.id || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          company: data.company || '',
          userId: data.userId || '',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`https://localhost:7091/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });

        if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to update contact');
        }

        // On success, redirect back to the contact list or detail page
        router.push('/contact');
    } catch (err) {
        console.error('Update failed:', err.message);
        alert(`Error: ${err.message}`);
    }
    };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Edit Contact ID {id}</h1>

      {loading ? (
        <p>Loading contact edit form...</p>
      ) : (
        <><form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label><br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          /><br />

          <label htmlFor="lastName">Last Name:</label><br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          /><br />

          <label htmlFor="company">Company:</label><br />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          /><br />

          <label htmlFor="email">Email Address:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          /><br />

          <input type="submit" value="Update Contact" />
        </form><br></br></>
      )}
    </main>
  );
}
