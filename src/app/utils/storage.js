function getTokenFromStorage(rememberMe) {
  return rememberMe ? localStorage.getItem("token") : sessionStorage.getItem("token");
}

function setTokenInStorage(rememberMe, token) {
  return rememberMe ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
}

function removeTokenFromStorage(rememberMe) {
  return rememberMe ? localStorage.removeItem("token") : sessionStorage.removeItem("token");
}

function getUserFromStorage(rememberMe) {
  return rememberMe ? localStorage.getItem("user") : sessionStorage.getItem("user");
}

function setUserInStorage(rememberMe, user) {
  return rememberMe ? localStorage.setItem("user", user) : sessionStorage.setItem("user", user);
}

function removeUserFromStorage(rememberMe) {
  return rememberMe ? localStorage.removeItem("user") : sessionStorage.removeItem("user");
}

export {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
  getUserFromStorage,
  removeUserFromStorage,
  setUserInStorage,
};
