// 05/22/2025: Changes to incorporate JWT into the page's backend calls were modeled after changes to the analogous contact/add/page.js
// 05/24/2025: Dropdown for statuses was madde with help from ChatGPT, saving an hour of work.
// Thread: https://chatgpt.com/share/68323fa7-9124-800a-863f-94f53e27e1a2
// 05/24/2025: Dynamic select-react dropdown was made with help from ChatGPT, saving 2 hours of work.
// Thread: https://chatgpt.com/share/68327b44-2588-800a-b0ba-608b6d2dc781

// app/dashboard/add/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/branding.module.css';

export default function AddJobPage() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [contactId, setContactId] = useState('');
  const [statusId, setStatusId] = useState(1);
  const [skillIds, setSkillIds] = useState([]);

  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);

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

    async function fetchSkills() {
      // Check if the user still has a token, in case the token has expired or has been deleted
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('https://localhost:7091/api/skills', {
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
          throw new Error('Failed to fetch skills');
        }

        const data = await res.json();
        const skillOptions = data.map((skill) => ({
          value: skill.id,
          label: skill.name
        }));
        setSkills(skillOptions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSkills(false);
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

    fetchStatuses();
    fetchContacts();
    fetchSkills();
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
        body: JSON.stringify({company, jobTitle, dateApplied, statusId, contactId: contactId || null, skillIds}),
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
      <h1 className={styles.title}>Add Job</h1>

      {loadingStatuses || loadingContacts || loadingSkills ? (
        <p>Loading job form...</p>
      ) : (
        <><form onSubmit={handleSubmit}>
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

            <label htmlFor="statusId">Status:</label><br />
            <select
              name="statusId"
              value={statusId}
              onChange={(e) => setStatusId(parseInt(e.target.value))}
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
                contacts.find(option => option.value === contactId) || { value: '', label: 'No Contact' }
              }
              onChange={(selectedOption) => {
                setContactId(selectedOption.value);
              }}
              isClearable={false}
              styles={customStyles}
            /><br />

            <label htmlFor="skillIds">Skills:</label><br />
            <Select
              name="skillIds"
              options={skills}
              value={skills.filter(skill => skillIds.includes(skill.value))}
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions.map(option => option.value);
                setSkillIds(selectedIds);
              }}
              isMulti
              styles={customStyles}
            />
            <br />


            <input type="submit" value="Add Job" />
          </form><br></br></>
      )}
    </main>
  );
}