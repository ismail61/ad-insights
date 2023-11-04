const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_AUTH_CODE_REDIRECT_URL,
} = process.env;

export const facebookConfig = {
  clientID: FACEBOOK_CLIENT_ID || '',
  clientSecret: FACEBOOK_CLIENT_SECRET || '',
  redirectUriAuthCode:
    FACEBOOK_AUTH_CODE_REDIRECT_URL ||
    'https://ad-insights.onrender.com/api/facebook-insights/get-auth-code/',
};
