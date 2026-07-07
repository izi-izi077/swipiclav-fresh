import React, { useState } from 'react'

/**
 * ProfileCard component - Displays user profile with photo gallery and info
 * Contains navigation for photo slider and profile information display
 */
interface Profile {
  name: string
  age: number
  location: string
  bio: string
  photos: string[]
}

interface ProfileCardProps {
  profile: Profile
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Переключение на следующее фото
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length)
  }

  // Переключение на предыдущее фото
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length)
  }

  return (
    <div className="profile-card">
      {/* Контейнер с фото и навигацией */}
      <div className="photo-container">
        <button 
          className="photo-nav photo-nav-left"
          onClick={prevPhoto}
          aria-label="Предыдущее фото"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="photo-wrapper">
          <img 
            src={profile.photos[currentPhotoIndex]} 
            alt={`${profile.name} - фото ${currentPhotoIndex + 1}`}
            className="profile-photo"
          />
        </div>

        <button 
          className="photo-nav photo-nav-right"
          onClick={nextPhoto}
          aria-label="Следующее фото"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Текст поверх фото */}
      <div className="photo-overlay">
        <div className="name-age-badge">
          <span className="name">{profile.name}</span>
          <span className="age">{profile.age} лет</span>
        </div>
        <div className="location-badge">
          {profile.location}
        </div>
      </div>

      {/* Краткое описание */}
      <div className="profile-bio">
        <p className="bio-text">{profile.bio}</p>
      </div>
    </div>
  )
}

export default ProfileCard
