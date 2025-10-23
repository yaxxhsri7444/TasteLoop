import React from "react";
import "../styles/ui.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserRegister() {
    const naviagte = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("name:", name, email, password);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                { name, email, password },
                { withCredentials: true }
            );

            console.log("User registered successfully:", response.data);
            alert("Registration successful!");
            naviagte("/")
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

                    <h1 className="card-title">Create your account</h1>
                    <p className="card-subtitle">Join as a user to discover and order great food.</p>

                    {/* ✅ Corrected here */}
                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label className="label" htmlFor="name">
                                Full name
                            </label>
                            <input
                                className="input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jane Doe"
                                autoComplete="name"
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@example.com"
                                autoComplete="email"
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
                                Create account
                            </button>
                            <div className="helper">
                                Already have an account?{" "}
                                <a className="link" href="/user/login">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </form>

                    <div className="footer">By continuing, you agree to our Terms and Privacy Policy.</div>
                </div>
            </div>
        </div>
    );
}
