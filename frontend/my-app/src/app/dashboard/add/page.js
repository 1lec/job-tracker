// 05/22/2025: Changes to incorporate JWT into the page's backend calls were modeled after changes to the analogous contact/add/page.js

// app/dashboard/add/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/branding.module.css';

export default function AddJobPage() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const statusId = 1; // TODO: later we need to get the id of the user creating the job
  const contactId = 10; // TODO: later we need to get the id of the user creating the job

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

      const res = await fetch(`https://localhost:7091/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({company, jobTitle, dateApplied, statusId, contactId}),
      });

      // Catches authorization errors
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to add job');
      }

      // On success, redirect back to the job list or detail page
      router.push('/dashboard');
    } catch (err) {
        console.error('Add failed:', err.message);
        alert(`Error: ${err.message}`);
    }
    };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Add Job</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="company">Company:</label><br />
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          /><br />

          <label htmlFor="jobTitle">Job Title:</label><br />
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          /><br />

          <label htmlFor="dateApplied">Date Applied:</label><br />
          <input
            type="date"
            name="dateApplied"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          /><br />

          <input type="submit" value="Add Job" />
        </form><br></br>
    </main>
  );
}
