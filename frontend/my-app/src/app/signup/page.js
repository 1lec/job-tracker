'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '../styles/branding.module.css';

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skillIds, setSkillIds] = useState([]);
  const [error, setError] = useState('');

  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch('https://localhost:7091/api/skills', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

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

    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
   
    try {
      const res = await fetch('https://localhost:7091/api/authentication/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, skillIds }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Signup failed');
      }

      // On success, redirect to login page or home
      router.push('/login');
    } catch (err) {
      setError(err.message);
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
      <h1 className={styles.title}>Signup</h1>
      <p style={{ marginBottom: '1rem' }}>
        New to Job Tracker? Complete the form to create your account and optimize your job search!
      </p>

      {loadingSkills ? (
        <p>Loading signup form...</p>
      ) : (
        <form className={styles.table} style={{ padding: '1rem', borderRadius: '8px' }} onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label><br />
        <input
          type="text"
          id="first_name"
          name="first_name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        /><br />

        <label htmlFor="last_name">Last Name:</label><br />
        <input
          type="text"
          id="last_name"
          name="last_name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        /><br />

        <label htmlFor="email">Email Address:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <label htmlFor="skillIds">Skills:</label><br />
        <Select
          name="skillIds"
          options={skills}
          value={skills.filter(skill => (skillIds ?? []).includes(skill.value))}
          onChange={(selectedOptions) =>
            setSkillIds(selectedOptions ? selectedOptions.map(opt => opt.value) : [])
          }
          isMulti
          styles={customStyles}
        />
        <br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="submit"
          value="Sign Up"
          className={styles.navButton}
        />
      </form>
      )}
      
      <div className={styles.buttonRow}>
        <button className={styles.buttonFunction} onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
