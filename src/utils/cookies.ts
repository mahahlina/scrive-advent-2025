// Cookie utility functions

/**
 * Set a cookie with a value and expiration date
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Number of days until expiration (default: 30)
 */
export function setCookie(name: string, value: string, days: number = 30): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Delete a cookie by name
 * @param name - Cookie name
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Get all first openers data from cookies
 * @returns Object mapping day numbers to opener names
 */
export function getFirstOpeners(): Record<number, string> {
  const openersStr = getCookie('advent_first_openers');
  if (!openersStr) return {};
  try {
    return JSON.parse(openersStr);
  } catch {
    return {};
  }
}

/**
 * Set first opener for a specific day
 * @param day - Day number
 * @param name - Name of the first opener
 */
export function setFirstOpener(day: number, name: string): void {
  const openers = getFirstOpeners();
  // Only set if not already set (first opener only)
  if (!openers[day]) {
    openers[day] = name;
    setCookie('advent_first_openers', JSON.stringify(openers), 30);
  }
}

/**
 * Get first opener for a specific day
 * @param day - Day number
 * @returns Name of first opener or null
 */
export function getFirstOpener(day: number): string | null {
  const openers = getFirstOpeners();
  return openers[day] || null;
}

