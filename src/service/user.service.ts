const USER_ID = "userId";

export function getUserLoggedIn(): string {
  const user = sessionStorage.getItem(USER_ID);
  if (!user) {
    throw new Error("User not logged in");
  }
  return user;
}

export function setUser(userId: string) {
  return sessionStorage.setItem(USER_ID, userId);
}

export function removeUser() {
  sessionStorage.removeItem(USER_ID);
}
