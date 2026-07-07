import React, { useState, useEffect } from 'react'

const App: React.FC = () => {
  const [user] = useState({ name: 'User', avatar: 'U' })
  const [balance, setBalance] = useState(10000)
  const [selectedBet, setSelectedBet] = useState<string | null>(null)
  const [betAmount, setBetAmount] = useState(100)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [history, setHistory] = useState<{ number: number; color: 'red' | 'black' | 'green' }[]>([])

  useEffect(() => {
    const savedBalance = localStorage.getItem('rouletteBalance')
    if (savedBalance) {
      setBalance(parseInt(savedBalance, 10))
    }
  }, [])

  const handleBetSelect = (color: string) => {
    setSelectedBet(color)
  }

  const handleBetAmountChange = (amount: number) => {
    setBetAmount(amount)
  }

  const playGame = async () => {
    if (!selectedBet) {
      alert('Выберите ставку!')
      return
    }
    if (betAmount > balance) {
      alert('Недостаточно средств!')
      return
    }

    setIsSpinning(true)
    setResult(null)

    for (let i = 0; i < 20; i++) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const winningNumber = Math.floor(Math.random() * 37)
    let winningColor: 'red' | 'black' | 'green' = 'green'
    
    if (winningNumber !== 0) {
      winningColor = winningNumber % 2 === 0 ? 'black' : 'red'
    }

    setResult(winningNumber)

    const newHistory = [{ number: winningNumber, color: winningColor }, ...history].slice(0, 10)
    setHistory(newHistory)

    if (selectedBet === winningColor) {
      const winAmount = betAmount * (winningColor === 'green' ? 14 : 2)
      const newBalance = balance + winAmount
      setBalance(newBalance)
      localStorage.setItem('rouletteBalance', newBalance.toString())
      alert(`Вы выиграли ${winAmount}!`)
    } else {
      const newBalance = balance - betAmount
      setBalance(newBalance)
      localStorage.setItem('rouletteBalance', newBalance.toString())
    }

    setIsSpinning(false)
  }

  const getColorClass = (number: number): 'red' | 'black' | 'green' => {
    if (number === 0) return 'green'
    return number % 2 === 0 ? 'black' : 'red'
  }

  return (
    <div className="app">
      <header className="header">
        <div className="user-info">
          <div className="user-avatar">{user.avatar}</div>
          <span>{user.name}</span>
        </div>
        <div className="balance-container">
          <div className="balance-label">Баланс</div>
          <div className="balance-amount">{balance.toLocaleString()} ₽</div>
        </div>
      </header>

      <main className="main-content">
        <section className="game-section">
          <h2 className="game-title">Cyber Roulette</h2>
          
          <div className={`roulette-display ${isSpinning ? 'spinning' : ''}`}>
            <div className={`roulette-window ${result !== null && (selectedBet === getColorClass(result) || selectedBet === 'green' && result === 0) ? 'winning' : ''}`}>
              {isSpinning ? '?' : result !== null ? result : '0'}
            </div>
          </div>

          <div className="betting-controls">
            <div className="bet-options">
              <button 
                className={`bet-btn red ${selectedBet === 'red' ? 'selected' : ''}`}
                onClick={() => handleBetSelect('red')}
              >
                Красное
                <span className="bet-amount">{betAmount * 2} ₽</span>
              </button>
              <button 
                className={`bet-btn green ${selectedBet === 'green' ? 'selected' : ''}`}
                onClick={() => handleBetSelect('green')}
              >
                Зеро
                <span className="bet-amount">{betAmount * 14} ₽</span>
              </button>
              <button 
                className={`bet-btn black ${selectedBet === 'black' ? 'selected' : ''}`}
                onClick={() => handleBetSelect('black')}
              >
                Черное
                <span className="bet-amount">{betAmount * 2} ₽</span>
              </button>
            </div>

            <div className="select-bet" onClick={() => {}}>
              <span>Сумма ставки</span>
              <strong>{betAmount} ₽</strong>
            </div>

            <div className="action-buttons">
              <button 
                className="action-btn add" 
                onClick={() => handleBetAmountChange(betAmount + 100)}
              >
                +100
              </button>
              <button 
                className="action-btn remove" 
                onClick={() => handleBetAmountChange(Math.max(100, betAmount - 100))}
              >
                -100
              </button>
            </div>

            <button 
              className="play-btn"
              onClick={playGame}
              disabled={isSpinning}
            >
              {isSpinning ? 'Крутим...' : 'ИГРАТЬ'}
            </button>
          </div>
        </section>

        <section className="game-history">
          <h3>История игр</h3>
          <div className="history-list">
            {history.length === 0 ? (
              <span style={{ color: '#888', fontSize: '14px' }}>Нет истории игр</span>
            ) : (
              history.map((item, index) => (
                <div key={index} className={`history-item ${item.color}`}>
                  {item.number}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
