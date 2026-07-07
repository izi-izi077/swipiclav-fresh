import React, { useState } from 'react'
import TelegramWebApp from '@twa-dev/sdk'

// Импорт компонентов из папки components
import Header from './components/Header'
import ProfileCard from './components/ProfileCard'
import InterestsGrid from './components/InterestsGrid'
import ActionBar from './components/ActionBar'

/**
 * ProfilePage component - Main profile page for Telegram Web App
 * Implements a dating app style profile card with photo gallery and actions
 */
const ProfilePage: React.FC = () => {
  // Инициализация Telegram WebApp
  React.useEffect(() => {
    TelegramWebApp.ready()
    TelegramWebApp.expand()
  }, [])

  // Данные профиля
  const [profile] = useState({
    name: 'Кирилл',
    age: 27,
    location: 'Москва',
    bio: 'Работаю в сфере IT, работаю с переработками, поэтому свободного времени не так много. Хочу найти подругу по интересам, возможно вторую половинку',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop'
    ]
  })

  // Список интересов
  const interests = [
    { id: 'it', name: 'IT' },
    { id: 'tech', name: 'Технологии' },
    { id: 'walks', name: 'Прогулки' },
    { id: 'dogs', name: 'Собаки' },
    { id: 'science', name: 'Наука' },
    { id: 'cinema', name: 'Кино' },
    { id: 'learning', name: 'Узнавать новое' },
    { id: 'travel', name: 'Путешествия' }
  ]

  // Управление выбранными интересами
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['it', 'tech', 'walks'])

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  // Обработчики действий
  const handleDislike = () => {
    console.log('Отклонено (Крест)')
    // Отправка данных через Telegram WebApp
    if (TelegramWebApp.initDataUnsafe && TelegramWebApp.initDataUnsafe.user) {
      TelegramWebApp.sendData(JSON.stringify({ action: 'dislike', userId: profile.name }))
    }
    // В реальном приложении здесь был бы вызов API для свайпа
  }

  const handleLike = () => {
    console.log('Лайк (Сердце)')
    // Отправка данных через Telegram WebApp
    if (TelegramWebApp.initDataUnsafe && TelegramWebApp.initDataUnsafe.user) {
      TelegramWebApp.sendData(JSON.stringify({ action: 'like', userId: profile.name }))
    }
    // В реальном приложении здесь был бы вызов API для свайпа
  }

  return (
    <div className="profile-page">
      <Header onBack={() => console.log('Назад')} />
      
      <main className="main-content">
        <ProfileCard profile={profile} />
        
        <InterestsGrid 
          interests={interests}
          selectedInterests={selectedInterests}
          onToggleInterest={toggleInterest}
        />
      </main>

      <ActionBar onDislike={handleDislike} onLike={handleLike} />
    </div>
  )
}

export default ProfilePage
