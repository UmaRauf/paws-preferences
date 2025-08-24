import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import Summary from "./Summary";
import "./App.css";

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  // Fetch 10 random cats
  useEffect(() => {
    const images = Array.from({ length: 10 }, (_, i) =>
      `https://cataas.com/cat?${Date.now()}-${i}`
    );
    setCats(images);
  }, []);

  const swiped = (direction, url) => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, url]);
    }
    setCurrentIndex((prev) => prev + 1);

    if (currentIndex + 1 === cats.length) {
      setFinished(true);
    }
  };

  if (finished) {
    return <Summary likedCats={likedCats} />;
  }

  return (
    <div className="app">
      <h1>🐾 Paws & Preferences</h1>
      <div className="card-container">
        {cats.slice(currentIndex).map((url) => (
          <TinderCard
            className="card"
            key={url}
            onSwipe={(dir) => swiped(dir, url)}
            preventSwipe={["up", "down"]}
          >
            <img src={url} alt="cat" />
          </TinderCard>
        ))}
      </div>
      <p className="instructions">Swipe right 👍 if you like, left 👎 if not</p>
    </div>
  );
}
