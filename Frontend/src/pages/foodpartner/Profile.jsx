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
            const vids = response?.data?.foodPartner?.videos;
            // use the correct setter name and ensure an array
            setVideos(Array.isArray(vids) ? vids : []);
        })
        .catch((error) => {
            console.error("Error fetching profile data:", error);
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
                {(Array.isArray(videos) ? videos : []).map((v, i) => (
                    <div key={v?._id ?? i} className="profile-video">
                        {/* use `video` (DB field) or fallback to videoUrl */}
                        <video src={v?.video || v?.videoUrl || ""} controls />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
