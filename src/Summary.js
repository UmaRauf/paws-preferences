import "./App.css";

export default function Summary({ likedCats }) {
  return (
    <div className="summary">
      <h1>🎉 Your Favourites</h1>
      <p>You liked <strong>{likedCats.length}</strong> cats!</p>
      <div className="summary-grid">
        {likedCats.map((url, i) => (
          <img key={i} src={url} alt="liked cat" />
        ))}
      </div>
    </div>
  );
}
