const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTH_CODE_REDIRECT_URL,
  GOOGLE_DEVELOPER_TOKEN,
} = process.env;

export const googleConfig = {
  clientID: GOOGLE_CLIENT_ID || '',
  clientSecret: GOOGLE_CLIENT_SECRET || '',
  developerToken: GOOGLE_DEVELOPER_TOKEN || '',
  redirectUri:
    GOOGLE_AUTH_CODE_REDIRECT_URL ||
    'https://ad-insights.onrender.com/api/google-insights/get-code/',
};
