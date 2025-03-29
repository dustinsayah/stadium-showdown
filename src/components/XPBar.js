import React from "react";
import "./XPBar.css";

const XPBar = ({ xp }) => {
  const level = Math.floor(xp / 100) + 1;
  const xpIntoLevel = xp % 100;
  const percent = (xpIntoLevel / 100) * 100;

  return (
    <div className="xpbar-container">
      <div className="xpbar-header">
        <span>Level {level}</span>
        <span>{xpIntoLevel}/100 XP</span>
      </div>
      <div className="xpbar-track">
        <div className="xpbar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default XPBar;
