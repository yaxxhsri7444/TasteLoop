import React, {useState, useEffect} from "react";
import "./profile.css";
import axios from "axios";
import {useParams} from "react-router-dom";

const Profile = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    // const videos = new Array(9).fill(0);

    // Fetch partner profile data
    useEffect(() => {
        axios
        .get(`http://localhost:3000/api/partner/${id}`, {withCredentials: true})
        .then((response) => {
            setProfile(response.data.foodPartner);
            // ensure we always set an array for videos to avoid `.map` on undefined
            const vids = response?.data?.foodPartner?.videos;
            setVideo(Array.isArray(vids) ? vids : []);
        })
        .catch((error) => {
            console.error("Error fetching profile data:", error);
            // keep videos as an empty array on error
            setVideos([]);
        });
    }, [id]);

    if (!profile) {
        return (
            <div className="profile-page">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Extract first letters for avatar initials
    const getInitials = (name) => {
        if (!name) return "P";
        const parts = name.trim().split(" ");
        return parts
        .map((p) => p[0].toUpperCase())
        .join("")
        .slice(0, 2);
    };

    return (
        <div className="profile-page">
            {/* Header Section */}
            <div className="profile-header">
                <div className="profile-avatar">{getInitials(profile.name)}</div>

                <div className="profile-info">
                    <h2 className="profile-name">{profile.name}</h2>
                    <p className="profile-username">{profile.businessName}</p>

                    <div className="profile-buttons">
                        <button className="btn-primary">Follow</button>
                        <button className="btn-outline">Message</button>
                    </div>

                    <div className="profile-stats">
                        <div>
                            <span className="stat-value">43</span>
                            <span className="stat-label">Meals</span>
                        </div>
                        <div>
                            <span className="stat-value">15K</span>
                            <span className="stat-label">Customers</span>
                        </div>
                        <div>
                            <span className="stat-value">4.8★</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </div>

                    <div className="profile-bio">
                        <p>
                            Business: <strong>{profile.businessName}</strong>
                            <br />
                            📍 Address: {profile.address}
                            <br />
                            📞 Phone: {profile.phone}
                            <br />
                            ✉️ {profile.email}
                        </p>
                    </div>
                </div>
            </div>
            <div className="divider"></div>

            <div className="profile-grid" aria-label="videos">
                {(Array.isArray(videos) ? video : []).map((v, i) => (
                    <div key={v?.id ?? i} className="profile-video">
                        <video src={v?.videoUrl || ""} controls />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
