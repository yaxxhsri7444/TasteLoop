import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import ReelFeed from '../../component/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/saved", { withCredentials: true })
            .then(response => {
                    const savedFoods = (response.data.savedFoods || []).map((item) => {
                        const f = item.foodItem || item.food || {};
                        return {
                            _id: f._id,
                            video: f.video,
                            description: f.discription || f.description || '',
                            likeCount: f.likeCount || 0,
                            savesCount: f.savesCount || 0,
                            commentsCount: f.commentsCount || 0,
                            foodPartner: f.foodPartner,
                        }
                    })
                    setVideos(savedFoods)
                })
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved