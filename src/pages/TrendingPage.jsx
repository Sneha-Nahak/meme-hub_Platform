// File: src/pages/TrendingPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { MemeContext } from "../context/MemeContext";
import "./TrendingPage.css";

const TrendingPage = () => {
  const { memes, fetchMemes } = useContext(MemeContext);
  const [trendingMemes, setTrendingMemes] = useState([]);

  useEffect(() => {
    const getTrendingMemes = async () => {
      await fetchMemes();

      const trending = [...memes]
        .map((meme) => ({
          ...meme,
          netVotes: (meme.upvotes || 0) - (meme.downvotes || 0),
        }))
        .sort((a, b) => b.netVotes - a.netVotes)
        .slice(0, 12); // Top 12 trending

      setTrendingMemes(trending);
    };

    getTrendingMemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memes.length]); // only re-run when meme count changes

  return (
    <div className="trending-container">
      <h2 className="trending-title">🔥 Trending Memes</h2>
      <div className="trending-grid">
        {trendingMemes.map((meme) => (
          <div className="trending-card" key={meme.id}>
            <div className="trending-badge">🔥</div>

            <div className="trending-header">
              <img
                src={meme.avatar}
                alt={`${meme.displayName} avatar`}
                className="trending-avatar"
              />
              <span className="trending-username">{meme.displayName}</span>
            </div>

            <img
              src={meme.imageUrl}
              alt="Meme"
              className="trending-image"
            />

            <div className="trending-votes">
              <span className="trending-upvotes">⬆ {meme.upvotes || 0}</span>
              <span className="trending-downvotes">⬇ {meme.downvotes || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
