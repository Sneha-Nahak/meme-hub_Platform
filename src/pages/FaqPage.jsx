import React, { useState } from "react";
import "./FaqPage.css";

const faqData = [
  {
    question: "What is MemeZone?",
    answer:
      "MemeZone is a community-driven platform where users can share, vote, and discover the funniest and most trending memes online.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can register by clicking on the Register link and filling out the signup form with your username, display name, and password.",
  },
  {
    question: "Can I vote on memes?",
    answer:
      "Absolutely! You can upvote or downvote memes to help highlight the best content and give feedback to creators.",
  },
  {
    question: "How are memes sorted?",
    answer:
      "Memes are displayed based on popularity and recency. You can also explore trending memes or the most liked ones via dedicated pages.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. We respect your privacy and store your information securely. We never share your data with third parties.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out to us via our Contact page or email us directly at memeZone.enquiry@gmail.com.",
  },
];

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">❓ Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div
                className="faq-answer"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
