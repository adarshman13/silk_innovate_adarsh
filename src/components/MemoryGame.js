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
      <h2 style={styles.title}>Memory Game</h2>
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.cardContainer}
            onClick={() => handleCardClick(index)}
          >
            <div
              style={{
                ...styles.card,
                transform: isFlipped(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of the card - Shows the question mark */}
              <div style={styles.cardFront}>
                {"?"}
              </div>

              {/* Back of the card - Shows the number */}
              <div style={styles.cardBack}>
                {card}
              </div>
            </div>
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
    backgroundColor: '#000',  // Black background for the dashboard theme
    color: '#fff',  // White text for visibility
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 100px)',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  cardContainer: {
    perspective: '1000px', // To give the 3D effect to the card flip
  },
  card: {
    width: '100px',
    height: '100px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
  },
  cardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff', // White front with a question mark
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px', // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#000', // Black color for visible text
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backfaceVisibility: 'hidden', // Ensures front is hidden when flipped
  },
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333', // Dark background color for the back of the card
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff', // White text for the number
    transform: 'rotateY(180deg)',
    borderRadius: '4px',
    backfaceVisibility: 'hidden', // Ensures back is hidden when flipped
  },
};

export default MemoryGame;
