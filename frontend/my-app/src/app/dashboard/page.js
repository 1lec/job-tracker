// app/dashboard/page.js
'use client';
// import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from './dashboard.module.css';

const jobData = [
  {
    company: 'Microsoft',
    title: 'Software Engineer',
    status: 'Applied',
    date: '1/1/2025',
    skills: 'Java Script, React',
    contact: 'John@gmail.com',
  },
  {
    company: 'Apple',
    title: 'Software Engineer',
    status: 'Applied',
    date: '1/1/2025',
    skills: 'Python, SQL',
    contact: 'Alex@gmail.com',
  },
  {
    company: 'Snowflake',
    title: 'Software Engineer',
    status: 'Applied',
    date: '1/1/2025',
    skills: 'Java, Springboot',
    contact: 'kelv@gmail.com',
  },
  {
    company: 'Netflix',
    title: 'Software Engineer',
    status: 'Applied',
    date: '1/1/2025',
    skills: 'C#, .NET',
    contact: 'josh@gmail.com',
  },
];

export default function JobDashboard() {
  // const router = useRouter()
  
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <div>
          <nav className={styles.ctas} style={{marginBottom: "1.5rem"}}>
              <Link href="/profile" className={styles.buttonLink}> View Profile </Link>
          </nav>

          <h2>Job Applications</h2>

          </div>
          <div className={styles.buttonRow}>
            <button className={styles.buttonFunction} onClick={() => console.log("Do something (contacts)")}>
              Contacts
            </button>
            <button className={styles.buttonLink} onClick={() => console.log("Do something (Add a job)")}>
              Add Job
            </button>
        </div>
        
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Skills</th>
            <th>Contact</th>
            <th>Cooked?</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index}>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>{job.status}</td>
              <td>{job.date}</td>
              <td>{job.skills}</td>
              <td>{job.contact}</td>
              <td>
                <button className={styles.cookedButton}>Am I cooked?</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className={styles.ctas}>
        <Link href="/" className={styles.buttonFunction}>
          Back to Home
        </Link>
      </nav>

      {/* <button
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
      </button> */}
    </main>
  );
}
