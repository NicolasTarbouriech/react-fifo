const USER_ID = 'userId'

export function getUser(): string {
  return sessionStorage.getItem(USER_ID)!;
}

export function setUser(userId: string) {
  return sessionStorage.setItem(USER_ID, userId);
}

export function removeUser() {
  sessionStorage.removeItem(USER_ID);
}
