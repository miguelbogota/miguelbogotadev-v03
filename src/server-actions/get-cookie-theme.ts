const COOKIE_NAME = 'theme';

/** Extracts the theme from a cookie value from a cookie string. */
export function getCookieTheme(cookieString?: string | undefined | null): ThemeType {
  if (!cookieString || !COOKIE_NAME) {
    return 'system';
  }

  // Split the cookie string into individual cookies
  const cookies = cookieString.split(';').map((cookie) => cookie.trim());

  // Find the cookie with the matching name
  const targetCookie = cookies.find((cookie) => {
    const [name] = cookie.split('=');
    return name === COOKIE_NAME;
  });

  // Return the value if found, undefined otherwise
  if (targetCookie) {
    const [, value] = targetCookie.split('=');
    return value as ThemeType;
  }

  return 'system';
}
