// // src/app/components/Header.js

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header style={{
        fontFamily: 'var(--font-geist-sans)', // <- this line
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
        <Image
          src="/capstone-job-tracker-icon-logo-inverted.png"
          alt="jobtracker logo"
          width={200}
          height={48}
          style={{ objectFit: "contain", borderRadius: "128px"}}
        />
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/">Home</Link>
        <Link href="/Dashboard">Dashboard</Link>
        <Link href="/Profile">Profile</Link>
      </nav>
    </header>
  );
}