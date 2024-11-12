const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://loganmartin93.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Helper function for setting CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow all origins
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  'Content-Type': 'application/json'
};

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// Step 2: Skeleton for getCalendarEvents
module.exports.getCalendarEvents = async (event) => {
  // Get the access token from the event path parameters
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  // Set the credentials for the oAuth2Client
  oAuth2Client.setCredentials({ access_token });

  // Return a new Promise
  return new Promise((resolve, reject) => {
    // Fetch calendar events using the Google Calendar API
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(), // Get events from now
        singleEvents: true,
        orderBy: "startTime", // Order events by start time
      },
      (error, response) => {
        if (error) {
          // If an error occurs, reject the promise with the error
          reject(error);
        } else {
          // If the request is successful, resolve the promise with the results
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      // Return the events as a JSON response
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          events: results.data.items, // Return the list of events
        }),
      };
    })
    .catch((error) => {
      // Handle errors and return a 500 status code
      console.error('Error fetching events:', error); // Log error for debugging
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: error.message }),
      };
    });
};

// Step 3: Your existing getAccessToken function
module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      console.error('Error during token exchange:', error); // Log the error for debugging
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: error.message }),
      };
    });
};
