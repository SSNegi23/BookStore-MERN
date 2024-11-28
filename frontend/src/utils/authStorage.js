export const saveUserData = (data) => localStorage.setItem("userData", JSON.stringify(data));
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));
export const clearUserData = () => localStorage.removeItem("userData");
