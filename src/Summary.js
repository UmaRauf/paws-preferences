import "./App.css";

function Summary({ likedCats }) {
  return (
    <div>
      <h2>Session Summary</h2>
      <div className="summary-grid">
        {likedCats.map((cat, index) => (
          <img key={index} src={cat.url} alt={`Cat ${index}`} />
        ))}
      </div>
    </div>
  );
}
