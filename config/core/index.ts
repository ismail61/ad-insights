const { PORT, ENV, HOST, API_PREFIX } = process.env;

export const coreConfig = {
  port: parseInt(PORT) || 3000,
  host: HOST || 'localhost',
  apiPrefix: API_PREFIX || 'api',
  env: ENV || 'development',
};
