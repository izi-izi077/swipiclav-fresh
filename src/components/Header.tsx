import React from 'react'

/**
 * Header component - Top panel with back button and title
 * Represents the navigation header of the profile page
 */
interface HeaderProps {
  onBack?: () => void
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="header">
      <button 
        className="back-btn"
        onClick={onBack}
        aria-label="Назад"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M19 12H5M5 12L12 19M5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="header-title">Поиск пары / выбор</h1>
      <div className="header-placeholder" />
    </header>
  )
}

export default Header
