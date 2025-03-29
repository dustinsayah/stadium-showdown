// AvatarPicker.js
import React, { useState } from "react";
import avatars from "../utils/avatarList";
import { getUsernameFromLocalStorage } from "../utils/userHelpers";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "./AvatarPicker.css";

const AvatarPicker = ({ currentAvatar, onSelect }) => {
  const [selected, setSelected] = useState(currentAvatar);

  const handleAvatarClick = async (avatarURL) => {
    const username = getUsernameFromLocalStorage();
    setSelected(avatarURL);
    onSelect(avatarURL);

    // Update in Firestore
    const q = doc(db, "users", username);
    await updateDoc(q, { avatarURL });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const customAvatarURL = reader.result;
      setSelected(customAvatarURL);
      onSelect(customAvatarURL);

      const username = getUsernameFromLocalStorage();
      const q = doc(db, "users", username);
      await updateDoc(q, { avatarURL: customAvatarURL });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="avatar-picker">
      <h4>Pick Your Avatar</h4>
      <div className="avatar-grid">
        {avatars.map((avatar) => (
          <img
            key={avatar}
            src={avatar}
            alt="avatar"
            className={`avatar-option ${selected === avatar ? "selected" : ""}`}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      <div className="upload-area">
        <label htmlFor="upload-avatar" className="upload-btn">
          Upload from Device
        </label>
        <input
          id="upload-avatar"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </div>
    </div>
  );
};

export default AvatarPicker;
