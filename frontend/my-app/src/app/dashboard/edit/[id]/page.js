// 05/22/2025: Changes to incorporate JWT into the page's backend calls were modeled after changes to the analogous contact/edit/[id]/page.js

// app/dashboard/edit/[id]/page.js
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../../styles/branding.module.css';

export default function EditJobPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    company: '',
    jobTitle: '',
    dateApplied: '',
    userId: '',
    statusId: '',
    contactId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a token, and redirect to login screen if not
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    
    async function fetchJobs() {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }

      try {
        const res = await fetch(`https://localhost:7091/api/jobs/${id}`, {
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
          throw new Error('Failed to fetch job');
        }

        const data = await res.json();
        setFormData({
          id: data.id || '',
          company: data.company || '',
          jobTitle: data.jobTitle || '',
          dateApplied: data.dateApplied || '',
          userId: data.userId || '',
          statusId: data.statusId || '',
          contactId: data.contactId || '',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
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
      const res = await fetch(`https://localhost:7091/api/jobs/${id}`, {
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
        throw new Error(errorText || 'Failed to update job');
      }

      // On success, redirect back to the job list or detail page
      router.push('/dashboard');
    } catch (err) {
        console.error('Update failed:', err.message);
        alert(`Error: ${err.message}`);
    }
    };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Edit Job</h1>

      {loading ? (
        <p>Loading job edit form...</p>
      ) : (
        <><form onSubmit={handleSubmit}>
          <label htmlFor="company">Company:</label><br />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          /><br />

          <label htmlFor="jobTitle">Job Title:</label><br />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          /><br />

          <label htmlFor="dateApplied">Date Applied:</label><br />
          <input
            type="text"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
          /><br />

          <input type="submit" value="Update Job" />
        </form><br></br></>
      )}
    </main>
  );
}
