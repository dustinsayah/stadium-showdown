// Get the saved username from localStorage
export const getUsernameFromLocalStorage = () => {
  return localStorage.getItem("username");
};

// Save the username to localStorage
export const setUsernameToLocalStorage = (username) => {
  localStorage.setItem("username", username);
};

// Get the saved avatar URL from localStorage
export const getAvatarFromLocalStorage = () => {
  return localStorage.getItem("avatarURL");
};

// Save the avatar URL to localStorage
export const setAvatarToLocalStorage = (avatarURL) => {
  localStorage.setItem("avatarURL", avatarURL);
};
