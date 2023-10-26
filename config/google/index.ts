const {
  DEVELOPER_TOKEN,
  CLIENT_ID,
  CLIENT_SECRET,
  GOOGLE_ACCESS_TOKEN,
  REFRESH_TOKEN,
} = process.env;
export const googleConfig = {
  developerToken: DEVELOPER_TOKEN || '',
  clientDI: CLIENT_ID || '',
  clientSecret: CLIENT_SECRET || '',
  accessToken: GOOGLE_ACCESS_TOKEN || '',
  refreshToken: REFRESH_TOKEN || '',
};
