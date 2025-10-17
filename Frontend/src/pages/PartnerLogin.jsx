import React from "react";
import "../styles/ui.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartnerLogin() {
    const naviagte = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/partner/login", {
                email,
                password,
            });

            console.log("User Login successfully:", response.data);
            alert("Login successful!");
            naviagte("/create-food");
        } catch (error) {
            console.error("Logining failed:", error.response?.data || error.message);
            alert("Something went wrong while logining.");
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

                    <h1 className="card-title">Partner sign in</h1>
                    <p className="card-subtitle">Access your partner dashboard.</p>

                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="partner@business.com"
                                autoComplete="email"
                            />
                        </div>

                        <div className="field">
                            <div className="inline">
                                <label className="label" htmlFor="password">
                                    Password
                                </label>
                                <a className="link" href="#">
                                    Forgot?
                                </a>
                            </div>
                            <input
                                className="input"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="actions">
                            <button className="button" type="submit">
                                Sign in
                            </button>
                            <div className="helper">
                                <div>New here?</div>
                                <div>
                                    <a className="link" href="/user/register">
                                        Register as normal user
                                    </a>
                                </div>
                                <div>
                                    <a className="link" href="/food-partner/register">
                                        Register as food partner
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="footer">Contact support if you have trouble signing in.</div>
                </div>
            </div>
        </div>
    );
}
