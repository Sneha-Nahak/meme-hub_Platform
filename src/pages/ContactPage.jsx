import React, { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For real-world: send this to a backend or email service
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">📬 Get in Touch</h1>
      <p className="contact-subtitle">
        We'd love to hear from you! For inquiries, suggestions, or collaborations, please fill out the form below.
      </p>

      <div className="contact-info">
        <p><strong>Email:</strong> <a href="mailto:memeZone.enquiry@gmail.com">memeZone.enquiry@gmail.com</a></p>
        <p><strong>Address:</strong> MemeZone HQ, 42 Meme Street, Netville, NY 10001, USA</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Send Message</button>
        {submitted && <p className="thank-you">✅ Thanks for contacting us!</p>}
      </form>
    </div>
  );
}
