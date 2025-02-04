"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "../register/register.module.css";
import cash from "../assets/cash.png";
import hsoubLogo from "../assets/hsoub-logo.ico";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log({ username, email });
    console.log("Registration successful!");

    router.push("/home"); // Redirect to dashboard page after successful registration
  };

  return (
    <div className={classes["login-container"]}>
      {/* القسم الخاص بالصورة */}
      <div className={classes["image-login"]}>
        <Image src={cash} alt="Cash Image" width={300} height={300} />
      </div>

      {/* القسم الخاص بالنموذج */}
      <div className={classes["form-container"]}>
        {error && <p className={classes["error"]}>{error}</p>}
        <div className={classes["image-container"]}>
          <Image src={hsoubLogo} alt="HSOUB Logo" width={150} height={150} />
        </div>
        <h1 className={classes["form-title"]}>Expens Tracker</h1>
        <p className={classes["form-subtitle"]}>
          Track your daily expenses, calculate your savings, and compare it with your savings goals.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={classes["form-button"]}  >
            Register
          </button>
          <div className={classes["form-link"]}>
            <Link href="/">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
