// app/page.js
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{display: 'flex', alignSelf:'center'}}>
          <Image
            className={styles.logo}
            src="/capstone-cooked-logo-transparent.png"
            alt="jobtracker logo"
            width={180}
            height={180}
            priority
          />
        </div>

        <h1 className={styles.title} style={{color: "var(--beaverOrange"}}>ur COOKED job tracker</h1>
    
        <ol>
          <li>
          Job Tracker Application (CS467) — your streamlined tool for managing job applications, tracking progress, and staying organized.
          </li>
          <li>
            Get a job and navigate through the tabs <code>dashboard • contact • profile</code>.
          </li>
          <li>Best of luck!</li>
        </ol>

        <nav className={styles.ctas}>
          <Link className={styles.buttonFunction} href="/dashboard">Dashboard</Link>
          <Link className={styles.buttonFunction} href="/profile">Profile</Link>
          <Link className={styles.buttonFunction} href="/contact">Contact</Link>
          <Link className={styles.buttonLink} href="/signup">Signup</Link>
          <Link className={styles.buttonLink} href="/login">Login</Link>
        </nav>

        {/* <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div> */}
      </main>
      <footer className={styles.footer}>
        <p>
          Made by Derick • Karan • Alec
        </p>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
