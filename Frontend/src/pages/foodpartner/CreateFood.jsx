import React, { useState, useEffect } from 'react'
import './CreateFood.css'

const CreateFood = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // cleanup preview url on unmount or when changed
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setVideoFile(file)
    // revoke previous preview if any
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please enter a name for the food.')
    if (!description.trim()) return setError('Please enter a description.')
    if (!videoFile) return setError('Please upload a video.')

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('video', videoFile)

      // TODO: replace with your API endpoint
      // Example: await axios.post('/api/food', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log('Submitting form (mock):', { name, description, videoFile })

      // reset form on success (mock)
      setName('')
      setDescription('')
      setVideoFile(null)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
      }
    } catch (err) {
      console.error(err)
      setError('Upload failed. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="create-food">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h3 className="card-title">Create Food</h3>

        <label className="label" htmlFor="video">Video</label>
        <div className={`video-preview ${previewUrl ? 'has-video' : ''}`}>
          {previewUrl ? (
            <video src={previewUrl} controls />
          ) : (
            <div className="placeholder">
              <br />
              <span>Upload a video (mp4, mov) 
                <br /> or click to choose</span>
            </div>
          )}
          <label className="video-input-label" htmlFor="video-input">
            <input
              id="video-input"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: 'none' }}
            />
            {/* accessible text: clickable area */}
            <span className="link">Choose video</span>
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Spicy Tofu Bowl"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the dish"
          />
        </div>

        {error && <div className="helper" style={{ color: 'var(--primary)' }}>{error}</div>}

        <div className="form-actions">
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Uploading...' : 'Create'}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setName('')
              setDescription('')
              setVideoFile(null)
              if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
                setPreviewUrl('')
              }
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood