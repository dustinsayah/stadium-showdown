// AvatarSetup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import avatarOptions from "../utils/avatarOptions";

const AvatarSetup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const saveAvatar = async () => {
    if (!selectedAvatar || !username) return;

    localStorage.setItem("avatarURL", selectedAvatar);
    await setDoc(doc(db, "users", username), { avatarURL: selectedAvatar }, { merge: true });
    navigate("/");
  };

  return (
    <div className="avatar-setup">
      <h2>Select Your Avatar</h2>
      <div className="avatar-grid">
        {avatarOptions.map((url) => (
          <img
            key={url}
            src={url}
            alt="avatar"
            className={selectedAvatar === url ? "avatar selected" : "avatar"}
            onClick={() => setSelectedAvatar(url)}
          />
        ))}
      </div>
      <button onClick={saveAvatar} className="save-avatar-button">Save Avatar</button>
    </div>
  );
};

export default AvatarSetup;
