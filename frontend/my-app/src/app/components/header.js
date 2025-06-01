// src/app/components/Header.js
'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { NonceProvider } from 'react-select';

const logoutButtonSytle = {
  background: "var(--beaverOrange)",
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-geist-sans)',
  color: "white",
  fontSize: '1.00125rem',
}

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push('/login');
  }

  return (
    <header style={{
        fontFamily: 'var(--font-geist-sans)',
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "var(--beaverOrange)",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0px 5px 10px rgba(109, 42, 3, 0.68)",
    }}>
      <Link href="/">
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Image
            src="/capstone-cooked-face-logo-white.png"
            alt="jobtracker logo"
            width={180}
            height={48}
            style={{ objectFit: "contain", borderRadius: "128px", marginRight:'10px'}}
          />
          <h1 style={{fontSize: "1.5rem"}}>
            (CS467 Job Tracker) 
          </h1> 
        </div>
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <button style={logoutButtonSytle} onClick={() => handleLogout()}>
          Logout
        </button>
      </nav>
    </header>
  );
}