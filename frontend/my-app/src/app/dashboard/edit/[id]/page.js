// 05/22/2025: Changes to incorporate JWT into the page's backend calls were modeled after changes to the analogous contact/edit/[id]/page.js
// 05/25/2024: Changes to allow for updating of contact were done with assistance from ChatGPT, saving an hour of work.
// Thread: https://chatgpt.com/share/68329920-f520-800a-8eb8-dba201d50585

// app/dashboard/edit/[id]/page.js
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from 'react-select';
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
    contactId: null,
  });

  const [contacts, setContacts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    // Check if user has a token, and redirect to login screen if not
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

    async function fetchStatuses() {
      // Check if the user still has a token, in case the token has expired or has been deleted
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('https://localhost:7091/api/statuses', {
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
          throw new Error('Failed to fetch statuses');
        }

        const data = await res.json();
        setStatuses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStatuses(false);
      }
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
        const contactOptions = data.map((contact) => ({
          value: contact.id,
          label: `${contact.firstName} ${contact.lastName}`
        }));
        setContacts(contactOptions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingContacts(false);
      }
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
          contactId: data.contactId || null,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingJob(false);
      }
    }

    fetchJobs();
    fetchStatuses();
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      contactId: selectedOption && selectedOption.value !== '' ? selectedOption.value : null
    }));
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

    // Styling for react-select dropdown
    const customStyles = {
      singleValue: (provided) => ({
        ...provided,
        color: 'black',
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
      }),
      input: (provided) => ({
        ...provided,
        color: 'black',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: 'gray',
      }),
    };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Edit Job</h1>

      {loadingJob || loadingStatuses || loadingContacts ? (
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
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
          /><br />

          <label htmlFor="statusId">Status:</label><br />
          <select
            name="statusId"
            value={formData.statusId}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select><br />

          <label htmlFor="contactId">Contact:</label><br />
          <Select
            name="contactId"
            options={[
              { value: '', label: 'No Contact' },
              ...contacts,
            ]}
            value={
              contacts.find(option => option.value === formData.contactId) || { value: '', label: 'No Contact' }
            }
            onChange={handleContactChange}
            isClearable={false}
            styles={customStyles}
          /><br />

          <input type="submit" value="Update Job" />
        </form><br></br></>
      )}
    </main>
  );
}
