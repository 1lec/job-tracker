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

        <h1 className={styles.title} style={{color: "var(--beaverOrange"}}>urCOOKED Job Tracker</h1>
        <p>A streamlined tool for tracking job applications, managing contacts, and evaluating skills.</p>

        <nav className={styles.ctas}>
          <Link className={styles.buttonFunction} href="/dashboard">Dashboard</Link>
          <Link className={styles.buttonFunction} href="/profile">Profile</Link>
          <Link className={styles.buttonFunction} href="/contact">Contacts</Link>
          <Link className={styles.buttonLink} href="/signup">Signup</Link>
          <Link className={styles.buttonLink} href="/login">Login</Link>
        </nav>

      </main>
      <footer className={styles.footer}>
        <p>
          Created by Alec Andersen • Derick Do • Karan Patel
        </p>
      </footer>
    </div>
  );
}
