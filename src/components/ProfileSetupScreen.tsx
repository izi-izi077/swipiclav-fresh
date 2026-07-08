import React, { useState, useEffect } from 'react'

/**
 * ProfileSetupScreen - Экран настройки профиля
 * Позволяет пользователю загрузить фото, ввести данные о себе
 * Интегрируется с данными Telegram, если разрешено
 */
interface ProfileSetupScreenProps {
  onProfileComplete: () => void
  initialData?: {
    name?: string
    age?: number
    location?: string
    bio?: string
  }
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ 
  onProfileComplete, 
  initialData 
}) => {
  const [name, setName] = useState(initialData?.name || '')
  const [age, setAge] = useState(initialData?.age?.toString() || '')
  const [location, setLocation] = useState(initialData?.location || '')
  const [bio, setBio] = useState(initialData?.bio || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

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
      
      // Заполняем данные из Telegram, если разрешено
      if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user
        if (!initialData?.name && user.first_name) {
          setName(user.first_name)
        }
      }
    }
  }, [initialData])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Валидация
    if (!name.trim()) {
      setError('Пожалуйста, введите имя')
      return
    }
    
    if (!age || parseInt(age) < 14 || parseInt(age) > 120) {
      setError('Введите корректный возраст (от 14 до 120)')
      return
    }
    
    if (!location.trim()) {
      setError('Пожалуйста, укажите город')
      return
    }
    
    if (!bio.trim()) {
      setError('Расскажите немного о себе')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    // Имитация сохранения профиля
    setTimeout(() => {
      setIsLoading(false)
      onProfileComplete()
    }, 1500)
  }

  const handleMainButtonClick = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  useEffect(() => {
    // Настройка MainButton при изменении формы
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      if (name && age && location && bio) {
        tg.MainButton.setText('ДАЛЕЕ')
        tg.MainButton.setParams({ 
          color: '#F093FB', 
          text_color: '#FFFFFF' 
        })
        tg.MainButton.show()
        
        tg.MainButton.onClick(handleMainButtonClick)
      } else {
        tg.MainButton.hide()
      }
    }
  }, [name, age, location, bio])

  return (
    <div className="profile-setup-screen">
      {/* Заголовок */}
      <div className="profile-header">
        <h2 className="profile-title">Настройка профиля</h2>
        <p className="profile-subtitle">Расскажите о себе, чтобы найти идеального партнера</p>
      </div>

      {/* Форма */}
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Фото */}
        <div className="photo-upload">
          <div className="photo-preview">
            {previewImage ? (
              <img src={previewImage} alt="Превью" className="photo-img" />
            ) : (
              <div className="photo-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5c.83 0 1.5-.67 1.5-1.5S9.33 10.5 8.5 10.5 7 11.17 7 12s.67 1.5 1.5 1.5zm7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM19 19v-5c0-1.1-.9-2-2-2H7.99c-1.1 0-2 .9-2 2v5h13.01zM12 4c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" fill="#888"/>
                </svg>
                <span className="photo-placeholder-text">Нажмите, чтобы загрузить</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="photo-input"
            disabled={isLoading}
          />
        </div>

        {/* Имя */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Имя</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Введите ваше имя"
            disabled={isLoading}
          />
        </div>

        {/* Возраст */}
        <div className="form-group">
          <label htmlFor="age" className="form-label">Возраст</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form-input"
            placeholder="Возраст"
            min="14"
            max="120"
            disabled={isLoading}
          />
        </div>

        {/* Локация */}
        <div className="form-group">
          <label htmlFor="location" className="form-label">Город</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
            placeholder="Город проживания"
            disabled={isLoading}
          />
        </div>

        {/* О себе */}
        <div className="form-group">
          <label htmlFor="bio" className="form-label">О себе</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="form-input form-textarea"
            placeholder="Расскажите о своих интересах, увлечениях..."
            rows={4}
            disabled={isLoading}
          />
        </div>
      </form>

      {/* Ошибка */}
      {error && (
        <div className="profile-error">
          {error}
        </div>
      )}

      {/* Кнопка "Далее" (MainButton) */}
      <div className="profile-footer">
        <button 
          type="button"
          className="profile-save-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить и продолжить'}
        </button>
      </div>
    </div>
  )
}

export default ProfileSetupScreen
