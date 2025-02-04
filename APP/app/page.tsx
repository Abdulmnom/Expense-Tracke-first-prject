'use client';

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import classes from "./login.module.css";
import cash from "./assets/cash.png";
import hsoubLogo from "./assets/hsoub-logo.ico";
import { login } from "./libs/request";
import { useRouter } from "next/navigation";
import useLocalStorage from "./hooks/useLocalStorage";
import { useAppContext } from "./AppContext";

export default function LoginPage() {
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  check if email and password are provided
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
      try {
      const response = await login(email, password);

      if (response.token) {
        globalState?.authenticate({
          user: response?.user,
          token: response?.token,
        });
        router.push("/home");
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={classes["login-container"]}>
      <div className={classes["image-login"]}>
        <div className={classes["image-container"]}>
          <Image src={cash} alt="Cash Image" width={300} height={300} />
          <Image src={hsoubLogo} alt="Hsoub Logo" width={100} height={100} />
        </div>
      </div>
      <div className={classes["form-container"]}>
        <h1 className={classes["form-title"]}>Login</h1>
        <p className={classes["form-subtitle"]}>Welcome back! Please log in to your account.</p>
        <form onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className={classes["form-button"]}>
            Log In
          </button>
        </form>
        <p>
          Don't have an account?
          <Link href="/register" className={classes["form-link"]}>
            Sign up
          </Link>
          <br />
          
          
          <Link href="#" onClick={handleForgotPassword} className={classes["form-link"]}>
            Forgot Password? <strong>🤞</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
