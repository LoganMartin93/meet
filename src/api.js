import mockData from './mock-data';

export const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking token:", error);
    return { error: "Token check failed" };
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (!code) {
      try {
        const response = await fetch(
          'https://g0woxi8rqa.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url'
        );
        const result = await response.json();
        const { authUrl } = result;
        window.location.href = authUrl;
        return null; // Explicitly return null if redirecting
      } catch (error) {
        console.error("Error fetching auth URL:", error);
        return null;
      }
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * Extracts unique locations from the events array.
 * @param {Array} events - The events array
 * @returns {Array} Unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

/**
 * Fetches the list of events, using mock data in a local environment.
 * @returns {Array|null} The list of events, or null if fetching fails
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url = "https://g0woxi8rqa.execute-api.us-west-1.amazonaws.com/dev/api/get-events" + "/" + token;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.events || null;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  }
  return null;
};

/**
 * Removes the OAuth query parameters from the URL.
 */
const removeQuery = () => {
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  if (window.history.pushState) {
    window.history.pushState("", "", newUrl);
  } else {
    window.location.href = newUrl;
  }
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://g0woxi8rqa.execute-api.us-west-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
  
    return access_token;
  };