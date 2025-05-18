import React, { createContext, useState } from "react";

export const MemeContext = createContext();

const MEMES_API = "https://user-info-bf278-default-rtdb.firebaseio.com/memes";

export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [editingMeme, setEditingMeme] = useState(null);

  const fetchMemes = async () => {
    try {
      const res = await fetch(`${MEMES_API}.json`);
      const data = await res.json();
      const loadedMemes = [];
      for (let id in data) {
        loadedMemes.push({ id, ...data[id] });
      }
      setMemes(loadedMemes.reverse());
    } catch (err) {
      console.error("Failed to fetch memes", err);
    }
  };

  const addMeme = async (form) => {
    const newMeme = {
      ...form,
      username: "defaultUser",
      displayName: "Default User",
      avatar: "https://i.pravatar.cc/150?img=11",
      upvotes: 0,
      downvotes: 0,
    };
    await fetch(`${MEMES_API}.json`, {
      method: "POST",
      body: JSON.stringify(newMeme),
    });
    await fetchMemes();
  };

  const updateMeme = async (id, form) => {
    await fetch(`${MEMES_API}/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    await fetchMemes();
  };

  const deleteMeme = async (id) => {
    await fetch(`${MEMES_API}/${id}.json`, {
      method: "DELETE",
    });
    await fetchMemes();
  };

  const getTrendingMemes = () => {
    return [...memes]
      .sort((a, b) => {
        const aScore = (a.upvotes || 0) - (a.downvotes || 0);
        const bScore = (b.upvotes || 0) - (b.downvotes || 0);
        return bScore - aScore;
      })
      .slice(0, 10);
  };

  return (
    <MemeContext.Provider
      value={{
        memes,
        fetchMemes,
        addMeme,
        updateMeme,
        deleteMeme,
        editingMeme,
        setEditingMeme,
        getTrendingMemes,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};
