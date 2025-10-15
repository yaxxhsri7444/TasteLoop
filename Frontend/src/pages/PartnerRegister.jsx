import React from "react";

export default function PartnerRegister() {
  return (
    <div className="app-shell">
      <div className="card">
        <div className="card-body">
          <div className="brand" aria-hidden>
            <div className="brand-logo" />
            <div className="brand-name">TasteLoop</div>
          </div>

          <h1 className="card-title">Become a partner</h1>
          <p className="card-subtitle">Register your restaurant or kitchen.</p>

          <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="field">
              <label className="label" htmlFor="businessName">Business name</label>
              <input className="input" id="businessName" name="businessName" type="text" placeholder="TasteLoop Kitchen" autoComplete="organization" />
            </div>

            <div className="field">
              <label className="label" htmlFor="contactName">Contact person</label>
              <input className="input" id="contactName" name="contactName" type="text" placeholder="John Smith" autoComplete="name" />
            </div>

            <div className="field">
              <label className="label" htmlFor="email">Business email</label>
              <input className="input" id="email" name="email" type="email" placeholder="contact@business.com" autoComplete="email" />
            </div>

            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <input className="input" id="phone" name="phone" type="tel" placeholder="+1 555 123 4567" autoComplete="tel" />
            </div>

            <div className="field">
              <label className="label" htmlFor="password">Password</label>
              <input className="input" id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
            </div>

            <div className="actions">
              <button className="button" type="submit">Create partner account</button>
              <div className="helper">Already a partner? <a className="link" href="/food-partner/login">Sign in</a></div>
            </div>
          </form>

          <div className="footer">We will review your application and contact you shortly.</div>
        </div>
      </div>
    </div>
  );
}
