import React, { useState, useEffect } from 'react'

// Типы данных для карточки
interface CardData {
  id: string
  name: string
  age: number
  location: string
  bio: string
  photo: string
}

// Данные карточек (заглушка)
const mockCards: CardData[] = [
  {
    id: '1',
    name: 'Анна',
    age: 24,
    location: 'Москва',
    bio: 'Люблю путешествия, кино и кофе. Ищу кого-то для совместных приключений!',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop'
  },
  {
    id: '2',
    name: 'Мария',
    age: 26,
    location: 'Санкт-Петербург',
    bio: 'Фотограф. Люблю природу, музыку и добрых людей. Готова к новым впечатлениям!',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop'
  },
  {
    id: '3',
    name: 'Елена',
    age: 23,
    location: 'Казань',
    bio: 'Студентка. Интересуюсь искусством, литературой и путешествиями.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop'
  }
]

/**
 * CardsScreen - Экран карточек для свайпа
 * Реализует вертикальную карточку с фото и информацией
 * Кнопки действий внизу: ✕ (пропуск) и ❤️ (лайк)
 */
const CardsScreen: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cardDirection, setCardDirection] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      tg.ready()
      tg.expand()
      
      // Подписка на изменение темы
      tg.onEvent('themeChanged', (themeParams: any) => {
        document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#1c1c1e')
        document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#ffffff')
        document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#667eea')
        document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff')
      })
      
      // Устанавливаем цвета из темы Telegram
      if (tg.themeParams) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#1c1c1e')
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff')
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#667eea')
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff')
      }
    }
  }, [])

  const handleDislike = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCardDirection('left')
    
    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1)
      setIsAnimating(false)
      setCardDirection(null)
    }, 300)
  }

  const handleLike = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCardDirection('right')
    
    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1)
      setIsAnimating(false)
      setCardDirection(null)
    }, 300)
  }

  // Получаем текущую карточку
  const currentCard = mockCards[currentCardIndex]

  // Если карточки закончились
  if (!currentCard) {
    return (
      <div className="cards-screen empty-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F093FB"/>
          </svg>
        </div>
        <h3 className="empty-title">Все карточки просмотрены</h3>
        <p className="empty-text">Проверьте позже - мы добавим новых людей!</p>
        <button 
          className="empty-refresh-btn"
          onClick={() => setCurrentCardIndex(0)}
        >
          Начать заново
        </button>
      </div>
    )
  }

  return (
    <div className="cards-screen">
      {/* Карточка */}
      <div 
        className={`card-container ${isAnimating ? 'animating' : ''} ${cardDirection || ''}`}
      >
        <div className="card">
          {/* Фото */}
          <div className="card-photo">
            <img src={currentCard.photo} alt={currentCard.name} className="card-img" />
            
            {/* Оверлей с информацией */}
            <div className="card-overlay">
              <div className="card-info">
                <div className="card-name-age">
                  <span className="card-name">{currentCard.name}</span>
                  <span className="card-age">{currentCard.age}</span>
                </div>
                <div className="card-location">
                  {currentCard.location}
                </div>
              </div>
            </div>
          </div>

          {/* Био */}
          <div className="card-bio">
            <p className="card-bio-text">{currentCard.bio}</p>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="card-actions">
        <button 
          className="action-btn dislike-btn"
          onClick={handleDislike}
          disabled={isAnimating}
          aria-label="Пропустить"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
          </svg>
        </button>

        <button 
          className="action-btn like-btn"
          onClick={handleLike}
          disabled={isAnimating}
          aria-label="Лайк"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
          </svg>
        </button>
      </div>

      {/* Прогресс-бар */}
      <div className="card-progress">
        <div 
          className="card-progress-bar" 
          style={{ 
            width: `${Math.min((currentCardIndex + 1) / mockCards.length * 100, 100)}%` 
          }} 
        />
      </div>
    </div>
  )
}

export default CardsScreen
