import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import ProfileSetupScreen from './components/ProfileSetupScreen'
import CardsScreen from './components/CardsScreen'

// Типы для управления экранами
type Screen = 'auth' | 'profile' | 'cards'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth')

  // Обработчик успешной авторизации
  const handleAuthSuccess = () => {
    setCurrentScreen('profile')
  }

  // Обработчик завершения настройки профиля
  const handleProfileComplete = () => {
    setCurrentScreen('cards')
  }

  // Основной рендер
  return (
    <div className="app">
      {/* Экран авторизации */}
      {currentScreen === 'auth' && (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}

      {/* Экран настройки профиля */}
      {currentScreen === 'profile' && (
        <ProfileSetupScreen onProfileComplete={handleProfileComplete} />
      )}

      {/* Экран карточек */}
      {currentScreen === 'cards' && (
        <CardsScreen />
      )}
    </div>
  )
}

export default App
