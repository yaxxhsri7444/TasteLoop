import React, {useEffect, useRef, useState} from "react";
import "./Home.css";
import axios from "axios";
import {FiPlay, FiPause, FiVolume2, FiVolumeX} from "react-icons/fi";



const Home = () => {
    const containerRef = useRef(null);
    const videoRefs = useRef([]);
    const [items, setItems] = useState([]);
    const [muted, setMuted] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load videos from backend API with cookie-based auth
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/food/get", {withCredentials: true});
                const list = res?.data?.foodItem ?? [];
                const mapped = list
                .filter((it) => typeof it.video === "string" && it.video.length > 0)
                .map((it, idx) => ({
                    src: it.video,
                    title: it.name || `Video ${idx + 1}`,
                    description: it.discription || "",
                }));
                if (!cancelled) setItems(mapped.length ? mapped : fallbackItems);
            } catch (e) {
                if (!cancelled) {
                    setError("Failed to load videos. Using fallback demos.");
                    setItems(fallbackItems);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    // Keep refs array sized to items length
    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, items.length);
    }, [items.length]);

    // Auto play/pause based on visibility inside the scroll container
    useEffect(() => {
        if (!items.length) return;
        const root = containerRef.current || null;
        const observer = new IntersectionObserver(
            (entries) => {
                let topCandidate = {index: currentIndex, ratio: 0};
                entries.forEach((entry) => {
                    const el = entry.target;
                    const idx = Number(el.dataset.index || "0");
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        el.play()
                        .then(() => {
                            if (idx === currentIndex) setIsPaused(false);
                        })
                        .catch(() => {});
                    } else {
                        el.pause();
                        if (idx === currentIndex) setIsPaused(true);
                    }
                    if (entry.intersectionRatio > topCandidate.ratio) {
                        topCandidate = {index: idx, ratio: entry.intersectionRatio};
                    }
                });
                if (topCandidate.ratio >= 0.5) setCurrentIndex(topCandidate.index);
            },
            {root, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1]}
        );

        videoRefs.current.forEach((v) => v && observer.observe(v));
        return () => observer.disconnect();
    }, [items.length, currentIndex]);

    // Enforce mute across all videos
    useEffect(() => {
        videoRefs.current.forEach((v) => {
            if (v) v.muted = muted;
        });
    }, [muted, items.length]);

    // When currentIndex changes, update paused indicator from DOM
    useEffect(() => {
        const v = videoRefs.current[currentIndex];
        if (v) setIsPaused(v.paused);
    }, [currentIndex]);

    const toggleMute = () => setMuted((m) => !m);

    const togglePlay = (idx) => {
        const v = videoRefs.current[idx];
        if (!v) return;
        if (v.paused)
            v.play()
            .then(() => setIsPaused(false))
            .catch(() => {});
        else {
            v.pause();
            setIsPaused(true);
        }
    };

    if (loading && items.length === 0) {
        return (
            <div style={{minHeight: "100vh", display: "grid", placeItems: "center", background: "#000"}}>
                <div style={{color: "#fff"}}>Loading videos…</div>
            </div>
        );
    }

    return (
        <div style={{minHeight: "100vh", display: "grid", placeItems: "center", background: "#000"}}>
            {/* Mute toggle pinned to top-right of the frame */}
            <div style={{position: "fixed", top: 16, right: 16, zIndex: 10}}>
                <button className="reel-btn" onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
                    {muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
            </div>

            {/* Scrollable reels frame (not full-screen scroll) */}
            <div
                className="reels-container"
                ref={containerRef}
                style={{
                    height: "min(88vh, 780px)",
                    width: "100%",
                    maxWidth: 560,
                    margin: "0 auto",
                    overflowY: "auto",
                    scrollSnapType: "y mandatory",
                    scrollBehavior: "smooth",
                    background: "#000",
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    position: "relative",
                }}
            >
                {items.map((item, idx) => (
                    <section
                        className="reel"
                        key={idx}
                        style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            display: "grid",
                            placeItems: "center",
                            scrollSnapAlign: "start",
                            scrollSnapStop: "always",
                            background: "#000",
                        }}
                    >
                        <video
                            ref={(el) => (videoRefs.current[idx] = el)}
                            data-index={idx}
                            className="reel-video"
                            src={item.src}
                            playsInline
                            muted={muted}
                            loop
                            preload="metadata"
                            onClick={() => togglePlay(idx)}
                            onPlay={() => idx === currentIndex && setIsPaused(false)}
                            onPause={() => idx === currentIndex && setIsPaused(true)}
                            style={{
                                width: "calc(100% - 32px)",
                                maxWidth: 420,
                                aspectRatio: "9 / 16",
                                height: "auto",
                                objectFit: "cover",
                                display: "block",
                                background: "#000",
                                borderRadius: 16,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                            }}
                        />

                        <div
                            className="reel-overlay"
                            style={{
                                position: "absolute",
                                left: "50%",
                                bottom: 0,
                                transform: "translateX(-50%)",
                                width: "calc(100% - 32px)",
                                maxWidth: 420,
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                className="reel-meta"
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    bottom: 12,
                                    color: "#fff",
                                    textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                                }}
                            >
                                <div style={{fontSize: 13, opacity: 0.85}}>{item.title}</div>
                                {item.description ? (
                                    <div style={{fontSize: 11, opacity: 0.7}}>{item.description}</div>
                                ) : null}
                                <div style={{marginTop: 6, fontSize: 11, opacity: 0.7}}>
                                    {idx + 1} / {items.length}
                                </div>
                            </div>

                            <div
                                className="reel-actions"
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    bottom: 12,
                                    display: "grid",
                                    gap: 8,
                                    pointerEvents: "auto",
                                }}
                            >
                                <button
                                    className="reel-btn"
                                    onClick={() => togglePlay(idx)}
                                    title={isPaused && idx === currentIndex ? "Play" : "Pause"}
                                >
                                    {isPaused && idx === currentIndex ? <FiPlay /> : <FiPause />}
                                </button>
                                <button
                                    className="reel-visit-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Navigate to store page (adjust URL as needed)
                                        window.location.href = `/store/${item.title
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}`;
                                    }}
                                >
                                    Visit Store
                                </button>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {error ? (
                <div style={{position: "fixed", top: 64, left: 16, color: "#fff", fontSize: 12, opacity: 0.7}}>
                    {error}
                </div>
            ) : null}
        </div>
    );
};

export default Home;
