import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp
  
  // Сообщаем TMA, что приложение готово
  tg.ready()
  
  // Раскрываем приложение на весь экран
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
