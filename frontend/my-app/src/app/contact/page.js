// app/contact/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function ContactPage() {
  const router = useRouter();
  const [contacts] = useState([
    { id: 1, name: 'John Doe',        company: 'Example',      email: 'john@example.com' },
    { id: 2, name: 'John Doe',        company: 'Example',      email: 'john@example.com' },
    { id: 3, name: 'John Doe',        company: 'Example',      email: 'john@example.com' }
  ]);

  return (
    <main>
      <h1>Contact Page</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >

        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Person
        </button>    

      <button
          onClick={() => router.push('/')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>



      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '2rem'
      }}>
        <thead>
          <tr>
            {['Name', 'Company', 'Email', 'Actions'].map(col => (
              <th key={col} style={{
                borderBottom: '2px solid #ddd',
                textAlign: 'left',
                padding: '0.5rem'
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, company, email }) => (
            <tr key={id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{name}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{company}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{email}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <button style={{
                  marginRight: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </main>
  );
}
