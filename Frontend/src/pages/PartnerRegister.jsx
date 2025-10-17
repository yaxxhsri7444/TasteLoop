import React from "react";
import "../styles/ui.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PartnerRegister() {
    const naviagte = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("name:", name, email, password);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/partner/register", {
                name,
                businessName,
                phone,
                address,
                email,
                password,
            });

            console.log("User registered successfully:", response.data);
            alert("Registration successful!");
            naviagte("/create-food");
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            alert("Something went wrong while registering.");
        }
    };
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

                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label className="label" htmlFor="businessName">
                                Business name
                            </label>
                            <input
                                className="input"
                                id="businessName"
                                name="businessName"
                                type="text"
                                placeholder="TasteLoop Kitchen"
                                autoComplete="organization"
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="contactName">
                                Contact person
                            </label>
                            <input
                                className="input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Smith"
                                autoComplete="name"
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="email">
                                Business email
                            </label>
                            <input
                                className="input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="contact@business.com"
                                autoComplete="email"
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="input"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 555 123 4567"
                                autoComplete="tel"
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                className="input"
                                id="address"
                                name="address"
                                rows="3"
                                placeholder="123 Main St, City, State, ZIP"
                                autoComplete="street-address"
                                required
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="input"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="actions">
                            <button className="button" type="submit">
                                Create partner account
                            </button>
                            <div className="helper">
                                Already a partner?{" "}
                                <a className="link" href="/food-partner/login">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </form>

                    <div className="footer">We will review your application and contact you shortly.</div>
                </div>
            </div>
        </div>
    );
}
