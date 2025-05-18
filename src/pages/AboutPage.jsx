import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About MemeZone</h1>
      <p className="about-intro">
        Welcome to <strong>MemeZone</strong> – the ultimate hub for meme lovers, creators, and casual scrollers alike!
      </p>

      <section className="about-section">
        <h2>😄 What is MemeZone?</h2>
        <p>
          MemeZone is a community-driven platform dedicated to discovering, sharing, and celebrating the best memes on the internet. Whether you're here to laugh, create, vote, or just vibe, we've got a spot for you.
        </p>
      </section>

      <section className="about-section">
        <h2>🚀 What You Can Do</h2>
        <ul className="about-list">
          <li><strong>Browse:</strong> Scroll through an endless feed of hilarious, trending, and top-voted memes.</li>
          <li><strong>Vote:</strong> Upvote or downvote memes to help the best content rise to the top.</li>
          <li><strong>Create:</strong> Upload your own meme masterpieces and get feedback from the community.</li>
          <li><strong>Trending & Most Liked:</strong> Explore what’s catching fire or earning the most love across the platform.</li>
          <li><strong>Community:</strong> Connect with meme creators, follow their content, and build your own meme reputation.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🔒 User-First Design</h2>
        <p>
          We prioritize a smooth and secure user experience. Users must register or log in to view and post content, ensuring accountability and a better-curated community. Your votes are stored locally for fairness, and your content is safely stored in our cloud database.
        </p>
      </section>

      <section className="about-section">
        <h2>🌎 Why We Built This</h2>
        <p>
          In a world flooded with content, MemeZone was born to spotlight the funniest, wittiest, and most creative voices on the internet. We wanted a space where memes are more than a scroll-by laugh – they’re a cultural exchange, a social statement, and most of all, a whole lot of fun.
        </p>
      </section>

      <section className="about-section">
        <h2>📈 What’s Next</h2>
        <p>
          We’re always building! Future features include meme creation tools, personalized feeds, comment threads, user profiles, and more ways to connect with fellow meme fans. Got suggestions? We’d love to hear them!
        </p>
      </section>

      <section className="about-section">
        <h2>🙌 Thank You</h2>
        <p>
          Thanks for being part of MemeZone. Your laughter, creativity, and support are what keep this platform alive. Now go on and meme like there's no tomorrow!
        </p>
      </section>
    </div>
  );
}
