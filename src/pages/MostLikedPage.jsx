import React, { useEffect, useState } from "react";
import "./MostLikedPage.css"; // Use the dedicated styles

export default function MostLikedPage() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMostLikedMemes = async () => {
      try {
        const response = await fetch(
          "https://user-info-bf278-default-rtdb.firebaseio.com/memes.json"
        );
        const data = await response.json();
        const loadedMemes = [];

        for (let id in data) {
          const meme = data[id];
          const upvotes = meme.upvotes || 0;

          if (upvotes > 400 && meme.imageUrl?.trim()) {
            loadedMemes.push({ id, ...meme });
          }
        }

        // Sort by upvotes descending
        loadedMemes.sort((a, b) => b.upvotes - a.upvotes);

        // Shuffle result
        const shuffled = loadedMemes.sort(() => 0.5 - Math.random());

        setMemes(shuffled);
      } catch (err) {
        console.error("Failed to fetch most liked memes:", err);
      }
    };

    fetchMostLikedMemes();
  }, []);

  return (
    <div className="mostliked-container">
      <h1 className="mostliked-title">💯 Most Liked Memes</h1>
      <div className="mostliked-grid">
        {memes.map((meme) => (
          <div className="mostliked-card" key={meme.id}>
            <span className="mostliked-badge">🔥</span>
            <div className="mostliked-header">
              <img
                src={meme.avatar}
                alt={meme.displayName}
                className="mostliked-avatar"
              />
              <span className="mostliked-username">{meme.displayName}</span>
            </div>
            <img
              src={meme.imageUrl}
              alt="Meme"
              className="mostliked-image"
            />
            <div className="mostliked-votes">
              <span className="mostliked-upvotes">👍 {meme.upvotes}</span>
              <span className="mostliked-downvotes">👎 {meme.downvotes || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
