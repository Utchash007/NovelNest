/**
 * Centralized, versioned, safe localStorage helpers.
 *
 * C-2 fix: versioned key "auth:v1" instead of bare "active"
 * C-1 fix: all access wrapped in try/catch (safe in incognito / Safari)
 */

const AUTH_KEY = "auth:v1";
const USERNAME_KEY = "username:v1";

/** Safely read + parse the stored auth token object. Returns null on any failure. */
export function getStoredAuth(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Safely read the stored username. Returns null on any failure. */
export function getStoredUsername(): string | null {
  try {
    return localStorage.getItem(USERNAME_KEY);
  } catch {
    return null;
  }
}

/** Safely write auth token + username after login. */
export function setStoredAuth(tokenData: object, username: string): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(tokenData));
    localStorage.setItem(USERNAME_KEY, username);
  } catch {
    // Storage quota exceeded or private browsing — fail silently
  }
}

/** Safely remove both auth entries on logout / token expiry. */
export function clearStoredAuth(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USERNAME_KEY);
  } catch {
    // Ignore
  }
}
