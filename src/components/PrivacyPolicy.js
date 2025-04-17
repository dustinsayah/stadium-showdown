import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: "30px",
      maxWidth: "800px",
      margin: "auto",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#ffcc00",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>

      <h1>Privacy Policy</h1>
      <p>
        At Stadium Showdown, we respect your privacy. This Privacy Policy explains how we collect,
        use, and protect your information when you use our site and games.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Gameplay data (e.g., scores, game modes played)</li>
        <li>Optional profile details (like username and avatar)</li>
        <li>Basic browser and device info for analytics and performance</li>
      </ul>

      <h3>How We Use This Data</h3>
      <ul>
        <li>To improve gameplay and personalize your experience</li>
        <li>To show leaderboards, badges, and stats</li>
        <li>To deliver ads via services like Ezoic</li>
      </ul>

      <h3>Third-Party Services</h3>
      <p>
        We partner with platforms like Ezoic for advertisement delivery. These platforms may use
        anonymized data for performance tracking and ad optimization.
      </p>

      <h3>Your Choices</h3>
      <p>
        You can contact us at any time to request data removal, opt-out of personalized experiences,
        or ask questions about our privacy practices.
      </p>

      <p>
        This policy may change as our platform evolves. Please review it occasionally for updates.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
