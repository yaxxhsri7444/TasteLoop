import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import ReelFeed from "../../component/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/get", { withCredentials: true })
      .then(response => {
        console.log("Fetched Data:", response.data);
        setVideos(response.data.foodItem || []); // ✅ Fixed
      })
      .catch(err => console.error("Error fetching videos:", err));
  }, []);

  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.like) {
      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, likeCount: (v.likeCount || 0) + 1 }
            : v
        )
      );
    } else {
      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, likeCount: Math.max((v.likeCount || 1) - 1, 0) }
            : v
        )
      );
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.save) {
      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, savesCount: (v.savesCount || 0) + 1 }
            : v
        )
      );
    } else {
      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, savesCount: Math.max((v.savesCount || 1) - 1, 0) }
            : v
        )
      );
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
