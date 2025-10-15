import React from "react";

export default function UserLogin() {
  return (
    <div className="app-shell">
      <div className="card">
        <div className="card-body">
          <div className="brand" aria-hidden>
            <div className="brand-logo" />
            <div className="brand-name">TasteLoop</div>
          </div>

          <h1 className="card-title">Welcome back</h1>
          <p className="card-subtitle">Sign in to continue as a user.</p>

          <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <input className="input" id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            </div>

            <div className="field">
              <div className="inline">
                <label className="label" htmlFor="password">Password</label>
                <a className="link" href="#">Forgot?</a>
              </div>
              <input className="input" id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>

            <div className="actions">
              <button className="button" type="submit">Sign in</button>
              <div className="helper">New here? <a className="link" href="/user/register">Create an account</a></div>
            </div>
          </form>

          <div className="footer">Use a work or personal email to sign in.</div>
        </div>
      </div>
    </div>
  );
}
