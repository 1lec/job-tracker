// app/profile/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/branding.module.css'; // Reuse contact styles

export default function ProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a token, and redirect to login screen if not
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

    async function fetchUser() {
      // Check if the user still has a token, in case the token has expired or has been deleted
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('https://localhost:7091/api/users', {
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
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setSkills(data.skills);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  function handleEdit() {
    router.push(`/profile/edit/`);
  }

  // Converts a list of skills into a string of comma-separated skills
  function skillListToSkillString(skills) {
    var skillString = '';
    for (var i = 0; i < skills.length; i++){
      skillString+=skills[i];
      if (i < skills.length - 1) {
        skillString+= ', ';
      }
    }
    return skillString;
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Profile Page</h1>

      {loading ? (
        <p>Loading Profile...</p>
      ) : (
        <div className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p><strong>Name:</strong> {firstName + " " + lastName}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p><strong>Email Address:</strong> {email}</p>
          </div>

          <p style={{ marginBottom: '2rem' }}>
            <strong>Skills:</strong> {skillListToSkillString(skills)}
          </p>
        </div>
      )}

      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction} onClick={() => handleEdit()}>
          Edit Profile
        </button>

        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
