import React, { useState, useEffect } from "react";
import "./CreateFood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Cleanup preview when unmounted
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview if any
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) return setError("⚠️ Please enter a food name.");
    if (!description.trim()) return setError("⚠️ Please enter a short description.");
    if (!videoFile) return setError("⚠️ Please upload a video file.");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", videoFile); // ✅ Correct key name (not 'mama')

      // ✅ Correct backend URL (use your backend port)
      const res = await axios.post("http://localhost:3000/api/food/create", formData, {
        withCredentials: true,
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess("✅ Food created successfully!");
        setName("");
        setDescription("");
        setVideoFile(null);

        if (videoUrl) {
          URL.revokeObjectURL(videoUrl);
          setVideoUrl("");
        }

        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError("❌ Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-food">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h2 className="card-title">🍽️ Create New Food</h2>

        <label className="label">Video</label>
        <div className={`video-preview ${videoUrl ? "has-video" : ""}`}>
          {videoUrl ? (
            <video src={videoUrl} controls />
          ) : (
            <div className="placeholder">
              <span>📹 Upload a food video (mp4, mov)</span>
              <br />
              <label className="video-input-label" htmlFor="video-input">
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  style={{ display: "none" }}
                />
                <span className="link">Choose video</span>
              </label>
            </div>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Spicy Paneer Bowl"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="input description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the dish"
          />
        </div>

        {error && <div className="helper error">{error}</div>}
        {success && <div className="helper success">{success}</div>}

        <div className="form-actions">
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? "Uploading..." : "Create"}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setName("");
              setDescription("");
              setVideoFile(null);
              if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
                setVideoUrl("");
              }
              setError("");
              setSuccess("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFood;
