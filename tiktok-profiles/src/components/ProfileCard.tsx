import React from 'react'

/**
 * Profile interface - Интерфейс для карточки профиля
 */
export interface Profile {
  id: string
  name: string
  age: number
  location: string
  bio: string
  photos: string[]
  interests: string[]
}

/**
 * ProfileCard component - Карточка профиля в стиле TikTok (вертикальная прокрутка)
 */
interface ProfileCardProps {
  profile: Profile
  onNext?: () => void
  onPrev?: () => void
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onNext, onPrev }) => {
  return (
    <div className="profile-card">
      {/* Контейнер с фото (аналог видео в TikTok) */}
      <div className="photo-container">
        <img 
          src={profile.photos[0]} 
          alt={profile.name}
          className="profile-photo"
        />
        
        {/* Навигация по фото */}
        <div className="photo-nav">
          {profile.photos.length > 1 && (
            <>
              <button 
                className="nav-btn prev"
                onClick={onPrev}
                aria-label="Предыдущее фото"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="nav-btn next"
                onClick={onNext}
                aria-label="Следующее фото"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Информация о пользователе поверх фото */}
        <div className="profile-info">
          <div className="user-info">
            <div className="user-avatar">
              <span>{profile.name.charAt(0)}</span>
            </div>
            <div className="user-details">
              <h3 className="user-name">{profile.name}, {profile.age}</h3>
              <p className="user-location">{profile.location}</p>
            </div>
          </div>

          <p className="user-bio">{profile.bio}</p>
        </div>

        {/* Интересы внизу карточки */}
        <div className="profile-interests">
          {profile.interests.map((interest, index) => (
            <span key={index} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>

        {/* Кнопка "Больше" */}
        <div className="profile-actions">
          <button className="more-btn">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
