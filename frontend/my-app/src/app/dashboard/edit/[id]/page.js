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
    async function fetchJobs() {
      try {
        const res = await fetch(`https://localhost:7091/api/jobs/${id}`);
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

    try {
        const res = await fetch(`https://localhost:7091/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });

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
      <h1 className={styles.title}>Edit Job ID {id}</h1>

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
