import React, { useState, useEffect } from "react";
import "./MemeModal.css";

export default function MemeModal({ meme, onClose }) {
  const [upvotes, setUpvotes] = useState(meme.upvotes || 0);
  const [downvotes, setDownvotes] = useState(meme.downvotes || 0);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const storedVote = localStorage.getItem(`vote-${meme.id}`);
    if (storedVote) setUserVote(storedVote);
  }, [meme.id]);

  const handleVote = async (type) => {
    const previousVote = localStorage.getItem(`vote-${meme.id}`);
    let newUpvotes = upvotes;
    let newDownvotes = downvotes;

    if (previousVote === type) {
      // Remove vote
      if (type === "upvote") newUpvotes--;
      else newDownvotes--;
      localStorage.removeItem(`vote-${meme.id}`);
      setUserVote(null);
    } else {
      // New vote or switch vote
      if (type === "upvote") {
        newUpvotes++;
        if (previousVote === "downvote") newDownvotes--;
      } else {
        newDownvotes++;
        if (previousVote === "upvote") newUpvotes--;
      }
      localStorage.setItem(`vote-${meme.id}`, type);
      setUserVote(type);
    }

    // Update state
    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);

    // Patch to Firebase
    try {
      await fetch(
        `https://user-info-bf278-default-rtdb.firebaseio.com/memes/${meme.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            upvotes: newUpvotes,
            downvotes: newDownvotes,
          }),
        }
      );
    } catch (error) {
      console.error("Error updating vote in modal:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <img src={meme.avatar} alt={meme.displayName} className="modal-avatar" />
          <span className="modal-username">{meme.displayName}</span>
        </div>
        <img src={meme.imageUrl} alt="meme full" className="modal-image" />
        <div className="modal-votes">
          <button
            className={`vote-button ${userVote === "upvote" ? "active" : ""}`}
            onClick={() => handleVote("upvote")}
          >
            👍 {upvotes}
          </button>
          <button
            className={`vote-button ${userVote === "downvote" ? "active" : ""}`}
            onClick={() => handleVote("downvote")}
          >
            👎 {downvotes}
          </button>
        </div>
      </div>
    </div>
  );
}
