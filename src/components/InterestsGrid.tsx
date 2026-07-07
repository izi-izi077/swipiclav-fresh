import React from 'react'

/**
 * InterestsGrid component - Displays user interests as interactive tags
 * Shows both selected (filled) and unselected (outline) interest tags
 */
interface Interest {
  id: string
  name: string
}

interface InterestsGridProps {
  interests: Interest[]
  selectedInterests: string[]
  onToggleInterest: (interestId: string) => void
}

const InterestsGrid: React.FC<InterestsGridProps> = ({ 
  interests, 
  selectedInterests, 
  onToggleInterest 
}) => {
  return (
    <div className="interests-section">
      <h2 className="interests-title">Интересы</h2>
      <div className="interests-grid">
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id)
          return (
            <button
              key={interest.id}
              className={`interest-tag ${isSelected ? 'selected' : 'outline'}`}
              onClick={() => onToggleInterest(interest.id)}
              aria-pressed={isSelected}
            >
              {interest.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default InterestsGrid
