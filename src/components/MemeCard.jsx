import React, { useContext } from "react";
import "./MemeCard.css";
import { MemeContext } from "../context/MemeContext";

export default function MemeCard({ meme }) {
  const { deleteMeme, setEditingMeme } = useContext(MemeContext);

  return (
    <div className="meme-card">
      <h3>{meme.title}</h3>
      <img src={meme.imageUrl} alt={meme.title} />
      <div className="meme-card-buttons">
        <button onClick={() => setEditingMeme(meme)}>Edit</button>
        <button onClick={() => deleteMeme(meme.id)}>Delete</button>
      </div>
    </div>
  );
}
