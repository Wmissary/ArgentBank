function getTokenFromStorage() {
  return localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? null;
}

function setTokenInStorage(token, { rememberUser = false } = {}) {
  rememberUser ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
}

function removeTokenFromStorage() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}

function getUserFromStorage() {
  return (
    localStorage.getItem("user") ??
    sessionStorage.getItem("user") ??
    JSON.stringify({
      firstName: null,
      lastName: null,
    })
  );
}

function setUserInStorage(user, { rememberUser = false } = {}) {
  rememberUser ? localStorage.setItem("user", user) : sessionStorage.setItem("user", user);
}

function removeUserFromStorage() {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}

export {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
  getUserFromStorage,
  removeUserFromStorage,
  setUserInStorage,
};
