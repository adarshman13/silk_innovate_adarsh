import React, { useState, useEffect } from 'react';

const generateCards = () => {
  const numbers = Array.from({ length: 8 }, (_, index) => index + 1);
  const cards = [...numbers, ...numbers]; // Duplicate numbers for matching pairs
  return shuffleArray(cards);
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => checkForMatch(newFlippedCards), 1000);
    }
  };

  const checkForMatch = (flippedCards) => {
    const [first, second] = flippedCards;
    if (cards[first] === cards[second]) {
      setMatchedCards([...matchedCards, cards[first]]);
    }
    setFlippedCards([]);
  };

  const isFlipped = (index) => flippedCards.includes(index) || matchedCards.includes(cards[index]);

  useEffect(() => {
    if (matchedCards.length === cards.length / 2) {
      alert('You won the game!');
      setCards(generateCards()); // Reset the game
      setMatchedCards([]);
    }
  }, [matchedCards, cards]);

  return (
    <div style={styles.gameContainer}>
      <h2>Memory Game</h2>
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleCardClick(index)}
          >
            {isFlipped(index) ? card : "?"}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  gameContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 100px)',
    gap: '10px',
    justifyContent: 'center',
  },
  card: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};

export default MemoryGame;
