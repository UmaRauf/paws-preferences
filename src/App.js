import { useEffect, useState, useRef } from "react";
import Summary from "./Summary";
import "./App.css";

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Load 10 cat images
  useEffect(() => {
    const images = Array.from({ length: 10 }, (_, i) =>
      `https://cataas.com/cat?${Date.now()}-${i}`
    );
    setCats(images);
  }, []);

  const handleStart = (x) => {
    startX.current = x;
    currentX.current = x;
  };

  const handleMove = (x) => {
    if (!cardRef.current) return;
    currentX.current = x;
    const deltaX = currentX.current - startX.current;
    cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`;
  };

  const handleEnd = () => {
    if (!cardRef.current) return;
    const deltaX = currentX.current - startX.current;

    if (deltaX > 100) {
      // Swiped right (like)
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
      nextCard();
    } else if (deltaX < -100) {
      // Swiped left (dislike)
      nextCard();
    } else {
      // Snap back to center
      cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
    }
  };

  const nextCard = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease";
      cardRef.current.style.transform = `translateX(${currentX.current > startX.current ? 500 : -500}px) rotate(${currentX.current > startX.current ? 45 : -45}deg)`;
      setTimeout(() => {
        cardRef.current.style.transition = "none";
        setCurrentIndex((prev) => {
          if (prev + 1 === cats.length) setFinished(true);
          return prev + 1;
        });
      }, 300);
    }
  };

  if (finished) {
    return <Summary likedCats={likedCats} />;
  }

  return (
    <div className="app">
      <h1>🐾 Paws & Preferences</h1>
      <div className="card-container">
        {cats.slice(currentIndex, currentIndex + 1).map((url) => (
          <div
            key={url}
            className="card"
            ref={cardRef}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          >
            <img src={url} alt="cat" />
          </div>
        ))}
      </div>
      <p className="instructions">Swipe right 👍 if you like, left 👎 if not</p>
    </div>
  );
}
