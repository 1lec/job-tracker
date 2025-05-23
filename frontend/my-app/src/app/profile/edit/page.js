// app/profile/edit/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/branding.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a token, and redirect to login screen if not
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    
    async function fetchProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    
      try {
        const res = await fetch(`https://localhost:7091/api/users`, {
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

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setFormData({
          id: data.id || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

    try {
        const res = await fetch(`https://localhost:7091/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        });

        // Catches authorization errors
        if (res.status === 401) {
          router.push('/login');
          return;
        }

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to update profile');
        }

      // On success, redirect back to the profile page
      router.push('/profile');
    } catch (err) {
        console.error('Update failed:', err.message);
        alert(`Error: ${err.message}`);
    }
    };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Edit Profile</h1>

      {loading ? (
        <p>Loading profile edit form...</p>
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

          <label htmlFor="email">Email Address:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          /><br />

          <input type="submit" value="Update Profile" />
        </form><br></br></>
      )}
    </main>
  );
}
