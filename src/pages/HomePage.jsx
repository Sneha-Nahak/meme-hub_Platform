import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import MemeModal from "../components/MemeModal";

export default function HomePage() {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch(
          "https://user-info-bf278-default-rtdb.firebaseio.com/memes.json"
        );
        const data = await response.json();
        const loadedMemes = [];

        for (let id in data) {
          const meme = data[id];
          if (meme.imageUrl && meme.imageUrl.trim() !== "") {
            loadedMemes.push({ id, ...meme });
          }
        }

        // Shuffle memes on each page load
        const shuffledMemes = loadedMemes.sort(() => 0.5 - Math.random());
        setMemes(shuffledMemes);
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    };
    fetchMemes();
  }, []);

  const handleVoteToggle = async (memeId, type) => {
    const voteKey = `vote-${memeId}`;
    const previousVote = localStorage.getItem(voteKey);
    const meme = memes.find((m) => m.id === memeId);

    let updatedUpvotes = meme.upvotes || 0;
    let updatedDownvotes = meme.downvotes || 0;

    if (previousVote === type) {
      if (type === "upvote") updatedUpvotes--;
      else updatedDownvotes--;
      localStorage.removeItem(voteKey);
    } else {
      if (type === "upvote") {
        updatedUpvotes++;
        if (previousVote === "downvote") updatedDownvotes--;
      } else {
        updatedDownvotes++;
        if (previousVote === "upvote") updatedUpvotes--;
      }
      localStorage.setItem(voteKey, type);
    }

    try {
      await fetch(
        `https://user-info-bf278-default-rtdb.firebaseio.com/memes/${memeId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            upvotes: updatedUpvotes,
            downvotes: updatedDownvotes,
          }),
        }
      );

      setMemes((prevMemes) =>
        prevMemes.map((m) =>
          m.id === memeId
            ? { ...m, upvotes: updatedUpvotes, downvotes: updatedDownvotes }
            : m
        )
      );
    } catch (error) {
      console.error("Vote update failed:", error);
    }
  };

  return (
    <div className="feed-container">
      <h1 className="feed-title">🔥 Meme Feed</h1>
      <div className="feed-grid">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="feed-card"
            onClick={() => setSelectedMeme(meme)}
          >
            <div className="feed-header">
              <img
                src={meme.avatar}
                alt={meme.displayName}
                className="user-avatar"
              />
              <span className="user-name">{meme.displayName}</span>
            </div>
            <img src={meme.imageUrl} alt="meme" className="feed-image" />
            <div className="feed-votes">
              <button
                className="vote-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVoteToggle(meme.id, "upvote");
                }}
              >
                👍 {meme.upvotes || 0}
              </button>
              <button
                className="vote-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVoteToggle(meme.id, "downvote");
                }}
              >
                👎 {meme.downvotes || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMeme && (
        <MemeModal meme={selectedMeme} onClose={() => setSelectedMeme(null)} />
      )}
    </div>
  );
}
