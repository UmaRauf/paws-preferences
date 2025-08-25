import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ended, setEnded] = useState(false);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  // Fetch 4 cats
  useEffect(() => {
    const newCats = [];
    for (let i = 0; i < 4; i++) {
      newCats.push({
        name: `Cat ${i + 1}`,
        img: `https://cataas.com/cat?${Date.now()}-${i}`,
      });
    }
    setCats(newCats);
  }, []);

  const handleChoice = (choice) => {
    const currentCat = cats[currentIndex];

    if (choice === "like") {
      setLikes((prev) => [...prev, currentCat]);
    } else {
      setDislikes((prev) => [...prev, currentCat]);
    }

    if (currentIndex < cats.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setEnded(true);
    }
  };

  const handleEndSession = () => setEnded(true);

  if (cats.length === 0) return <h2>Loading cats...</h2>;

  return (
    <div className="app">
      <h1>Cat Preferences</h1>

      {!ended ? (
        <div>
          <div className="card">
            <img
              src={cats[currentIndex].img}
              alt={cats[currentIndex].name}
              className="cat-img"
            />
            <h2>{cats[currentIndex].name}</h2>
          </div>

          <div className="buttons">
            <button onClick={() => handleChoice("dislike")}>❌ Dislike</button>
            <button onClick={() => handleChoice("like")}>❤️ Like</button>
          </div>

          <button className="end-btn" onClick={handleEndSession}>
            End Session
          </button>
        </div>
      ) : (
        <div className="summary">
          <h2>Session Summary</h2>

          <div>
            <h3>👍 Likes</h3>
            {likes.length ? (
              likes.map((cat, idx) => (
                <div key={idx} className="summary-card">
                  <img src={cat.img} alt={cat.name} className="cat-thumb" />
                  <p>{cat.name}</p>
                </div>
              ))
            ) : (
              <p>None</p>
            )}
          </div>

          <div>
            <h3>👎 Dislikes</h3>
            {dislikes.length ? (
              dislikes.map((cat, idx) => (
                <div key={idx} className="summary-card">
                  <img src={cat.img} alt={cat.name} className="cat-thumb" />
                  <p>{cat.name}</p>
                </div>
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
