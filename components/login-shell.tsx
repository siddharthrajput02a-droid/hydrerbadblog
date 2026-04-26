"use client";

import { useState } from "react";

export function LoginShell() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="mx-auto max-w-2xl glass-panel rounded-[2rem] p-8 shadow-[var(--shadow-soft)]">
      <p className="pill">Elegant access</p>
      <h1 className="headline-display mt-4 text-3xl font-semibold text-[var(--foreground)]">Login or create your profile</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
        This is a frontend-only flow for future backend integration. Switch role and mode to preview member and admin paths.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" className={mode === "login" ? "button-primary" : "button-secondary"} onClick={() => setMode("login")}>
          Login
        </button>
        <button type="button" className={mode === "signup" ? "button-primary" : "button-secondary"} onClick={() => setMode("signup")}>
          Signup
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className={role === "user" ? "button-primary" : "button-secondary"} onClick={() => setRole("user")}>
          Member
        </button>
        <button type="button" className={role === "admin" ? "button-primary" : "button-secondary"} onClick={() => setRole("admin")}>
          Admin
        </button>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setLoggedIn(true);
        }}
      >
        {mode === "signup" ? <input className="input-surface" placeholder="Display name" required /> : null}
        <input className="input-surface" placeholder="Email address" type="email" required />
        <input className="input-surface" placeholder="Password" type="password" required />
        {mode === "signup" ? <input className="input-surface" placeholder="Favorite Hyderabad area" /> : null}
        <button className="button-primary w-full" type="submit">
          {loggedIn ? `${mode === "login" ? "Signed in" : "Created profile"} as ${role}` : `${mode === "login" ? "Login" : "Signup"} as ${role}`}
        </button>
      </form>
    </div>
  );
}
