import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-policy-container">
      <button className="back-home-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1>Privacy Policy</h1>
      <p>
        At Stadium Showdown, we value your privacy. This Privacy Policy explains how we collect,
        use, and protect your information when you use our website and games.
      </p>

      <h3>What We Collect</h3>
      <ul>
        <li>Gameplay statistics (scores, modes played)</li>
        <li>Optional profile information (username, avatar)</li>
        <li>Basic browser/device data for performance and analytics</li>
      </ul>

      <h3>How We Use This Information</h3>
      <ul>
        <li>To improve the game and user experience</li>
        <li>To display scores, leaderboards, and badges</li>
        <li>To serve personalized or general ads (via Ezoic or others)</li>
      </ul>

      <h3>Third-Party Services</h3>
      <p>
        We partner with services like Ezoic for ad delivery. These services may collect anonymized
        data for ad optimization.
      </p>

      <h3>Your Choices</h3>
      <p>
        You can request deletion of your data or opt-out of personalization by contacting us through
        the appropriate channels.
      </p>

      <p>This policy may be updated as our features and tools evolve.</p>
    </div>
  );
};

export default PrivacyPolicy;
