import React, { useState, useEffect } from 'react'

/**
 * AuthScreen - Экран авторизации
 * Реализует вход через Telegram и другие способы
 * Использует нативные элементы TMA: MainButton, initDataUnsafe
 */
const AuthScreen: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Инициализация Telegram WebApp при монтировании компонента
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      // Сообщаем TMA, что приложение готово
      tg.ready()
      tg.expand()
      
      // Подписываемся на изменение темы
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

  const handleTelegramAuth = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
        
        // Получаем данные пользователя из initDataUnsafe
        const initData = tg.initDataUnsafe
        
        if (initData && initData.user) {
          // Пользователь авторизован через Telegram
          console.log('Telegram user data:', initData.user)
          
          // Настройка MainButton для подтверждения авторизации
          tg.MainButton.setText('ВОЙТИ')
          tg.MainButton.setParams({ 
            color: '#F093FB', 
            text_color: '#FFFFFF' 
          })
          tg.MainButton.show()
          
          // Обработка нажатия на MainButton
          tg.MainButton.onClick(() => {
            tg.MainButton.hide()
            onAuthSuccess()
          })
          
          // Показываем кнопку, если initDataUnsafe содержит данные пользователя
          if (initData.user.id) {
            // Небольшая задержка для демонстрации
            setTimeout(() => {
              setIsLoading(false)
              onAuthSuccess()
            }, 1500)
          }
        } else {
          // Если данные пользователя отсутствуют, имитируем авторизацию
          console.log('Simulating Telegram authorization...')
          setTimeout(() => {
            setIsLoading(false)
            onAuthSuccess()
          }, 1500)
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('Ошибка авторизации. Попробуйте еще раз.')
      setIsLoading(false)
    }
  }

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Пожалуйста, введите корректный email')
      return
    }
    setIsLoading(true)
    setError(null)
    
    // Имитация авторизации через email
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess()
    }, 1500)
  }

  const handlePhoneAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона')
      return
    }
    setIsLoading(true)
    setError(null)
    
    // Имитация авторизации через телефон
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess()
    }, 1500)
  }

  return (
    <div className="auth-screen">
      {/* Логотип и заголовок */}
      <div className="auth-header">
        <div className="auth-logo">
          <div className="auth-logo-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="url(#logo-gradient)"/>
              <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="white"/>
              <defs>
                <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F093FB" />
                  <stop offset="1" stopColor="#F5576C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="auth-title">Свайп</h1>
        </div>
        <p className="auth-subtitle">Найдите свою вторую половинку</p>
      </div>

      {/* Формы авторизации */}
      <div className="auth-forms">
        {/* Кнопка входа через Telegram */}
        <button 
          className="auth-btn telegram-btn"
          onClick={handleTelegramAuth}
          disabled={isLoading}
        >
          <div className="auth-btn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168 9.022-1.444 9.622-2.656 9.622-1.203 0-1.926-.627-2.651-1.258-1.453-1.244-2.705-2.496-3.852-3.757-1.075-1.125-2.15-2.255-3.133-3.366-1.523-1.651-2.725-3.255-2.725-3.255 0 0 .319.282.669.563l1.503 1.314c.35.305.668.562.668.562l-2.654 2.712c-.33.338-.625.633-.85.86-.702.721-1.249 1.274-1.249 1.274 0 0 .513-.306.956-.749.443-.443.85-.85.85-.85s-1.237-1.265-3.648-3.677c-2.638-2.638-2.94-4.67-2.94-4.67 0 0 .185.36.36.66.174.3.36.66.36.66S5.15 8.233 7.476 5.908c1.236-1.236 2.24-1.854 2.24-1.854s.283.19.563.38c.282.19.562.38.562.38l2.712 2.655s.26.282.52.563c.26.28.52.56.52.56s-2.34 2.34-3.676 3.676c-1.337 1.337-2.674 2.674-3.94 3.94-.395.395-.66.66-.66.66s.36.184.66.36c.3.174.66.36.66.36s-2.34 2.34-3.676 3.676c-1.337 1.337-2.674 2.674-3.94 3.94-.395.395-.66.66-.66.66s.185.319.36.66c.174.3.36.66.36.66-2.638 2.638-2.94 4.67-2.94 4.67 0 0 .36-.185.66-.36.3-.174.66-.36.66-.36s-2.34 2.34-3.676 3.676c-1.337 1.337-2.674 2.674-3.94 3.94-.395.395-.66.66-.66.66s.185.319.36.66c.174.3.36.66.36.66z" fill="#0088cc"/>
            </svg>
          </div>
          <span className="auth-btn-text">Войти через Telegram</span>
        </button>

        {/* Разделитель */}
        <div className="auth-divider">
          <span className="auth-divider-text">или</span>
        </div>

        {/* Форма входа по email */}
        <form className="auth-form" onSubmit={handleEmailAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="auth-btn email-btn"
            disabled={isLoading}
          >
            <span className="auth-btn-text">Email</span>
          </button>
        </form>

        {/* Форма входа по телефону */}
        <form className="auth-form" onSubmit={handlePhoneAuth}>
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="auth-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="auth-btn phone-btn"
            disabled={isLoading}
          >
            <span className="auth-btn-text">Телефон</span>
          </button>
        </form>
      </div>

      {/* Ошибка */}
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {/* Подвал */}
      <div className="auth-footer">
        <p className="auth-footer-text">
          Продолжая, вы соглашаетесь с нашими 
          <a href="#" className="auth-link">Условиями</a> и 
          <a href="#" className="auth-link">Политикой конфиденциальности</a>
        </p>
      </div>
    </div>
  )
}

export default AuthScreen
